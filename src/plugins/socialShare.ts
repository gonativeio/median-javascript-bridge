import { AnyData, CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

export interface SocialShareSnapchatShareParams {
  captionText?: string;
  attachment?: Blob;
}

export interface SocialShareInstagramShareFeedParams {
  attachment?: Blob;
  bgTopColor?: string;
  bgBottomColor?: string;
}

export interface SocialShareIsInstalledData {
  isInstalled: boolean;
}

function socialShareGetDataUrls(blob: Blob, params?: AnyData) {
  function socialShareConvertBlobToDataUrl(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  const promises = [socialShareConvertBlobToDataUrl(blob)];
  if (params && typeof params === 'object' && params.attachment instanceof Blob) {
    promises.push(socialShareConvertBlobToDataUrl(params.attachment));
  }
  return Promise.all(promises);
}

const socialShare = {
  snapchat: {
    isInstalled: function (params: CallbackParams<SocialShareIsInstalledData>) {
      return addCommandCallback<SocialShareIsInstalledData>('median://socialShare/snapchat/isInstalled', params);
    },
    share: function (blob: Blob, params: SocialShareSnapchatShareParams) {
      socialShareGetDataUrls(blob, params).then(([dataUrl, attachment]) => {
        let newParams: AnyData = { dataUrl };
        if (params && typeof params === 'object') {
          newParams = { ...params, dataUrl, attachment };
        }
        addCommand('median://socialShare/snapchat/share', newParams);
      });
    },
  },
  instagram: {
    isInstalled: function (params: CallbackParams<SocialShareIsInstalledData>) {
      return addCommandCallback<SocialShareIsInstalledData>('median://socialShare/instagram/isInstalled', params);
    },
    shareToFeed: function (blob: Blob) {
      socialShareGetDataUrls(blob).then(([dataUrl]) => {
        addCommand('median://socialShare/instagram/shareToFeed', { dataUrl });
      });
    },
    shareToStory: function (blob: Blob, params: SocialShareInstagramShareFeedParams) {
      socialShareGetDataUrls(blob, params).then(([dataUrl, attachment]) => {
        let newParams: AnyData = { dataUrl };
        if (params && typeof params === 'object') {
          newParams = { ...params, dataUrl, attachment };
        }
        addCommand('median://socialShare/instagram/shareToStory', newParams);
      });
    },
  },
};

export default socialShare;
