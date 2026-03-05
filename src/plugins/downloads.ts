import { CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

type DownloadStatus = {
  identifier?: string;
  event?: 'progress' | 'done' | 'error';
  bytesWritten?: number;
  expectedBytes?: number;
  errorMessage?: string;
};

type DownloadFileParams = {
  url: string;
  title: string;
  identifier?: string;
  details?: string;
  data?: string;
};

const downloads = {
  init: function (params: CallbackParams<DownloadStatus>) {
    return addCommandCallback('median://downloads/init', params);
  },
  downloadFile: function (params: DownloadFileParams) {
    addCommand('median://downloads/downloadFile', params);
  },
  showUI: function () {
    addCommand('median://downloads/showUI');
  },
};

export default downloads;
