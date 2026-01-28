import { AnyData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils.js';

const esmiley = {
  scan: function (timeout: number) {
    return addCommandCallback('median://esmiley/scan', { timeout });
  },
  connect: function (deviceId: string) {
    return addCommandCallback('median://esmiley/connect', { deviceId });
  },
  disconnect: function () {
    addCommand('median://esmiley/disconnect');
  },
  send: function (object: AnyData) {
    return addCommandCallback('median://esmiley/send', { object });
  },
};

export default esmiley;
