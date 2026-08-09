export namespace AppsFlyer {
  export type ConversionData = Record<string, any> & {
    af_message?: string;
    af_status?: string;
    error?: { code?: string; description?: string };
    install_time?: string;
    is_first_launch?: boolean;
  };

  type ClickEvent = Record<string, any> & {
    deep_link_sub1?: string;
    deep_link_sub2?: string;
    deep_link_sub3?: string;
    deep_link_sub4?: string;
    deep_link_sub5?: string;
    deep_link_sub6?: string;
    deep_link_sub7?: string;
    deep_link_sub8?: string;
    deep_link_sub9?: string;
    deep_link_sub10?: string;
  };

  export type DeeplinkResult = Record<string, any> & {
    afSub1?: string;
    afSub2?: string;
    afSub3?: string;
    afSub4?: string;
    afSub5?: string;
    campaign?: string;
    campaignId?: string;
    clickEvent?: ClickEvent;
    clickHTTPReferrer?: string;
    deeplinkValue?: string;
    error?: { code?: string; description?: string };
    isDeferred: boolean;
    matchType?: string;
    mediaSource?: string;
  };

  /** Cached value read by a getter. `data` is null when nothing has arrived yet. */
  export type ConversionDataResponse = {
    success: boolean;
    data: ConversionData | null;
  };

  /** Cached value read by a getter. `data` is null when nothing has arrived yet. */
  export type DeepLinkResultResponse = {
    success: boolean;
    data: DeeplinkResult | null;
  };

  export type SdkStartResponse = {
    error?: { code?: string; description?: string };
    success: boolean;
  };

  export type LogEventResponse = {
    error?: { code?: string; description?: string };
    success: boolean;
  };

  export type SetCustomerUserIdResponse = {
    error?: { code?: string; description?: string };
    success: boolean;
  };
}
