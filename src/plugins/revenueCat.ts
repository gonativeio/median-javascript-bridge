import { RevenueCat } from '../types/revenueCat.js';
import { addCallbackFunction, addCommandCallback } from '../utils/index.js';

const revenueCat = {
  configure: function (params: RevenueCat.ConfigureParams) {
    return addCommandCallback<RevenueCat.ConfigureResponse>('median://revenueCat/configure', params);
  },
  isInitialized: function () {
    return addCommandCallback<RevenueCat.IsInitializedResponse>('median://revenueCat/isInitialized');
  },
  getOfferings: function () {
    return addCommandCallback<RevenueCat.GetOfferingsResponse>('median://revenueCat/getOfferings');
  },
  purchase: function (params: RevenueCat.PurchaseParams) {
    return addCommandCallback<RevenueCat.PurchaseResponse>('median://revenueCat/purchase', params);
  },
  restorePurchases: function () {
    return addCommandCallback<RevenueCat.RestorePurchasesResponse>('median://revenueCat/restorePurchases');
  },
  presentPaywall: function (params?: RevenueCat.PresentPaywallParams) {
    const parameters: Record<string, any> = {};
    if (params?.onCancelPurchase) {
      parameters.onCancelPurchase = addCallbackFunction(params.onCancelPurchase, true);
    }
    return addCommandCallback<RevenueCat.PresentPaywallResponse>('median://revenueCat/presentPaywall', parameters);
  },
  login: function (params: RevenueCat.LoginParams) {
    return addCommandCallback<RevenueCat.LoginResponse>('median://revenueCat/login', params);
  },
  logout: function () {
    return addCommandCallback<RevenueCat.LogoutResponse>('median://revenueCat/logout');
  },
};

export default revenueCat;
