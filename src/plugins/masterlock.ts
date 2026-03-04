import { MasterLock } from '../types/masterlock.js';
import { addCallbackFunction, addCommand, addCommandCallback } from '../utils.js';

const masterlock = {
  initialize: function (params: MasterLock.InitializeParams) {
    return addCommandCallback<MasterLock.InitializeResponse>('median://masterlock/initialize', params);
  },
  scan: function (params: MasterLock.ScanParams) {
    const parameters: Record<string, any> = {};
    if (params?.onScanStart) {
      parameters.onScanStart = addCallbackFunction(params?.onScanStart, true);
    }
    if (params?.onScanStop) {
      parameters.onScanStop = addCallbackFunction(params?.onScanStop, true);
    }
    if (params?.onDeviceDiscover) {
      parameters.onDeviceDiscover = addCallbackFunction(params?.onDeviceDiscover, true);
    }
    addCommand('median://masterlock/scan', parameters);
  },
  unlock: function (params: MasterLock.UnlockParams) {
    return addCommandCallback<MasterLock.UnlockResponse>('median://masterlock/unlock', params);
  },
  permissionGranted: function () {
    return addCommandCallback<MasterLock.PermissionResponse>('median://masterlock/permissionGranted');
  },
  updateFirmware: function (params: MasterLock.UpdateFirmwareParams) {
    return addCommandCallback<MasterLock.UpdateFirmwareResponse>('median://masterlock/updateFirmware', params);
  },
  firmwareUpdate: {
    addListener: async function (callback: (status: MasterLock.FirmwareUpdateStatus) => void) {
      const listenerIdCallback = addCallbackFunction(callback, true);
      const result = await addCommandCallback<MasterLock.FirmwareUpdateAddListenerResponse>(
        'median://masterlock/firmwareUpdate/addListener',
        { listenerIdCallback }
      );
      if (!result || !result.listenerId) {
        throw 'Invalid listenerId response';
      } else {
        return result.listenerId;
      }
    },
    removeListener: function (listenerId: string) {
      addCommand('median://masterlock/firmwareUpdate/removeListener', { listenerId });
    },
  },
  lockReset: function (params: MasterLock.LockResetParams) {
    return addCommandCallback<MasterLock.LockResetResponse>('median://masterlock/lockReset', params);
  },
  getDeadboltHandedness: function (params: MasterLock.GetDeadBoltHandednessParams) {
    return addCommandCallback<MasterLock.GetDeadBoltHandednessResponse>(
      'median://masterlock/getDeadboltHandedness',
      params
    );
  },
  setDeadboltHandedness: function (params: MasterLock.SetDeadBoltHandednessParams) {
    return addCommandCallback<MasterLock.SetDeadBoltHandednessResponse>(
      'median://masterlock/setDeadboltHandedness',
      params
    );
  },
  relock: function (params: MasterLock.RelockParams) {
    return addCommandCallback<MasterLock.RelockResponse>('median://masterlock/relock', params);
  },
};

export default masterlock;
