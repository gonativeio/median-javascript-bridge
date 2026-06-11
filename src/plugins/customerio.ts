import { CustomerIo } from '../types/customerio.js';
import { addCallbackFunction, addCommand, addCommandCallback } from '../utils/index.js';

const customerio = {
  identify: function (params: CustomerIo.IdentifyParams) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/identify', params);
  },
  reset: function () {
    return addCommandCallback<CustomerIo.Result>('median://customerio/reset');
  },
  getUserId: async function () {
    const result = await addCommandCallback<CustomerIo.GetUserIdResponse>('median://customerio/getUserId');
    return result.userId || null;
  },
  setProfileAttributes: function (attributes: CustomerIo.Attributes) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/setProfileAttributes', { attributes });
  },
  setDeviceAttributes: function (attributes: CustomerIo.Attributes) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/setDeviceAttributes', { attributes });
  },
  deleteDeviceToken: function () {
    return addCommandCallback<CustomerIo.Result>('median://customerio/deleteDeviceToken');
  },
  push: {
    getPermissionStatus: function () {
      return addCommandCallback<CustomerIo.PermissionResult>('median://customerio/push/getPermissionStatus');
    },
    requestPermission: function () {
      return addCommandCallback<CustomerIo.PermissionResult>('median://customerio/push/requestPermission');
    },
    opened: {
      addListener: async function (callback: (data: CustomerIo.PushPayload) => void) {
        const listenerCallback = addCallbackFunction(callback, true);
        const result = await addCommandCallback('median://customerio/push/opened/addListener', { listenerCallback });
        return result.listenerId || null;
      },
      removeListener: function (listenerId: string) {
        addCommand('median://customerio/push/opened/removeListener', { listenerId });
      },
    },
    received: {
      addListener: async function (callback: (data: CustomerIo.PushPayload) => void) {
        const listenerCallback = addCallbackFunction(callback, true);
        const result = await addCommandCallback('median://customerio/push/received/addListener', { listenerCallback });
        return result.listenerId || null;
      },
      removeListener: function (listenerId: string) {
        addCommand('median://customerio/push/received/removeListener', { listenerId });
      },
    },
  },
  track: function (params: CustomerIo.EventParams) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/track', params);
  },
  screen: function (params: CustomerIo.EventParams) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/screen', params);
  },
  setLogLevel: function (level: CustomerIo.LogLevel) {
    return addCommandCallback<CustomerIo.Result>('median://customerio/setLogLevel', { level });
  },
};

export default customerio;
