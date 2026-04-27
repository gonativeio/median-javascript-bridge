import { JWPlayer } from '../types/jwplayer.js';
import { addCommandCallback } from '../utils/index.js';

const jwplayer = {
  initialize: function (params: JWPlayer.InitializeParams) {
    return addCommandCallback<JWPlayer.InitializeResponse>('median://jwplayer/initialize', params);
  },
  play: function (params: JWPlayer.PlayParams) {
    return addCommandCallback<JWPlayer.PlayResponse>('median://jwplayer/play', params);
  },
};

export default jwplayer;
