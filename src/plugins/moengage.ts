import { AnyData, CallbackData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommandCallback } from '../utils.js';

const moengage = {
  notificationEnabled: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://moengage/notificationEnabled', params, true);
  },
  promptNotification: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://moengage/promptNotification', params, true);
  },
  setUniqueID: function (uniqueId: string) {
    return addCommandCallback<CallbackData>('median://moengage/setUniqueID', { uniqueId }, true);
  },
  resetUser: function () {
    return addCommandCallback<CallbackData>('median://moengage/resetUser');
  },
  setAlias: function (alias: string) {
    return addCommandCallback<CallbackData>('median://moengage/setAlias', { alias }, true);
  },
  trackEvent: function (eventName: string, eventData: Record<string, AnyData>) {
    return addCommandCallback<CallbackData>('median://moengage/trackEvent', { eventName, eventData }, true);
  },
  launchInbox: function () {
    return addCommandCallback<CallbackData>('median://moengage/launchInbox');
  },
};

export default moengage;
