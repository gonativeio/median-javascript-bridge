import { CallbackParams, CallbackData } from '../types';
import { addCommandCallback } from '../utils';

/**
 * Information about the device's authentication capabilities and state.
 */
export type AuthStatusData = {
  /** The available biometry type (e.g., "TouchID", "FaceID", "Biometric") */
  biometryType: string;

  /** Whether Touch ID–style authentication is available */
  hasTouchId: boolean;

  /** Whether a previously saved secret exists */
  hasSecret: boolean;

  /** Platform-provided error message, if any */
  error: string;
};

/**
 * Parameters for saving a secret to secure storage.
 * Includes callback parameters for success/error handling.
 */
export type AuthSaveParams = CallbackParams<CallbackData> & {
  /** The secret to securely store */
  secret: string;
};

/**
 * Response returned when retrieving a stored secret.
 */
export type AuthGetData = CallbackData & {
  /** The retrieved secret, if one exists */
  secret?: string;
};

/**
 * Parameters for fetching a stored secret, with optional
 * platform authentication prompt text.
 */
export type AuthGetParams = CallbackParams<AuthGetData> & {
  /** Optional text to override the system authentication prompt message */
  prompt?: string;
};

/** Parameters for deleting a stored secret */
export type AuthDeleteParams = CallbackParams<CallbackData>;

/**
 * Auth plugin for Median.
 * Provides secure authentication and secret-storage functionality using
 * native biometrics or system secure storage APIs.
 */
const auth = {
  /**
   * Get the current authentication status and device biometric capabilities.
   *
   * @param params - Callback parameters for receiving status information.
   * @returns A promise resolving with the device's authentication capabilities.
   */
  status: function (params: CallbackParams<AuthStatusData>) {
    return addCommandCallback<AuthStatusData>('median://auth/status', params);
  },

  /**
   * Save a secret to secure storage.
   * If a non-string value is provided, it will be serialized to JSON.
   *
   * @param params - Parameters including the secret and callback handlers.
   * @returns A promise resolving with a success/error result.
   */
  save: function (params: AuthSaveParams) {
    if (typeof params.secret !== 'string') {
      params.secret = JSON.stringify(params.secret);
    }
    return addCommandCallback<CallbackData>('median://auth/save', params);
  },

  /**
   * Retrieve a previously saved secret.
   * Some platforms may prompt the user with biometric or PIN authentication.
   *
   * @param params - Parameters including optional prompt text and callbacks.
   * @returns A promise resolving with the stored secret (if present).
   */
  get: function (params: AuthGetParams) {
    return addCommandCallback<AuthGetData>('median://auth/get', params);
  },

  /**
   * Delete the stored secret from secure storage.
   *
   * @param params - Callback parameters for success/error handling.
   * @returns A promise resolving once the secret is removed.
   */
  delete: function (params: AuthDeleteParams) {
    return addCommandCallback<CallbackData>('median://auth/delete', params);
  },
};

export default auth;
