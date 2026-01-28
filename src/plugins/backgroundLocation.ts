import { AnyData } from '../types/index.js';
import { addCommand } from '../utils.js';

type BackgroundLocationData = {
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

type BackgroundLocationParams = {
  callback?: (data: BackgroundLocationData) => void;
  postUrl?: string;

  // iOS
  iosBackgroundIndicator?: boolean;
  iosPauseAutomatically?: boolean;
  iosDistanceFilter?: number;
  iosDesiredAccuracy?: 'best' | 'bestForNavigation' | 'tenMeters' | 'hundredMeters' | 'kilometer' | 'threeKilometers';
  iosActivityType?: 'other' | 'automotiveNavigation' | 'otherNavigation' | 'fitness' | 'airborne';

  // Android
  androidInterval?: number;
  androidFastestInterval?: number;
  androidPriority?: 'highAccuracy' | 'balanced' | 'lowPower' | 'noPower';
  androidSmallestDisplacement?: number;
  androidNotificationTitle?: string;
  androidNotificationText?: string;
};

const backgroundLocation = {
  start: function (params: BackgroundLocationParams) {
    addCommand('median://backgroundLocation/start', params, true);
  },
  stop: function () {
    addCommand('median://backgroundLocation/stop');
  },
};

export default backgroundLocation;
