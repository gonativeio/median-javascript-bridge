import { addCommandCallback } from '../utils';

/**
 * The result of a generic operation or command.
 */
export type CallbackData = {
  /** Whether the operation was successful */
  success: boolean;
  /** Optional error message if the operation failed */
  error?: string;
};

/**
 * Represents the user's push notification permission status.
 */
export type PermissionStatusData = {
  /** True if the user has granted push notification permission */
  granted: boolean;
};

/**
 * Parameters for Klaviyo profile.
 */
type KlaviyoGetProfileParams = {
  /** Unique identifier for the user in your system */
  externalId?: string;
  /** User's email address */
  email?: string;
  /** User's phone number */
  phoneNumber?: string;
};

/**
 * Klaviyo plugin for Median.
 * Provides methods to manage push notifications and user profiles.
 */
const klaviyo = {
  /**
   * Prompt the user to allow push notifications.
   * If `autoRegister` is disabled in the Klaviyo plugin config, you must call this manually.
   *
   * @returns A promise resolving with the permission status.
   */
  promptNotification: function () {
    return addCommandCallback<PermissionStatusData>('median://klaviyo/promptNotification');
  },

  /**
   * Check if push notifications are currently enabled for the user.
   *
   * @returns A promise resolving with the current notification permission status.
   */
  notificationEnabled: function () {
    return addCommandCallback<PermissionStatusData>('median://klaviyo/notificationEnabled');
  },

  /**
   * Set or update the current Klaviyo profile.
   * This will sync the provided profile information with the Klaviyo backend.
   *
   * @param params - Profile information to set.
   * @param params.externalId - (Required) Unique user identifier.
   * @param params.email - (Optional) User email address.
   * @param params.phoneNumber - (Optional) User phone number.
   * @returns A promise that resolves when the profile has been set.
   */
  setProfile: function (params: KlaviyoGetProfileParams) {
    return addCommandCallback<CallbackData>('median://klaviyo/setProfile', params);
  },

  /**
   * Retrieve the current Klaviyo profile stored in this app.
   *
   * @returns A promise resolving with the profile object:
   * `{ externalId?: string; email?: string; phoneNumber?: string }`
   */
  getProfile: function () {
    return addCommandCallback<KlaviyoGetProfileParams>('median://klaviyo/getProfile');
  },

  /**
   * Reset the stored Klaviyo profile in this app.
   * After calling this, the profile will be cleared.
   *
   * @returns A promise that resolves when the profile has been reset.
   */
  resetProfile: function () {
    return addCommandCallback<CallbackData>('median://klaviyo/resetProfile');
  },
};

export default klaviyo;
