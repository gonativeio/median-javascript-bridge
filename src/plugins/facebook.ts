import { AnyData } from '../types';
import { addCommand } from '../utils';

type FacebookSendEventParams = {
  event: string;
  parameters?: Record<string, AnyData>;
  valueToSum?: number;
};

const facebook = {
  events: {
    send: function (params: FacebookSendEventParams) {
      addCommand('median://facebook/events/send', params);
    },
    sendPurchase: function (params: Record<string, AnyData>) {
      addCommand('median://facebook/events/sendPurchase', params);
    },
  },
  setAutoLogging: function (enabled: boolean) {
    addCommand('median://facebook/setAutoLogging', { enabled });
  },
};

export default facebook;
