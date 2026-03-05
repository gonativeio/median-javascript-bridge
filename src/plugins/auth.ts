import { CallbackParams, CallbackData } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';

export type AuthStatusData = {
  biometryType: string;
  hasTouchId: boolean;
  hasSecret: boolean;
  error: string;
};

export type AuthSaveParams = CallbackParams<CallbackData> & {
  secret: string;
};

export type AuthGetData = CallbackData & {
  secret?: string;
};

export type AuthGetParams = CallbackParams<AuthGetData> & {
  prompt?: string;
};

export type AuthDeleteParams = CallbackParams<CallbackData>;

const auth = {
  status: function (params: CallbackParams<AuthStatusData>) {
    return addCommandCallback<AuthStatusData>('median://auth/status', params);
  },
  save: function (params: AuthSaveParams) {
    if (typeof params.secret !== 'string') {
      params.secret = JSON.stringify(params.secret);
    }
    return addCommandCallback<CallbackData>('median://auth/save', params);
  },
  get: function (params: AuthGetParams) {
    return addCommandCallback<AuthGetData>('median://auth/get', params);
  },
  delete: function (params: AuthDeleteParams) {
    return addCommandCallback<CallbackData>('median://auth/delete', params);
  },
};

export default auth;
