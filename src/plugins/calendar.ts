import { addCommand } from '../utils.js';

const calendar = {
  download: function (params: { url: string }) {
    addCommand('gonative://calendar/download', params);
  },
};

export default calendar;
