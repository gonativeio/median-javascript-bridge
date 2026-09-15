import { AnyData, CallbackParams } from './index.js';

export namespace Auth0 {
  export type LoginData = {
    idToken: string;
    accessToken: string;
    refreshToken?: string;
    scope?: string;
    error?: string;
  };

  export type LoginParams = CallbackParams<LoginData> & {
    audience?: string;
    enableBiometrics?: boolean;
    scope?: string;
  };

  export type ProfileParams = {
    accessToken: string;
    callback?: (data: AnyData) => void;
  };

  export type LogoutData = {
    error?: string;
  };

  export type RenewParams = {
    refreshToken?: string;
  };
}
