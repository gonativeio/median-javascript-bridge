export namespace CustomerIo {
  export type Attributes = Record<string, string | number | boolean | null>;

  export type Result = {
    error?: string;
    success: boolean;
  };

  export type IdentifyParams = {
    userId: string;
    traits?: Attributes;
  };

  export type GetUserIdResponse = {
    userId: string | null;
  };

  export type PermissionResult = {
    granted: boolean;
    status: 'granted' | 'denied' | 'not-determined';
  };

  export type PushPayload = {
    notificationId?: string;
    title?: string;
    body?: string;
    imageUrl?: string;
    deepLink?: string;
    data?: Record<string, string | number | boolean | null>;
  };

  export type EventParams = {
    name: string;
    properties?: Attributes;
  };

  export type LogLevel = 'none' | 'error' | 'info' | 'debug';
}
