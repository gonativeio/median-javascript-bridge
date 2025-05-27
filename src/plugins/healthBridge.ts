import { CallbackData, CallbackParams } from '../types';
import { addCommandCallback } from '../utils';

type HealthBridgeDataType =
  | 'steps'
  | 'distance'
  | 'activeEnergy'
  | 'exerciseTime'
  | 'height'
  | 'weight'
  | 'bmi'
  | 'calorieIntake'
  | 'waterIntake'
  | 'sleep';

type HealthBridgeGetData = {
  data: Record<
    HealthBridgeDataType,
    {
      value: number;
      timestamp?: string;
      start?: string;
      end?: string;
    }
  >;
};

type HealthBridgeGetDataParams = CallbackParams<HealthBridgeGetData> & {
  dataTypes: HealthBridgeDataType[];
  startDate: string;
  endDate: string;
  bucket?: 'raw' | 'minute' | 'hour' | 'day';
};

const healthBridge = {
  requestPermissions: function (dataTypes: HealthBridgeDataType[]) {
    return addCommandCallback<CallbackData>('median://healthBridge/requestPermissions', {
      dataTypes,
    });
  },
  getData: function (params: HealthBridgeGetDataParams) {
    return addCommandCallback<HealthBridgeGetData>('median://healthBridge/getData', params);
  },
};

export default healthBridge;
