import { CallbackData, CallbackParams } from '../types';
import { addCallbackFunction, addCommand, addCommandCallback } from '../utils';

type OneSignalSubscription = {
  id: string;
  optedIn: boolean;
  token: string;
};

/**
 * Only represents the V5 plugin response. For legacy plugin please see our docs
 */
type OneSignalInfo = {
  appId: string;
  appVersion: string;
  appVersionCode: number;
  distribution: string;
  deviceName: string;
  externalId: string;
  hardware: string;
  installationId: string;
  isFirstLaunch: boolean;
  language: string;
  legacy: boolean;
  model: string;
  oneSignalId: string;
  os: string;
  osVersion: string;
  platform: string;
  publicKey: string;
  requiresUserPrivacyConsent: boolean;
  subscription: OneSignalSubscription;
  timeZone: string;
  userConsentGiven: boolean;
} & Record<string, string | boolean | number>;

type OneSignalGetTagsData = CallbackData & {
  tags: Record<string, string>;
};

type OneSignalInAppMessageData = {
  clickName: string;
  clickUrl: string;
  firstClick: string;
  closesMessage: string;
};

const onesignal = {
  /**
   * @deprecated Use Median.onesignal.info() instead
   */
  run: {
    onesignalInfo: function () {
      addCommand('median://onesignal/info', { callback: 'median_onesignal_info' });
    },
  },
  onesignalInfo: function (params: CallbackParams<OneSignalInfo>) {
    return addCommandCallback<OneSignalInfo>('median://onesignal/info', params, true);
  },
  info: function (params: CallbackParams<OneSignalInfo>) {
    return addCommandCallback<OneSignalInfo>('median://onesignal/info', params, true);
  },
  register: function () {
    addCommand('median://onesignal/register');
  },
  userPrivacyConsent: {
    grant: function () {
      addCommand('median://onesignal/userPrivacyConsent/grant');
    },
    revoke: function () {
      addCommand('median://onesignal/userPrivacyConsent/revoke');
    },
  },
  tags: {
    getTags: function (params: CallbackParams<OneSignalGetTagsData>) {
      return addCommandCallback<OneSignalGetTagsData>('median://onesignal/tags/get', params);
    },
    setTags: function (params: CallbackParams<CallbackData> & { tags: Record<string, string> }) {
      return addCommandCallback<CallbackData>('median://onesignal/tags/set', params);
    },
    deleteTags: function (params: CallbackParams<CallbackData> & { tags?: string[] }) {
      return addCommandCallback<CallbackData>('median://onesignal/tags/delete', params);
    },
  },
  showTagsUI: function () {
    addCommand('median://onesignal/showTagsUI');
  },
  promptLocation: function () {
    addCommand('median://onesignal/promptLocation');
  },
  iam: {
    addTrigger: function (params: { key: string; value: string }) {
      addCommand('median://onesignal/iam/addTrigger', params);
    },
    addTriggers: function (params: Record<string, string>) {
      addCommand('median://onesignal/iam/addTriggers', params);
    },
    removeTriggerForKey: function (key: string) {
      const params = { key: key };
      addCommand('median://onesignal/iam/removeTriggerForKey', params);
    },
    getTriggerValueForKey: function (key: string) {
      const params = { key: key };
      addCommand('median://onesignal/iam/getTriggerValueForKey', params);
    },
    pauseInAppMessages: function () {
      addCommand('median://onesignal/iam/pauseInAppMessages?pause=true');
    },
    resumeInAppMessages: function () {
      addCommand('median://onesignal/iam/pauseInAppMessages?pause=false');
    },
    setInAppMessageClickHandler: function (handlerFunction: (data: OneSignalInAppMessageData) => void) {
      const handler = addCallbackFunction(handlerFunction, true);
      addCommand('median://onesignal/iam/setInAppMessageClickHandler', { handler });
    },
  },
  externalUserId: {
    set: function (params: CallbackParams<CallbackData> & { externalId: string | number }) {
      return addCommandCallback<CallbackData>('median://onesignal/externalUserId/set', params);
    },
    remove: function (params: CallbackParams<CallbackData>) {
      return addCommandCallback<CallbackData>('median://onesignal/externalUserId/remove', params);
    },
  },
  enableForegroundNotifications: function (enabled: boolean) {
    addCommand('median://onesignal/enableForegroundNotifications', { enabled });
  },
  badge: {
    set: function (count: number | string) {
      addCommand('median://onesignal/badge/set', { count });
    },
  },
  login: function (externalId: string | number, params: CallbackParams<CallbackData> = {}) {
    return addCommandCallback<CallbackData>('median://onesignal/login', { externalId, ...params });
  },
  logout: function (params: CallbackParams<CallbackData>) {
    return addCommandCallback<CallbackData>('median://onesignal/logout', params);
  },
};

export default onesignal;
