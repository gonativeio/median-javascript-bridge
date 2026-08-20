import { FirebaseMessaging } from '../types/firebaseMessaging.js';
import { addCallbackFunction, addCommand, addCommandCallback } from '../utils/index.js';

const listenerIds = new Set();

const firebaseMessaging = {
  checkPermission: function () {
    return addCommandCallback<FirebaseMessaging.PermissionResult>('median://firebaseMessaging/checkPermission');
  },
  requestPermission: function () {
    return addCommandCallback<FirebaseMessaging.PermissionResult>('median://firebaseMessaging/requestPermission');
  },
  register: function () {
    return addCommandCallback<FirebaseMessaging.GetTokenResult>('median://firebaseMessaging/register');
  },
  getToken: function () {
    return addCommandCallback<FirebaseMessaging.GetTokenResult>('median://firebaseMessaging/getToken');
  },
  deleteToken: function () {
    return addCommandCallback<FirebaseMessaging.DeleteTokenResult>('median://firebaseMessaging/deleteToken');
  },
  subscribeToTopic: function (topic: string) {
    return addCommandCallback<FirebaseMessaging.TopicResult>('median://firebaseMessaging/subscribeToTopic', { topic });
  },
  unsubscribeFromTopic: function (topic: string) {
    return addCommandCallback<FirebaseMessaging.TopicResult>('median://firebaseMessaging/unsubscribeFromTopic', {
      topic,
    });
  },
  getSubscribedTopics: function () {
    return addCommandCallback<FirebaseMessaging.GetSubscribedTopicsResult>(
      'median://firebaseMessaging/getSubscribedTopics'
    );
  },
  setBadge: function (count: number) {
    return addCommandCallback<FirebaseMessaging.SetBadgeResult>('median://firebaseMessaging/setBadge', { count });
  },
  clearBadge: function () {
    return addCommandCallback<FirebaseMessaging.SetBadgeResult>('median://firebaseMessaging/clearBadge');
  },
  setForegroundNotificationsEnabled: function () {
    return addCommandCallback<FirebaseMessaging.SetForegroundNotificationsEnabledResult>(
      'median://firebaseMessaging/setForegroundNotificationsEnabled'
    );
  },
  tokenRefreshed: {
    addListener: function (callback: (data: FirebaseMessaging.GetTokenResult) => void) {
      return registerListener('median://firebaseMessaging/tokenRefreshed/addListener', callback);
    },
  },
  notificationReceived: {
    addListener: function (callback: (data: FirebaseMessaging.PushNotificationPayload) => void) {
      return registerListener('median://firebaseMessaging/notificationReceived/addListener', callback);
    },
  },
  notificationOpened: {
    addListener: function (callback: (data: FirebaseMessaging.PushNotificationPayload) => void) {
      return registerListener('median://firebaseMessaging/notificationOpened/addListener', callback);
    },
  },
  removeListener: function (listenerId: string) {
    if (!listenerIds.delete(listenerId)) {
      return false;
    }

    try {
      delete window[listenerId as any];
    } catch {
      // NO OP
    }

    addCommand('median://firebaseMessaging/removeListener', { listenerId });
    return true;
  },

  // Android only
  channels: {
    create: function (channel: FirebaseMessaging.NotificationChannel) {
      return addCommandCallback<FirebaseMessaging.ChannelResult>('median://firebaseMessaging/channels/create', {
        channel,
      });
    },
    delete: function (id: string) {
      return addCommandCallback<FirebaseMessaging.ChannelResult>('median://firebaseMessaging/channels/delete', { id });
    },
    list: function () {
      return addCommandCallback<FirebaseMessaging.ListChannelsResult>('median://firebaseMessaging/channels/list');
    },
  },
};

function registerListener(url: string, callback: (data?: any) => void) {
  const listenerId = addCallbackFunction(callback, true);
  listenerIds.add(listenerId);
  addCommand(url, { listenerId });
  return listenerId;
}

export default firebaseMessaging;
