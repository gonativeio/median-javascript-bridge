export namespace Clerk {
  export type InitializeParams = {
    publishableKey: string;
  };

  export type InitializeResponse = {
    success: boolean;
    error?: {
      code: string;
      message: string;
    };
  };

  export type PresentSignInResponse = {
    hasValidToken: boolean;
    success: boolean;
    state: 'signedIn' | 'signedOut';
    token?: string;
    userId?: string;
    error?: {
      code: string;
      message: string;
    };
  };

  export type SignOutResponse = {
    success: boolean;
    error?: {
      code: string;
      message: string;
    };
  };

  export type GetAuthStatusResponse = {
    hasValidToken: boolean;
    success: boolean;
    state: 'signedIn' | 'signedOut';
    token?: string;
    userId?: string;
  };
}
