import { CallbackData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';

type IterableInitializeParams = CallbackParams<CallbackData> & {
  apiKey: string;
};

type IterableSetEmailParams = CallbackParams<CallbackData> & {
  email: string;
};

type IterableSetUserIdParams = CallbackParams<CallbackData> & {
  userId: string;
};

const iterable = {
  initialize: function (params: IterableInitializeParams) {
    return addCommandCallback<CallbackData>('gonative://iterable/initialize', params);
  },
  setEmail: function (params: IterableSetEmailParams) {
    return addCommandCallback<CallbackData>('gonative://iterable/setEmail', params);
  },
  setUserId: function (params: IterableSetUserIdParams) {
    return addCommandCallback<CallbackData>('gonative://iterable/setUserId', params);
  },
  registerPush: function (params: CallbackParams<CallbackData>) {
    return addCommandCallback<CallbackData>('gonative://iterable/registerPush', params);
  },
  requestPermission: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('gonative://iterable/requestPermission', params);
  },
  permissionStatus: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('gonative://iterable/permissionStatus', params);
  },
};

export default iterable;
