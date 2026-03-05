import { addCommand } from '../utils/index.js';

type BeaconScanData = {
  success: boolean;
  beacons: {
    format: string;
    uuid: string;
    major: number;
    minor: number;
    rssi: number;
    proximity?: 'immediate' | 'near' | 'far' | 'unknown';
    accurary?: number;
    distance?: number;
  }[];
};

type BeaconScanParams = {
  callback: (data: BeaconScanData) => void;
  uuid?: string;
};

const beacon = {
  scan: function (params: BeaconScanParams) {
    addCommand('median://beacon/scan', params);
  },
};

export default beacon;
