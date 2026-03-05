import { CallbackData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

export class AdjustEvent {
  token: string;
  revenue?: number;
  currency?: string;

  constructor(token: string) {
    this.token = token;
  }

  setRevenue(revenue: number, currency: string): void {
    this.revenue = revenue;
    this.currency = currency;
  }
}

type AdjustInitializeParams = {
  enableSKAN?: boolean;
};

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

type AdjustUpdateSkanConversionValueParams = {
  conversionValue: number;
  coarseValue: 'low' | 'medium' | 'high';
  lockWindow?: boolean;
};

const adjust = {
  initialize: function (params: AdjustInitializeParams) {
    addCommand('median://adjust/initialize', params);
  },
  trackEvent: function (adjustEvent: AdjustEvent) {
    const params = {
      token: adjustEvent.token,
      revenue: adjustEvent.revenue,
      currency: adjustEvent.currency,
    };
    addCommand('median://adjust/trackEvent', params);
  },
  attributionInfo: function () {
    return addCommandCallback<AdjustAttributionInfoData>('median://adjust/attributionInfo');
  },
  updateSkanConversionValue: function (params: AdjustUpdateSkanConversionValueParams) {
    return addCommandCallback<CallbackData>('median://adjust/updateSkanConversionValue', params);
  },
};

export default adjust;
