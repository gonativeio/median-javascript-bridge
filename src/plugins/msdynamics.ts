import { DeviceInfo } from '../commands/general';
import { CallbackData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';

const msdynamics = {
  areNotificationsEnabled: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://msdynamics/areNotificationsEnabled', params, true);
  },
  promptNotificationPermission: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://msdynamics/promptNotificationPermission', params, true);
  },
  registrationInfo: function (params: CallbackParams<DeviceInfo>) {
    return addCommandCallback<DeviceInfo>('median://msdynamics/registrationInfo', params, true);
  },
  registerDevice: function (params: CallbackParams<DeviceInfo> & { userId: string }) {
    return addCommandCallback<CallbackData>('median://msdynamics/registerDevice', params, true);
  },
};

export default msdynamics;
