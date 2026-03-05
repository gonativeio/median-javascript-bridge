import { addCommand } from '../utils/index.js';

type HapticsTriggerParams = {
  style:
    | 'impactLight'
    | 'impactMedium'
    | 'impactHeavy'
    | 'notificationSuccess'
    | 'notificationWarning'
    | 'notificationError'
    | 'tick'
    | 'click'
    | 'double_click';
};

const haptics = {
  trigger: function (params: HapticsTriggerParams) {
    addCommand('median://haptics/trigger', params);
  },
};

export default haptics;
