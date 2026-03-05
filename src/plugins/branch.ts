import { CallbackData, CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';
import { createListener } from '../utils/listener.js';

type BranchParamsItem = number | number[] | string | string[];

type BranchParamsData = Record<string, BranchParamsItem | Record<string, BranchParamsItem>>;

type BranchIsInitializedData = { initialized: boolean };

export type BranchInitializedData = CallbackData & {
  data?: BranchParamsData;
};

const branch = {
  getFirstParams: function (params: CallbackParams<BranchParamsData>) {
    return addCommandCallback<BranchParamsData>('median://branch/getFirstParams', params);
  },
  getLatestParams: function (params: CallbackParams<BranchParamsData>) {
    return addCommandCallback<BranchParamsData>('median://branch/getLatestParams', params);
  },
  isInitialized: function (params: CallbackParams<BranchIsInitializedData>) {
    return addCommandCallback<BranchIsInitializedData>('median://branch/isInitialized', params);
  },
  initialized: createListener<BranchInitializedData>('_median_branch_initialized'),
};

export default branch;
