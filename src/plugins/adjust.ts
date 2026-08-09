import { CallbackData } from '../types/index.js';
import { Adjust } from '../types/adjust.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

const adjust = {
  initialize: function (params: Adjust.InitializeParams) {
    addCommand('median://adjust/initialize', params);
  },
  trackEvent: function (adjustEvent: Adjust.AdjustEvent) {
    const params = {
      token: adjustEvent.token,
      revenue: adjustEvent.revenue,
      currency: adjustEvent.currency,
    };
    addCommand('median://adjust/trackEvent', params);
  },
  attributionInfo: function () {
    return addCommandCallback<Adjust.AttributionInfoData>('median://adjust/attributionInfo');
  },
  updateSkanConversionValue: function (params: Adjust.UpdateSkanConversionValueParams) {
    return addCommandCallback<CallbackData>('median://adjust/updateSkanConversionValue', params);
  },
};

export default adjust;
