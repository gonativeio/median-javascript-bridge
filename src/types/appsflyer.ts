export namespace AppsFlyer {
  /**
   * SDK error, passed through verbatim. The fields differ by platform and by
   * failure: treat it as a truthy flag and log it, do not branch on its contents.
   */
  export type ResponseError = {
    code?: number | string;
    message?: string;
    [key: string]: any;
  };

  /**
   * Envelope shared by every AppsFlyer event payload and getter response.
   * `error` is present only when `success` is false.
   */
  export type Response<T = null> = {
    success: boolean;
    data: T;
    error?: ResponseError;
  };

  export type ConversionData = Record<string, any> & {
    af_message?: string;
    af_status?: string;
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
    clickEvent?: Record<string, any>;
    clickHTTPReferrer?: string;
    deeplinkValue?: string;
    isDeferred?: boolean;
    matchType?: string;
    mediaSource?: string;
  };

  /** `data` is null when nothing has arrived yet, and on failure. */
  export type ConversionDataResponse = Response<ConversionData | null>;

  /** `data` is null when no deep link was found or nothing has arrived yet, and on failure. */
  export type DeepLinkResultResponse = Response<DeeplinkResult | null>;

  export type SdkStartResponse = Response<null>;

  export type LogEventResponse = Response<null>;

  export type SetCustomerUserIdResponse = Response<null>;
}
