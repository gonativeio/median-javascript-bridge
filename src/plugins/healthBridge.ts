import { CallbackData, CallbackParams } from '../types';
import { addCommandCallback } from '../utils';

/**
 * Supported HealthBridge data types.
 */
type HealthBridgeDataType =
  | 'activeEnergy'
  | 'bloodGlucose'
  | 'bloodPressure'
  | 'bmi'
  | 'bodyFat'
  | 'bodyTemperature'
  | 'calorieIntake'
  | 'distance'
  | 'elevationGain'
  | 'exerciseTime'
  | 'heartRate'
  | 'heartRateVariability'
  | 'height'
  | 'menstruation'
  | 'nutrition'
  | 'oxygenSaturation'
  | 'respiratoryRate'
  | 'restingHeartRate'
  | 'sleep'
  | 'speed'
  | 'steps'
  | 'totalCaloriesBurned'
  | 'vo2Max'
  | 'waterIntake'
  | 'weight';

/**
 * Represents a single HealthBridge data item.
 */
type HealthBridgeGetDataItem = {
  /** Numeric value or key-value pairs (e.g. nutrition breakdown) */
  value: number | Record<string, number>;
  /** Timestamp for point-in-time data */
  timestamp?: string;
  /** Start time for interval-based data */
  start?: string;
  /** End time for interval-based data */
  end?: string;
};

/**
 * HealthBridge data response.
 */
type HealthBridgeGetData = {
  /** Health data grouped by data type */
  data: Record<HealthBridgeDataType, HealthBridgeGetDataItem[]>;
};

/**
 * Parameters for fetching HealthBridge data.
 */
type HealthBridgeGetDataParams = CallbackParams<HealthBridgeGetData> & {
  /** Health data types to retrieve */
  dataTypes: HealthBridgeDataType[];
  /** ISO string representing the start date */
  startDate: string;
  /** ISO string representing the end date */
  endDate: string;
  /** Optional data aggregation bucket. Default is raw. */
  bucket?: 'raw' | 'minute' | 'hour' | 'day';
};

/**
 * HealthBridge plugin for Median.
 * Provides access to health and fitness data with permission handling.
 */
const healthBridge = {
  /**
   * Request user permission for specific health data types.
   *
   * @param dataTypes - List of health data types to request access for.
   * @returns A promise resolving with the permission request result.
   */
  requestPermissions: function (dataTypes: HealthBridgeDataType[]) {
    return addCommandCallback<CallbackData>('median://healthBridge/requestPermissions', {
      dataTypes,
    });
  },
  
  /**
   * Retrieve health data for the specified data types and time range.
   *
   * @param params - Parameters for fetching health data.
   * @param params.dataTypes - Health data types to retrieve.
   * @param params.startDate - Start date (ISO string).
   * @param params.endDate - End date (ISO string).
   * @param params.bucket - Optional aggregation bucket.
   * @returns A promise resolving with the requested health data.
   */
  getData: function (params: HealthBridgeGetDataParams) {
    return addCommandCallback<HealthBridgeGetData>('median://healthBridge/getData', params);
  },
};

export default healthBridge;
