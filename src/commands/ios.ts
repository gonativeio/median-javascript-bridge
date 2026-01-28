import { CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils.js';
import { NewWindowMode } from './general.js';

const ios = {
  window: {
    open: function (url: string, mode: NewWindowMode = 'blank') {
      addCommand('median://window/open', { url, mode });
    },
    setWindowOpenHideNavbar: function (windowOpenHideNavbar: boolean) {
      addCommand('median://window/setWindowOpenHideNavbar', { windowOpenHideNavbar });
    },
  },
  geoLocation: {
    requestLocation: function () {
      addCommand('median://geolocationShim/requestLocation');
    },
    startWatchingLocation: function () {
      addCommand('median://geolocationShim/startWatchingLocation');
    },
    stopWatchingLocation: function () {
      addCommand('median://geolocationShim/stopWatchingLocation');
    },
  },
  attconsent: {
    request: function (params: CallbackParams<PermissionStatusData>) {
      return addCommandCallback<PermissionStatusData>('median://ios/attconsent/request', params);
    },
    status: function (params: CallbackParams<PermissionStatusData>) {
      return addCommandCallback<PermissionStatusData>('median://ios/attconsent/status', params);
    },
  },
  backgroundAudio: {
    start: function () {
      addCommand('median://backgroundAudio/start');
    },
    end: function () {
      addCommand('median://backgroundAudio/end');
    },
  },
  contextualNavToolbar: {
    set: function (params: { enabled: boolean }) {
      addCommand('median://ios/contextualNavToolbar/set', params);
    },
  },
};

export default ios;
