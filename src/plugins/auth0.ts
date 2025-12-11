import { AnyData, CallbackParams } from '../types';
import { addCommandCallback } from '../utils';
import { AuthStatusData } from './auth';

/**
 * Data returned after a successful Auth0 login.
 */
type Auth0LoginData = {
  /** The ID token returned by Auth0 */
  idToken: string;

  /** The access token returned by Auth0 */
  accessToken: string;

  /** Optional refresh token for renewing sessions */
  refreshToken?: string;

  /** Optional scope of granted permissions */
  scope?: string;

  /** Optional error message if login failed */
  error?: string;
};

/**
 * Parameters for initiating an Auth0 login.
 */
type Auth0LoginParams = CallbackParams<Auth0LoginData> & {
  /** Enable biometric authentication if available */
  enableBiometrics?: boolean;
};

/**
 * Parameters for fetching an Auth0 user profile.
 */
type Auth0ProfileParams = {
  /** Access token for the authenticated user */
  accessToken: string;

  /** Optional callback to receive profile data */
  callback?: (data: AnyData) => void;
};

/**
 * Auth0 plugin for Median.
 * Provides authentication, session management, and profile retrieval
 * using Auth0 as the identity provider.
 */
const auth0 = {
  /**
   * Log in the user via Auth0.
   * Can optionally enable biometric authentication for future logins.
   *
   * @param params - Login parameters including callbacks.
   * @returns A promise resolving with login tokens or an error.
   */
  login: function (params: Auth0LoginParams) {
    return addCommandCallback<Auth0LoginData>('median://auth0/login', params);
  },

  /**
   * Log out the currently authenticated user.
   *
   * @param params - Callback parameters to handle success/error.
   * @returns A promise resolving once the user is logged out.
   */
  logout: function (params: CallbackParams<{ error?: string }>) {
    return addCommandCallback<{ error?: string }>('median://auth0/logout', params);
  },

  /**
   * Get the current authentication status for the user.
   *
   * @param params - Callback parameters to receive status data.
   * @returns A promise resolving with the AuthStatusData.
   */
  status: function (params: CallbackParams<AuthStatusData>) {
    return addCommandCallback<AuthStatusData>('median://auth0/status', params);
  },

  /**
   * Fetch the user's Auth0 profile information.
   *
   * @param params - Parameters including access token and optional callback.
   * @returns A promise resolving with login/profile data.
   */
  profile: function (params: Auth0ProfileParams) {
    return addCommandCallback<Auth0LoginData>('median://auth0/profile', params);
  },

  /**
   * Retrieve the current Auth0 credentials (tokens).
   *
   * @param params - Callback parameters to receive the credentials.
   * @returns A promise resolving with the login tokens.
   */
  getCredentials: function (params: CallbackParams<Auth0LoginData>) {
    return addCommandCallback<Auth0LoginData>('median://auth0/getCredentials', params);
  },

  /**
   * Renew the Auth0 session using a refresh token.
   *
   * @param refreshToken - Optional refresh token for session renewal.
   * @returns A promise resolving with new login tokens.
   */
  renew: function (refreshToken?: string) {
    return addCommandCallback<Auth0LoginData>('median://auth0/renew', { refreshToken });
  },
};

export default auth0;
