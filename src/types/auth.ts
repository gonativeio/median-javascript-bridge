import { CallbackData, CallbackParams } from './index.js';

export namespace Auth {
  export type StatusData = {
    biometryType: string;
    hasTouchId: boolean;
    hasSecret: boolean;
    error: string;
  };

  export type SaveParams = CallbackParams<CallbackData> & {
    secret: string;
  };

  export type GetData = CallbackData & {
    secret?: string;
  };

  export type GetParams = CallbackParams<GetData> & {
    prompt?: string;
  };

  export type DeleteParams = CallbackParams<CallbackData>;
}
