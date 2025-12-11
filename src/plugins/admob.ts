import { CallbackParams } from '../types';
import { addCommand, addCommandCallback } from '../utils';

/**
 * Result of requesting the user's tracking authorization status
 * (required for personalized ads on iOS).
 */
type AdmobRequestTrackingData = {
  /** The user's tracking permission status */
  status: 'authorized' | 'denied' | 'restricted';
};

/**
 * AdMob plugin for Median.
 * Provides methods for showing interstitials, controlling banner ads,
 * and requesting tracking authorization.
 */
const admob = {
  /**
   * Show an interstitial ad immediately **if it has already been preloaded**.
   * If no interstitial is ready, nothing is shown.
   */
  showInterstitialIfReady: function () {
    addCommand('median://admob/showInterstitialIfReady');
  },

  /**
   * Schedule an interstitial ad to display on the **next page load**,
   * if a preloaded interstitial is available at that time.
   */
  showInterstitialOnNextPageLoadIfReady: function () {
    addCommand('median://admob/showInterstitialOnNextPageLoadIfReady');
  },

  /**
   * Banner ad controls.
   */
  banner: {
    /**
     * Enable the banner ad.
     * If a banner was previously hidden or disabled, it will be shown again.
     */
    enable: function () {
      addCommand('median://admob/banner/enable');
    },

    /**
     * Disable and hide the banner ad.
     */
    disable: function () {
      addCommand('median://admob/banner/disable');
    },
  },

  /**
   * Ad-related request operations.
   */
  request: {
    /**
     * Request tracking authorization from the user.
     * On iOS, this triggers the App Tracking Transparency (ATT) prompt.
     *
     * @param params - Callback parameters for receiving the tracking status result.
     * @returns A promise resolving with the tracking authorization status.
     */
    tracking: function (params: CallbackParams<AdmobRequestTrackingData>) {
      return addCommandCallback<AdmobRequestTrackingData>('median://admob/request/tracking', params);
    },
  },
};

export default admob;
