export namespace Beacon {
  export type ScanBeacon = {
    format: string;
    uuid: string;
    major: number;
    minor: number;
    rssi: number;
    proximity?: 'immediate' | 'near' | 'far' | 'unknown';
    accurary?: number;
    distance?: number;
  };

  export type ScanData = {
    success: boolean;
    beacons: ScanBeacon[];
  };

  export type ScanParams = {
    callback: (data: ScanData) => void;
    uuid?: string;
  };
}
