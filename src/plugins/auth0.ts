import { CallbackParams } from '../types/index.js';
import { Auth0 } from '../types/auth0.js';
import { addCommandCallback, isAndroid } from '../utils/index.js';
import { AuthStatusData } from './auth.js';

const auth0 = {
  login: function (params: Auth0.LoginParams) {
    return addCommandCallback<Auth0.LoginData>('median://auth0/login', params);
  },
  logout: function (params: CallbackParams<Auth0.LogoutData>) {
    return addCommandCallback<Auth0.LogoutData>('median://auth0/logout', params);
  },
  status: function (params: CallbackParams<AuthStatusData>) {
    return addCommandCallback<AuthStatusData>('median://auth0/status', params);
  },
  profile: function (params: Auth0.ProfileParams) {
    return addCommandCallback<Auth0.LoginData>('median://auth0/profile', params);
  },
  get: function (params: CallbackParams<Auth0.LoginData>) {
    return auth0.getCredentials(params);
  },
  getCredentials: function (params: CallbackParams<Auth0.LoginData>) {
    const command = isAndroid() ? 'median://auth0/get' : 'median://auth0/getCredentials';
    return addCommandCallback<Auth0.LoginData>(command, params);
  },
  renew: function (refreshToken?: string) {
    const params: Auth0.RenewParams = { refreshToken };
    return addCommandCallback<Auth0.LoginData>('median://auth0/renew', params);
  },
};

export default auth0;
