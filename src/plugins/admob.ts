import { CallbackParams } from '../types/index.js';
import { Admob } from '../types/admob.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

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
    tracking: function (params: CallbackParams<Admob.RequestTrackingData>) {
      return addCommandCallback<Admob.RequestTrackingData>('median://admob/request/tracking', params);
    },
  },
};

export default admob;
