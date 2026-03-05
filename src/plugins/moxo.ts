import { CallbackData, CallbackParams, PermissionStatusData } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

type MoxoRegisterPushData = { granted?: string; success?: boolean; error?: string };

const moxo = {
  login: function (params: CallbackParams<CallbackData> & { accessToken: string }) {
    return addCommandCallback<CallbackData>('median://moxo/login', params, true);
  },
  registerNotifications: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<MoxoRegisterPushData>('median://moxo/registerNotifications', params, true);
  },
  requestPermission: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://moxo/registerNotifications', params, true);
  },
  permissionStatus: function (params: CallbackParams<PermissionStatusData>) {
    return addCommandCallback<PermissionStatusData>('median://moxo/permissionStatus', params, true);
  },
  isLinked: function (params: CallbackParams<{ isLinked: boolean }>) {
    return addCommandCallback<{ isLinked: boolean }>('median://moxo/isLinked', params, true);
  },
  unlink: function (params: CallbackParams<CallbackData>) {
    return addCommandCallback<CallbackData>('median://moxo/unlink', params, true);
  },
  localUnlink: function (params: CallbackParams<CallbackData>) {
    return addCommandCallback<CallbackData>('median://moxo/localUnlink', params, true);
  },
  showDashboard: function () {
    addCommand('median://moxo/showDashboard');
  },
  openLiveChatWithCompletion: function () {
    addCommand('median://moxo/openLiveChatWithCompletion');
  },
  openLiveChatWithChannelId: function (params: { channelId: string; message?: string }) {
    addCommand('median://moxo/openLiveChatWithChannelId', params);
  },
  openChat: function (params: { chatId: string; feedSequence?: string | number }) {
    addCommand('median://moxo/openChat', params);
  },
  getUnreadMessageCount: function (params: CallbackParams<{ count: number }>) {
    return addCommandCallback<{ count: number }>('median://moxo/getUnreadMessageCount', params);
  },
};

export default moxo;
