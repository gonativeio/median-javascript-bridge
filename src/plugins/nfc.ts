import { CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils/index.js';

type NFCStatusData = {
  available: boolean;
};

type NFCReadTagData = {
  success?: boolean;
  cancel?: boolean;
  error?: string;
  type?: string;
  prefix?: string;
  content?: string;
  uri?: string;
};

const nfc = {
  status: function (params: CallbackParams<NFCStatusData>) {
    return addCommandCallback<NFCStatusData>('gonative://nfc/status', params);
  },
  readTag: function (params: CallbackParams<NFCReadTagData>) {
    return addCommandCallback<NFCReadTagData>('gonative://nfc/readTag', params);
  },
};

export default nfc;
