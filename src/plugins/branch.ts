import { CallbackData, CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils.js';

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
};

export default branch;
