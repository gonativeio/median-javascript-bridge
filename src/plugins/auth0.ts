import { AnyData, CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';
import { AuthStatusData } from './auth.js';

type Auth0LoginData = {
  idToken: string;
  accessToken: string;
  refreshToken?: string;
  scope?: string;
  error?: string;
};

type Auth0LoginParams = CallbackParams<Auth0LoginData> & {
  audience?: string;
  enableBiometrics?: boolean;
  scope?: string;
};

type Auth0ProfileParams = {
  accessToken: string;
  callback?: (data: AnyData) => void;
};

const auth0 = {
  login: function (params: Auth0LoginParams) {
    return addCommandCallback<Auth0LoginData>('median://auth0/login', params);
  },
  logout: function (params: CallbackParams<{ error?: string }>) {
    return addCommandCallback<{ error?: string }>('median://auth0/logout', params);
  },
  status: function (params: CallbackParams<AuthStatusData>) {
    return addCommandCallback<AuthStatusData>('median://auth0/status', params);
  },
  profile: function (params: Auth0ProfileParams) {
    return addCommandCallback<Auth0LoginData>('median://auth0/profile', params);
  },
  getCredentials: function (params: CallbackParams<Auth0LoginData>) {
    return addCommandCallback<Auth0LoginData>('median://auth0/getCredentials', params);
  },
  renew: function (refreshToken?: string) {
    return addCommandCallback<Auth0LoginData>('median://auth0/renew', { refreshToken });
  },
};

export default auth0;
