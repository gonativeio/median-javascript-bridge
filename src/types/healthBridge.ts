export namespace HealthBridge {
  export type DataType =
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

  export type BasicDataPoint = {
    start?: string;
    end?: string;
    timestamp?: string;
    value: number;
  };

  export type BloodPressureDataPoint = BasicDataPoint & {
    value: {
      systolic?: number;
      diastolic?: number;
    };
  };

  export type MenstruationDataPoint = BasicDataPoint & {
    value: boolean;
  };

  export type NutritionDataPoint = BasicDataPoint & {
    value: {
      biotin?: number;
      caffeine?: number;
      calcium?: number;
      totalCarbohydrate?: number;
      chloride?: number;
      chromium?: number;
      copper?: number;
      cholesterol?: number;
      energy?: number;
      sugar?: number;
      dietaryFiber?: number;
      folate?: number;
      iodine?: number;
      iron?: number;
      magnesium?: number;
      manganese?: number;
      molybdenum?: number;
      monounsaturatedFat?: number;
      niacin?: number;
      pantothenicAcid?: number;
      phosphorus?: number;
      polyunsaturatedFat?: number;
      potassium?: number;
      protein?: number;
      riboflavin?: number;
      saturatedFat?: number;
      selenium?: number;
      sodium?: number;
      thiamin?: number;
      totalFat?: number;
      vitaminA?: number;
      vitaminB12?: number;
      vitaminB6?: number;
      vitaminC?: number;
      vitaminD?: number;
      vitaminE?: number;
      vitaminK?: number;
      zinc?: number;
    };
  };

  /**
   * Response when requesting HealthBridge permissions.
   * True if permissions were successfully granted.
   */
  export type RequestPermissionsResponse = {
    success: boolean;
  };

  /**
   * Parameters for fetching HealthBridge data.
   */
  export type GetDataParams = {
    /** List of data types to fetch */
    dataTypes: DataType[];
    /** Start date of the query (ISO string) */
    startDate: string;
    /** End date of the query (ISO string) */
    endDate: string;
    /** Optional aggregation bucket. Default is 'raw' */
    bucket?: 'raw' | 'minute' | 'hour' | 'day';
  };

  /**
   * Response from HealthBridge `GetData`.
   * Each key maps to its corresponding data point type.
   */
  export type GetDataResponse = {
    data: {
      activeEnergy?: BasicDataPoint;
      bloodGlucose?: BasicDataPoint;
      bloodPressure?: BloodPressureDataPoint;
      bmi?: BasicDataPoint;
      bodyFat?: BasicDataPoint;
      bodyTemperature?: BasicDataPoint;
      calorieIntake?: BasicDataPoint;
      distance?: BasicDataPoint;
      elevationGain?: BasicDataPoint;
      exerciseTime?: BasicDataPoint;
      heartRate?: BasicDataPoint;
      heartRateVariability?: BasicDataPoint;
      height?: BasicDataPoint;
      menstruation?: MenstruationDataPoint;
      nutrition?: NutritionDataPoint;
      oxygenSaturation?: BasicDataPoint;
      respiratoryRate?: BasicDataPoint;
      restingHeartRate?: BasicDataPoint;
      sleep?: BasicDataPoint;
      speed?: BasicDataPoint;
      steps?: BasicDataPoint;
      totalCaloriesBurned?: BasicDataPoint;
      vo2Max?: BasicDataPoint;
      waterIntake?: BasicDataPoint;
      weight?: BasicDataPoint;
    };
  };
}
