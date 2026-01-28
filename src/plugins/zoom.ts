import { addCommandCallback } from '../utils.js';

type ZoomJoinParams = {
  sessionName: string;
  userIdentity?: string;
  token: string;
  password?: string;
};

const zoom = {
  video: {
    join: function (params: ZoomJoinParams) {
      return addCommandCallback('median://zoom/join', params);
    },
  },
};

export default zoom;
