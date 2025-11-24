import { AnyData } from '../types';
import { addCommand, addCommandCallback } from '../utils';

type IntentEdgeNumberSegmentResult = {
  success: boolean;
  segmentName: string;
  value: number;
};

type IntentEdgeStringSegmentResult = {
  success: boolean;
  segmentName: string;
  value: string;
};

type IntentEdgeBooleanSegmentResult = {
  success: boolean;
  segmentName: string;
  value: boolean;
};

export enum IntentEdgeUserInteractionType {
  ACCEPTED_TRIGGER = 'acceptedTrigger',
  NOTIFICATION_CLICK = 'notificationClick',
  CONVERSION = 'conversion',
}

type IntentEdgeCampaignTriggerCallback = (data: { action: string; userInfo: Record<string, AnyData> }) => void;

type IntentEdgeCampaignClickCallback = (data: { actionPerformed: boolean; userInfo: Record<string, AnyData> }) => void;

const intentedge = {
  microSegments: {
    setInteger: function (segmentName: string, value: string) {
      addCommand('median://intentedge/microSegments/setInteger', { segmentName, value });
    },
    setFloat: function (segmentName: string, value: string) {
      addCommand('median://intentedge/microSegments/setFloat', { segmentName, value });
    },
    setString: function (segmentName: string, value: string) {
      addCommand('median://intentedge/microSegments/setString', { segmentName, value });
    },
    setBoolean: function (segmentName: string, value: string) {
      addCommand('median://intentedge/microSegments/setBoolean', { segmentName, value });
    },
    getInteger: function (segmentName: string) {
      return addCommandCallback<IntentEdgeNumberSegmentResult>('median://intentedge/microSegments/getInteger', {
        segmentName,
      });
    },
    getFloat: function (segmentName: string) {
      return addCommandCallback<IntentEdgeNumberSegmentResult>('median://intentedge/microSegments/getFloat', {
        segmentName,
      });
    },
    getString: function (segmentName: string) {
      return addCommandCallback<IntentEdgeStringSegmentResult>('median://intentedge/microSegments/getString', {
        segmentName,
      });
    },
    getBoolean: function (segmentName: string) {
      return addCommandCallback<IntentEdgeBooleanSegmentResult>('median://intentedge/microSegments/getBoolean', {
        segmentName,
      });
    },
  },
  pageTracker: {
    enterPage: function (pageName: string) {
      addCommand('median://intentedge/pageTracker/enterPage', { pageName });
    },
  },
  onboarding: {
    start: function () {
      addCommand('median://intentedge/onboarding/start');
    },
    complete: function () {
      addCommand('median://intentedge/onboarding/complete');
    },
  },
  events: {
    fireMicromoment: function (eventName: string, parameters?: Record<string, AnyData>) {
      addCommand('median://intentedge/events/fireMicromoment', { eventName, parameters });
    },
    sendUserInteraction: function (campaignId: string, interactionType: IntentEdgeUserInteractionType) {
      addCommand('median://intentedge/events/sendUserInteraction', { campaignId, interactionType });
    },
  },
  campaigns: {
    setCampaignTriggerHandler: function (callback: IntentEdgeCampaignTriggerCallback) {
      addCommand('median://intentedge/campaigns/setCampaignTriggerHandler', { callback }, true);
    },
    setCampaignClickHandler: function (callback: IntentEdgeCampaignClickCallback) {
      addCommand('median://intentedge/campaigns/setCampaignClickHandler', { callback }, true);
    },
  },
  dataEnrichment: {
    exportData: function (requestedMetrics?: string[]) {
      return addCommandCallback('median://intentedge/dataEnrichment/exportData', { requestedMetrics });
    },
  },
  start: function () {
    addCommand('median://intentedge/start');
  },
  stop: function (purge?: boolean) {
    addCommand('median://intentedge/stop', { purge });
  },
  launchDebugScreen: function () {
    addCommand('median://intentedge/launchDebugScreen');
  },
  exportLogs: async function () {
    const data = await addCommandCallback('median://intentedge/exportLogs');
    if (data.base64) {
      const logBlob = await intentEdgeBase64ToBlob(data.base64, data.mimeType);
      delete data.base64;
      return { ...data, logBlob };
    }
    return data;
  },
};

async function intentEdgeBase64ToBlob(base64: string, mimeType: string) {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export default intentedge;
