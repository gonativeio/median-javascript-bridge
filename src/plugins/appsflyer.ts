import { AppsFlyer } from '../types/appsflyer.js';
import { addCommand } from '../utils/index.js';
import { createListener } from '../utils/listener.js';

/**
 * Appsflyer plugin for Median.
 * Provides methods to track events and associate actions with a user.
 */
const appsflyer = {
  /**
   * Log a custom event to Appsflyer.
   *
   * @param eventName - The name of the event to be tracked.
   * @param eventValues - Key-value pairs containing event metadata.
   */
  logEvent: function (eventName: string, eventValues: any) {
    addCommand('median://appsflyer/logEvent', { eventName, eventValues });
  },

  /**
   * Set a unique customer user ID for Appsflyer.
   * This is typically used to associate events with a logged-in user.
   *
   * @param userId - Unique identifier for the current user.
   */
  setCustomerUserId: function (userId: string) {
    addCommand('median://appsflyer/setCustomerUserId', { userId });
  },

  /**
   * Listens for conversion data events from the AppsFlyer SDK.
   */
  conversionData: createListener<AppsFlyer.ConversionData>('_median_appsflyer_cd'),

  /**
   * Listens for deep link results from the AppsFlyer SDK.
   */
  deeplinkResult: createListener<AppsFlyer.DeeplinkResult>('_median_appsflyer_deeplink_result'),

  /**
   * Listens for AppsFlyer SDK start events.
   */
  sdkStart: createListener<AppsFlyer.SdkStartResponse>('_median_appsflyer_sdk_start'),
};

export default appsflyer;
