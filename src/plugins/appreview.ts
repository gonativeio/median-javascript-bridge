import { CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

const appreview = {
  prompt: function (params?: CallbackParams) {
    if (params) {
      return addCommandCallback('median://appReview/prompt', params);
    }
    addCommand('median://appReview/prompt');
  },
};

export default appreview;
