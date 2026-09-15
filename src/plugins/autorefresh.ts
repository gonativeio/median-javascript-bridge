import { addCommand } from '../utils/index.js';

type AutoRefreshParams = {
  enabled: boolean;
  interval: number;
  url?: string;
};

const autorefresh = {
  set: function (params: AutoRefresh.Params) {
    addCommand('median://autorefresh/set', params);
  },
};

export default autorefresh;
