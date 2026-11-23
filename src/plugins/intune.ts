import { Intune } from '../types/intune.js';
import { addCommandCallback, registerListener, unregisterListener } from '../utils/index.js';

const intune = {
  getStatus: function () {
    return addCommandCallback<Intune.Status>('median://intune/getStatus');
  },
  enroll: function () {
    return addCommandCallback<Intune.Status>('median://intune/enroll');
  },
  addListener: function (callback: (data?: Intune.Event) => void) {
    return registerListener<Intune.Event>('median://intune/addListener', callback);
  },
  removeListener: function (listenerId: string) {
    return unregisterListener('median://intune/removeListener', listenerId);
  },
};

export default intune;
