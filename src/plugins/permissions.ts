import { CallbackParams } from '../types';
import { addCommand, addCommandCallback } from '../utils';

const permissions = {
  requestPhoneCallMgmt: function (params: CallbackParams) {
    if (params?.callback) {
      return addCommandCallback('median://permissions/requestPhoneCallMgmt', params);
    }
    addCommand('median://permissions/requestPhoneCallMgmt', params);
  },
  status: function (permissions: string[]) {
    return addCommandCallback<Record<string, string>>('median://permissions/status', { permissions });
  },
};

export default permissions;
