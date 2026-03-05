import { CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

type AdmobRequestTrackingData = { status: 'authorized' | 'denied' | 'restricted' };

const admob = {
  showInterstitialIfReady: function () {
    addCommand('median://admob/showInterstitialIfReady');
  },
  showInterstitialOnNextPageLoadIfReady: function () {
    addCommand('median://admob/showInterstitialOnNextPageLoadIfReady');
  },
  banner: {
    enable: function () {
      addCommand('median://admob/banner/enable');
    },
    disable: function () {
      addCommand('median://admob/banner/disable');
    },
  },
  request: {
    tracking: function (params: CallbackParams<AdmobRequestTrackingData>) {
      return addCommandCallback<AdmobRequestTrackingData>('median://admob/request/tracking', params);
    },
  },
};

export default admob;
