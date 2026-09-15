import { AnyData } from './index.js';

export namespace BackgroundLocation {
  export type Data = {
    timestamp: AnyData;
    latitude: number;
    longitude: number;
    altitude: number;
    floor: number;
    horizontalAccuracy: number;
    verticalAccuracy: number;
    speed: number;
    bearing: AnyData;
  };

  export type Params = {
    callback?: (data: Data) => void;
    postUrl?: string;
    iosBackgroundIndicator?: boolean;
    iosPauseAutomatically?: boolean;
    iosDistanceFilter?: number;
    iosDesiredAccuracy?: 'best' | 'bestForNavigation' | 'tenMeters' | 'hundredMeters' | 'kilometer' | 'threeKilometers';
    iosActivityType?: 'other' | 'automotiveNavigation' | 'otherNavigation' | 'fitness' | 'airborne';
    androidInterval?: number;
    androidFastestInterval?: number;
    androidPriority?: 'highAccuracy' | 'balanced' | 'lowPower' | 'noPower';
    androidSmallestDisplacement?: number;
    androidNotificationTitle?: string;
    androidNotificationText?: string;
  };
}
