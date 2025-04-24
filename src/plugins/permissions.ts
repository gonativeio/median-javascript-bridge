import { CallbackParams } from '../types';
import { addCommand, addCommandCallback } from '../utils';

type PermissionType =
  | 'Notifications'
  | 'Camera'
  | 'Contacts'
  | 'Microphone'
  | 'LocationWhenInUse'
  | 'LocationAlways'
  | 'AppTrackingTransparency'
  | 'PhotoLibrary';

type PermissionStatus = 'undetermined' | 'granted' | 'denied';

const permissions = {
  requestPhoneCallMgmt: function (params: CallbackParams) {
    if (params?.callback) {
      return addCommandCallback('median://permissions/requestPhoneCallMgmt', params);
    }
    addCommand('median://permissions/requestPhoneCallMgmt', params);
  },
  status: function (permissions?: PermissionType[]) {
    return addCommandCallback<Record<string, PermissionStatus>>('median://permissions/status', { permissions });
  },
};

export default permissions;
