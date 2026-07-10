export namespace RevenueCat {
  export type ConfigureParams = {
    apiKey: string;
    appUserID?: string;
  };

  export type ConfigureResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };

  export type IsInitializedResponse = {
    apiKey?: string;
    initialized: boolean;
  }

  export type GetOfferingsResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    identifiers?: string[];
    success: boolean;
  };

  export type PurchaseParams = {
    identifier: string;
  };

  export type PurchaseResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };

  export type RestorePurchasesResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };

  export type PresentPaywallParams = {
    onCancelPurchase?: () => void;
  };

  export type PresentPaywallResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };

  export type LoginParams = {
    appUserID: string;
  };

  export type LoginResponse = {
    created?: boolean;
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };

  export type LogoutResponse = {
    error?: {
      code: string;
      message: string;
      underlyingErrorMessage?: string;
    };
    success: boolean;
  };
}
