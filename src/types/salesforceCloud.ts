export namespace SalesforceCloud {
  export type PermissionResponse = {
    granted: boolean;
  };

  export type GetInfoResponse = Record<string, any> & {
    deviceToken?: string;
    deviceId?: string;
    notificationUserInfo?: Record<string, any>;
    pushEnabled?: boolean;
  };

  export type GetContactKeyResponse = {
    success: boolean;
    contactKey?: string;
  };

  export type SetContactKeyParams = {
    contactKey: string;
  };

  export type SetContactKeyResponse = {
    success: boolean;
  };

  export type GetTagsResponse = {
    success: boolean;
    tags?: string[];
  };

  export type SetTagsParams = {
    tag: string;
  };

  export type SetTagsResponse = {
    success: boolean;
  }

  export type GetAttributesResponse = {
    success: boolean;
    attributes?: Record<string, any>
  };

  export type SetAttributesParams = {
    attributes?: Record<string, any>
  };

  export type SetAttributesResponse = {
    success: boolean;
  };
}
