import { addCommandCallback } from '../utils/index.js';

type ModalClosedData = {
  url: string;
  closeMethod: 'closeButton' | 'autoClosePath';
};

type ModalLaunchParams = {
  url: string;
  autoClosePath?: string;
  callback?: (data: ModalClosedData) => void;
};

const modal = {
  launch: function (params: ModalLaunchParams) {
    return addCommandCallback('median://modal/launch', params);
  },
};

export default modal;
