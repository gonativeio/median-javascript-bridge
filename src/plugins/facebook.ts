import { AnyData } from '../types/index.js';
import { addCommand } from '../utils/index.js';

type FacebookSendEventParams = {
  event: string;
  parameters?: Record<string, AnyData>;
  valueToSum?: number;
};

const facebook = {
  events: {
    send: function (params: Facebook.SendEventParams) {
      addCommand('median://facebook/events/send', params);
    },
    sendPurchase: function (params: Facebook.SendPurchaseParams) {
      addCommand('median://facebook/events/sendPurchase', params);
    },
  },
  setAutoLogging: function (enabled: boolean) {
    addCommand('median://facebook/setAutoLogging', { enabled });
  },
};

export default facebook;
