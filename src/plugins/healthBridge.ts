import { HealthBridge } from '../types/healthBridge';
import { addCommandCallback } from '../utils.js';

/**
 * HealthBridge plugin for Median.
 * Provides access to health and fitness data with permission handling.
 */
export const healthBridge = {
  /**
   * Request user permission for specific health data types.
   */
  requestPermissions: function (dataTypes: HealthBridge.DataType[]) {
    return addCommandCallback<HealthBridge.RequestPermissionsResponse>('median://healthBridge/requestPermissions', {
      dataTypes,
    });
  },

  /**
   * Retrieve health data for the specified data types and time range.
   */
  getData: function (params: HealthBridge.GetDataParams) {
    return addCommandCallback<HealthBridge.GetDataResponse>('median://healthBridge/getData', params);
  },
};

export default healthBridge;
