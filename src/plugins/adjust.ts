import { CallbackData } from '../types';
import { addCommand, addCommandCallback } from '../utils';

/**
 * Represents an Adjust tracking event.
 * Use this to configure an event before sending it to Adjust.
 */
export class AdjustEvent {
  /** The Adjust event token defined in your Adjust dashboard */
  token: string;

  /** Optional revenue amount associated with the event */
  revenue?: number;

  /** Optional currency code for the event revenue (e.g. "USD") */
  currency?: string;

  /**
   * Create a new AdjustEvent instance.
   *
   * @param token - The Adjust event token.
   */
  constructor(token: string) {
    this.token = token;
  }

  /**
   * Attach revenue information to this event.
   *
   * @param revenue - The revenue amount for the event.
   * @param currency - The currency code for the revenue.
   */
  setRevenue(revenue: number, currency: string): void {
    this.revenue = revenue;
    this.currency = currency;
  }
}

/**
 * Parameters used to initialize the Adjust SDK.
 */
type AdjustInitializeParams = {
  /**
   * Enable Apple SKAdNetwork support if available.
   */
  enableSKAN?: boolean;
};

/**
 * Attribution information returned by Adjust.
 * Values may be undefined if attribution is not available.
 */
type AdjustAttributionInfoData = {
  trackerToken?: string;
  trackerName?: string;
  network?: string;
  campaign?: string;
  adgroup?: string;
  creative?: string;
  clickLabel?: string;
  costType?: string;
  costAmount?: number;
  costCurrency?: string;
};

/**
 * Parameters for manually updating the SKAdNetwork conversion value.
 */
type AdjustUpdateSkanConversionValueParams = {
  /** Final SKAN conversion value (0–63) */
  conversionValue: number;
  /** Coarse value classification */
  coarseValue: 'low' | 'medium' | 'high';
  /** Lock the conversion window once updated */
  lockWindow?: boolean;
};

/**
 * Adjust plugin for Median.
 * Provides methods for initialization, event tracking, attribution,
 * and SKAdNetwork conversion value updates.
 */
const adjust = {
  /**
   * Initialize the Adjust SDK within the Median environment.
   * Must be called before tracking events.
   *
   * @param params - Initialization configuration.
   * @param params.enableSKAN - Enable SKAdNetwork support.
   */
  initialize: function (params: AdjustInitializeParams) {
    addCommand('median://adjust/initialize', params);
  },

  /**
   * Send an event to Adjust.
   * Before calling this, create an AdjustEvent and optionally
   * assign revenue information using `setRevenue`.
   *
   * @param adjustEvent - The event to track.
   */
  trackEvent: function (adjustEvent: AdjustEvent) {
    const params = {
      token: adjustEvent.token,
      revenue: adjustEvent.revenue,
      currency: adjustEvent.currency,
    };
    addCommand('median://adjust/trackEvent', params);
  },

  /**
   * Retrieve attribution information from Adjust.
   *
   * @returns A promise resolving with Adjust attribution details.
   */
  attributionInfo: function () {
    return addCommandCallback<AdjustAttributionInfoData>('median://adjust/attributionInfo');
  },

  /**
   * Manually update the SKAdNetwork conversion value.
   * This is only needed if you're managing SKAN conversion values yourself.
   *
   * @param params - SKAN conversion update parameters.
   * @returns A promise resolving with the success status.
   */
  updateSkanConversionValue: function (params: AdjustUpdateSkanConversionValueParams) {
    return addCommandCallback<CallbackData>('median://adjust/updateSkanConversionValue', params);
  },
};

export default adjust;
