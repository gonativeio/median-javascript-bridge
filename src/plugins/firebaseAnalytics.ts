import { AnyData } from '../types';
import { addCommand } from '../utils';

type FirebaseAnalyticsItemData = {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  item_variant?: string;
  item_brand?: string;
  item_list_name?: string;
  item_list_id?: string;
  price?: number;
};

type FirebaseAnalyticsItemParams = {
  data: FirebaseAnalyticsItemData;
  currency: string;
  price: number;
};

type FirebaseAnalyticsPurchaseItemParams = {
  data: FirebaseAnalyticsItemData;
  currency: string;
  price: number;
  quantity: number;
};

export enum FirebaseAnalyticsConsentKey {
  ANALYTICS_STORAGE = 'analyticsStorage',
  AD_STORAGE = 'adStorage',
  AD_USER_DATA = 'adUserData',
  AD_PERSONALIZATION = 'adPersonalization',
}

type FirebaseAnalyticsSetConsentParams = Record<FirebaseAnalyticsConsentKey, boolean>;

const firebaseAnalytics = {
  event: {
    collection: function (enabled: boolean) {
      addCommand('median://firebaseAnalytics/event/collection?enabled=' + enabled);
    },
    setUser: function (params: { ID: string }) {
      addCommand('median://firebaseAnalytics/event/setUser', params);
    },
    setUserProperty: function (params: { key: string; value: string }) {
      addCommand('median://firebaseAnalytics/event/setUserProperty', params);
    },
    defaultEventParameters: function (params: Record<string, AnyData>) {
      addCommand('median://firebaseAnalytics/event/defaultEventParameters', params);
    },
    logEvent: function (params: { key: string; data: Record<string, AnyData> }) {
      addCommand('median://firebaseAnalytics/event/logEvent', params);
    },
    logScreen: function (params: { screen: string }) {
      addCommand('median://firebaseAnalytics/event/logScreen', params);
    },
    viewItem: function (params: FirebaseAnalyticsItemParams) {
      addCommand('median://firebaseAnalytics/event/viewItem', params);
    },
    addToWishlist: function (params: FirebaseAnalyticsPurchaseItemParams) {
      addCommand('median://firebaseAnalytics/event/addToWishlist', params);
    },
    addToCart: function (params: FirebaseAnalyticsPurchaseItemParams) {
      addCommand('median://firebaseAnalytics/event/addToCart', params);
    },
    removeFromCart: function (params: FirebaseAnalyticsPurchaseItemParams) {
      addCommand('median://firebaseAnalytics/event/removeFromCart', params);
    },
  },
  setConsent: function (params: FirebaseAnalyticsSetConsentParams) {
    addCommand('median://firebaseAnalytics/setConsent', params);
  },
};

export default firebaseAnalytics;
