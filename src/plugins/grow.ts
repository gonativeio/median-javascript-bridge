import { addCommandCallback } from '../utils';

type GrowPermissionRequestData = {
  granted: boolean;
  status: 'granted' | 'denied' | 'not-determined' | 'restricted';
};

type GrowPermissionStatusData = {
  granted: boolean;
  push: 'granted' | 'denied' | 'not-determined' | 'restricted';
};

type GrowUserIdentifierData = {
  userId: string | null;
};

type GrowDeviceIdentifierData = {
  deviceId: string;
};

type GrowAnalyticsGetData = {
  enabled: boolean;
  userId?: string;
  sessionId?: string;
};

const grow = {
  permissions: {
    request: function () {
      return addCommandCallback<GrowPermissionRequestData>('median://grow/permissions/request');
    },
    getStatus: async function () {
      return addCommandCallback<GrowPermissionStatusData>('median://grow/permissions/getStatus');
    },
  },
  user: {
    setIdentifier: function (userId: string) {
      return addCommandCallback('median://grow/user/setIdentifier', { userId });
    },
    getIdentifier: async function () {
      const result = await addCommandCallback<GrowUserIdentifierData>('median://grow/user/getIdentifier');
      return result.userId;
    },
  },
  device: {
    getIdentifier: async function () {
      const result = await addCommandCallback<GrowDeviceIdentifierData>('median://grow/device/getIdentifier');
      return result.deviceId;
    },
  },
  analytics: {
    getState: function () {
      return addCommandCallback<GrowAnalyticsGetData>('median://grow/analytics/getState');
    },
    setState: function (enabled: boolean) {
      return addCommandCallback('median://grow/analytics/setState', { enabled });
    },
  },
  events: {
    log: function (eventName: string, parameters?: Record<string, string>) {
      return addCommandCallback('median://grow/events/log', { eventName, parameters });
    },
    logLocation: function (location: { longitude: number; latitude: number }) {
      return addCommandCallback('median://grow/events/logLocation', { location });
    },
  },
  attributes: {
    set: function (key: string, value: string | number | boolean | Date) {
      return addCommandCallback('median://grow/attributes/set', { key, value });
    },
    remove: function (key: string) {
      return addCommandCallback('median://grow/attributes/remove', { key });
    },
  },
  privacy: {
    collectData: function () {
      return addCommandCallback('median://grow/privacy/collectData');
    },
    eraseData: function () {
      return addCommandCallback('median://grow/privacy/eraseData');
    },
    removeAccount: function () {
      return addCommandCallback('median://grow/privacy/removeAccount');
    },
    setTrackingAllowed: function (allowed: boolean) {
      return addCommandCallback('median://grow/privacy/setTrackingAllowed', { allowed });
    },
  },
  campaigns: {
    pause: function () {
      return addCommandCallback('median://grow/campaigns/pause');
    },
    resume: function () {
      return addCommandCallback('median://grow/campaigns/resume');
    },
  },
};

export default grow;
