export namespace Adjust {
  export type AdjustEvent = {
    token: string;
    revenue?: number;
    currency?: string;
    setRevenue: (revenue: number, currency: string) => void;
  }

  export type InitializeParams = {
    enableSKAN?: boolean;
  };

  export type AttributionInfoData = {
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

  export type UpdateSkanConversionValueParams = {
    conversionValue: number;
    coarseValue: 'low' | 'medium' | 'high';
    lockWindow?: boolean;
  };
}