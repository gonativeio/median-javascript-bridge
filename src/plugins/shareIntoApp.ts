import { createListener } from '../utils/listener';

export type ShareToAppData = { url: string; subject: string };

const share = {
  shareResult: createListener<ShareToAppData>('_median_share_to_app'),
};

export default share;
