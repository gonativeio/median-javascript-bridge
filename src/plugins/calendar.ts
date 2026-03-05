import { addCommand } from '../utils/index.js';

const calendar = {
  download: function (params: { url: string }) {
    addCommand('gonative://calendar/download', params);
  },
};

export default calendar;
