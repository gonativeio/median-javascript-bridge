import { AnyData } from '../types';
import { addCommand } from '../utils';

/**
 * AppsFlyer plugin for Median.
 * Provides methods for logging events and assigning a customer user ID.
 */
const appsflyer = {
  /**
   * Log an event to AppsFlyer.
   *
   * @param eventName - The name of the event, as defined in your AppsFlyer dashboard.
   * @param eventValues - Additional event properties or metadata.
   *
   * Example:
   * ```ts
   * appsflyer.logEvent('purchase', { value: 9.99, currency: 'USD' });
   * ```
   */
  logEvent: function (eventName: string, eventValues: AnyData) {
    addCommand('median://appsflyer/logEvent', { eventName, eventValues });
  },

  /**
   * Assign or update the AppsFlyer customer user ID.
   * This allows you to associate events with a specific user in your system.
   *
   * @param userId - A unique identifier for the user.
   *
   * Example:
   * ```ts
   * appsflyer.setCustomerUserId('user_12345');
   * ```
   */
  setCustomerUserId: function (userId: string) {
    addCommand('median://appsflyer/setCustomerUserId', { userId });
  },
};

export default appsflyer;
