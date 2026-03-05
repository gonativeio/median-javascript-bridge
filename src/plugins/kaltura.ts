import { CallbackData } from '../types/index.js';
import { addCommand } from '../utils/index.js';

type KalturaPlayParams = {
  entryId: string;
  onError?: (data: CallbackData) => void;
  callback?: (data: { lastPosition: number }) => void;
};

const kaltura = {
  play: function (params: KalturaPlayParams) {
    addCommand('median://kaltura/play', params);
  },
};

export default kaltura;
