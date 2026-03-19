export namespace MasterLock {
  export type InitializeParams = {
    license: string;
  };

  export type InitializeResponse = {
    success: boolean;
  };

  export type ScanParams = {
    onScanStart?: () => void;
    onScanStop?: () => void;
    onDeviceDiscover?: () => void;
    timeout?: number;
  };

  export type UnlockParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    mechanism: 'primary' | 'secondary';
    timeout?: number;
  };

  export type UnlockResponse = {
    success: boolean;
  };

  export type PermissionResponse = {
    granted: boolean;
  };

  export type UpdateFirmwareParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    targetFirmwareVersion: number | string;
    timeout?: number;
  };

  export type UpdateFirmwareResponse = {
    success: boolean;
  };

  export type FirmwareUpdateStatus = {
    deviceId: string;
    state: string;
  };

  export type FirmwareUpdateAddListenerResponse = {
    listenerId: string;
  };

  export type LockResetParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    timeout?: number;
  };

  export type LockResetResponse = {
    success: boolean;
  };

  export type GetDeadBoltHandednessParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    timeout?: number;
  };

  export type GetDeadBoltHandednessResponse = {
    deviceId: string;
    handedness: 'left' | 'right';
    success: boolean;
  };

  export type SetDeadBoltHandednessParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    handedness: 'left' | 'right';
    timeout?: number;
  };

  export type SetDeadBoltHandednessResponse = {
    deviceId: string;
    handedness: 'left' | 'right';
    success: boolean;
  };

  export type RelockParams = {
    accessProfile: string;
    deviceId: string;
    firmwareVersion: number | string;
    timeout?: number;
  };

  export type RelockResponse = {
    deviceId: string;
    success: boolean;
  };
}
