import { AnyData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils.js';

type IntercomUpdateUserParams = {
  userId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

type IntercomLogEventParams = Record<string, AnyData> & {
  eventName: string;
};

const intercom = {
  registerPush: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://intercom/registerPush', params);
  },
  updateUser: function (params: IntercomUpdateUserParams) {
    addCommand('median://intercom/updateUser', params);
  },
  logEvent: function (params: IntercomLogEventParams) {
    addCommand('median://intercom/logEvent', params);
  },
  logout: function () {
    addCommand('median://intercom/logout');
  },
  presentCarousel: function (params: { carouselID: string }) {
    addCommand('median://intercom/presentCarousel', params);
  },
  permissionStatus: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://intercom/permissionStatus', params, true);
  },
  requestPermission: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://intercom/registerPush', params, true);
  },
};

export default intercom;
