import { AppsFlyer } from '../types/appsflyer.js';
import { addCommandCallback } from '../utils/index.js';
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
  logEvent: function (eventName: string, eventValues?: Record<string, any>) {
    return addCommandCallback<AppsFlyer.LogEventResponse>('median://appsflyer/logEvent', { eventName, eventValues });
  },

  /**
   * Set a unique customer user ID for Appsflyer.
   * This is typically used to associate events with a logged-in user.
   *
   * @param userId - Unique identifier for the current user.
   */
  setCustomerUserId: function (userId: string) {
    return addCommandCallback<AppsFlyer.SetCustomerUserIdResponse>('median://appsflyer/setCustomerUserId', { userId });
  },

  /**
   * Get the cached AppsFlyer conversion data.
   * Resolves immediately from cache; `data` is null when no value has arrived yet.
   */
  getConversionData: function () {
    return addCommandCallback<AppsFlyer.ConversionDataResponse>('median://appsflyer/getConversionData');
  },

  /**
   * Get the cached AppsFlyer deep link result.
   * Resolves immediately from cache; `data` is null when no deep link was found
   * or no value has arrived yet.
   */
  getDeepLinkResult: function () {
    return addCommandCallback<AppsFlyer.DeepLinkResultResponse>('median://appsflyer/getDeepLinkResult');
  },

  /**
   * Listens for conversion data events from the AppsFlyer SDK.
   */
  conversionData: createListener<AppsFlyer.ConversionDataResponse>('_median_appsflyer_cd'),

  /**
   * Listens for deep link results from the AppsFlyer SDK.
   */
  deeplinkResult: createListener<AppsFlyer.DeepLinkResultResponse>('_median_appsflyer_deeplink_result'),

  /**
   * Listens for AppsFlyer SDK start events.
   */
  sdkStart: createListener<AppsFlyer.SdkStartResponse>('_median_appsflyer_sdk_start'),
};

export default appsflyer;
