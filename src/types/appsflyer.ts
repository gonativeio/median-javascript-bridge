export namespace AppsFlyer {
  export type ConversionData = Record<string, any> & {
    af_message?: string;
    af_status?: string;
    error?: string;
    install_time?: string;
    is_first_launch?: boolean;
  };

  export type DeeplinkResult = Record<string, any> & {
    afSub1?: string;
    afSub2?: string;
    afSub3?: string;
    afSub4?: string;
    afSub5?: string;
    campaign?: string;
    campaignId?: string;
    clickEvent?: string;
    clickHTTPReferrer?: string;
    deeplinkValue?: string;
    isDeferred: boolean;
    matchType?: string;
    mediaSource?: string;
  };

  export type SdkStartResponse = {
    error?: string;
    success: boolean;
  };
}
