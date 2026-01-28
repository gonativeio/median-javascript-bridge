import { CallbackData } from '../types/index.js';
import { addCommandCallback } from '../utils.js';

type TwilioJoinParams = {
  apiKey: string;
  sessionId: string;
  token: string;
  callback?: (data: CallbackData) => void;
};

const twilio = {
  video: {
    join: function (params: TwilioJoinParams) {
      return addCommandCallback('median://twilio/video/join', params);
    },
  },
};

export default twilio;
