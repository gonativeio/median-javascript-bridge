import { AnyData } from './index.js';

export namespace Facebook {
  export type SendEventParams = {
    event: string;
    parameters?: Record<string, AnyData>;
    valueToSum?: number;
  };

  export type SendPurchaseParams = Record<string, AnyData>;
}
