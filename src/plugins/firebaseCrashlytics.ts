import { addCommand } from '../utils/index.js';

const firebaseCrashlytics = {
  enable: function (enable: boolean) {
    addCommand('gonative://firebaseCrashlytics/enable', { enable });
  },
  webErrorLogsEnabled: function (enable: boolean) {
    addCommand('gonative://firebaseCrashlytics/enableWebErrorLogs', { enable });
  },
  toastErrorLogsEnabled: function (enable: boolean) {
    addCommand('gonative://firebaseCrashlytics/enableToastErrorLogs', { enable });
  },
  setUserId: function (userId: string) {
    addCommand('gonative://firebaseCrashlytics/setUserId', { userId });
  },
  unsetUserId: function () {
    addCommand('gonative://firebaseCrashlytics/unsetUserId');
  },
};

export default firebaseCrashlytics;
