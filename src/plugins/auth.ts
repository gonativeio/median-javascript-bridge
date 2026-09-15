import { CallbackParams, CallbackData } from '../types/index.js';
import { Auth } from '../types/auth.js';
import { addCommandCallback } from '../utils/index.js';

export type AuthStatusData = Auth.StatusData;
export type AuthSaveParams = Auth.SaveParams;
export type AuthGetData = Auth.GetData;
export type AuthGetParams = Auth.GetParams;
export type AuthDeleteParams = Auth.DeleteParams;

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
