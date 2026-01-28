import { CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils.js';

type KeychainSwiftStatus = { status: string; data?: string };

type KeychainSwiftSetParams = CallbackParams<KeychainSwiftStatus> & {
  key: string;
  value: string;
};

type KeychainSwiftGetOrUpdateParams = CallbackParams<KeychainSwiftStatus> & {
  key: string;
};

const keychainSwift = {
  set: function (params: KeychainSwiftSetParams) {
    return addCommandCallback<KeychainSwiftStatus>('gonative://keychainSwift/set', params);
  },
  get: function (params: KeychainSwiftGetOrUpdateParams) {
    return addCommandCallback<KeychainSwiftStatus>('gonative://keychainSwift/get', params);
  },
  delete: function (params: KeychainSwiftGetOrUpdateParams) {
    return addCommandCallback<KeychainSwiftStatus>('gonative://keychainSwift/delete', params);
  },
  deleteAll: function (params: CallbackParams<KeychainSwiftStatus>) {
    return addCommandCallback<KeychainSwiftStatus>('gonative://keychainSwift/deleteAll', params);
  },
};

export default keychainSwift;
