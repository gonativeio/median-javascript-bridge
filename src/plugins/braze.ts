import { AnyData, CallbackData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

const braze = {
  changeUser: function (params: CallbackParams<CallbackData> & { userId: string }) {
    return addCommandCallback<CallbackData>('median://braze/changeUser', params, true);
  },
  notificationEnabled: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://braze/notificationEnabled', params, true);
  },
  promptNotification: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://braze/promptNotification', params, true);
  },
  logCustomEvent: function (eventName: string, data: Record<string, AnyData>) {
    addCommand('median://braze/logCustomEvent', { eventName, data });
  },
};

export default braze;
