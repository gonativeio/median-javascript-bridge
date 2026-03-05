import { CallbackData, CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';

type RevenueCatConfigureParams = CallbackParams<CallbackData> & {
  apiKey: string;
  appUserID: string;
};

type RevenueCatOfferings = CallbackData & {
  identifiers?: string[];
};

const revenueCat = {
  configure: function (params: RevenueCatConfigureParams) {
    return addCommandCallback<CallbackData>('gonative://revenueCat/configure', params);
  },
  getOfferings: function (params: CallbackParams<RevenueCatOfferings>) {
    return addCommandCallback<RevenueCatOfferings>('gonative://revenueCat/getOfferings', params);
  },
  purchase: function (params: CallbackParams<CallbackData> & { identifier: string }) {
    return addCommandCallback<CallbackData>('gonative://revenueCat/purchase', params);
  },
  restorePurchases: function (params: CallbackParams<CallbackData>) {
    return addCommandCallback<CallbackData>('gonative://revenueCat/restorePurchases', params);
  },
};

export default revenueCat;
