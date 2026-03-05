import { addCommand } from '../utils/index.js';

const android = {
  geoLocation: {
    promptLocationServices: function () {
      addCommand('median://geoLocation/promptLocationServices');
    },
  },
  screen: {
    fullscreen: function () {
      addCommand('median://screen/fullscreen');
    },
    normal: function () {
      addCommand('median://screen/normal');
    },
    keepScreenOn: function () {
      addCommand('median://screen/keepScreenOn');
    },
    keepScreenNormal: function () {
      addCommand('median://screen/keepScreenNormal');
    },
  },
  audio: {
    requestFocus: function (enabled: boolean) {
      addCommand('median://audio/requestFocus', { enabled });
    },
  },
};

export default android;
