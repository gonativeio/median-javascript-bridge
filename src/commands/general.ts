import { AnyData, CallbackParams } from '../types';
import { addCommand, addCommandCallback } from '../utils';

const camera = {
  setCaptureQuality: function (quality: 'high' | 'low') {
    addCommand('median://camera/setCaptureQuality', { quality });
  },
  saveToGallery: function (saveToGallery: boolean) {
    addCommand('median://camera/saveToGallery', { saveToGallery });
  },
};

type ClipboardData = { data: string };

const clipboard = {
  set: function (params: ClipboardData) {
    addCommand('median://clipboard/set', params);
  },
  get: function (params: CallbackParams<ClipboardData>) {
    return addCommandCallback<ClipboardData>('median://clipboard/get', params);
  },
};

const config = {
  set: function (params: { initialUrl: string }) {
    addCommand('median://config/set', params);
  },
};

type ConnectivityData = { connected: number; type: string };

const connectivity = {
  get: function (params: CallbackParams<ConnectivityData>) {
    return addCommandCallback<ConnectivityData>('median://connectivity/get', params);
  },
  subscribe: function (params: CallbackParams<ConnectivityData>) {
    return addCommandCallback<ConnectivityData>('median://connectivity/subscribe', params, true);
  },
  unsubscribe: function () {
    addCommand('median://connectivity/unsubscribe');
  },
};

type ContextMenuLinkAction = 'copyLink' | 'openExternal';

const contextMenu = {
  setEnabled: function (enabled: boolean) {
    addCommand('median://contextMenu/setEnabled', { enabled });
  },
  setLinkActions: function (actions: ContextMenuLinkAction[]) {
    addCommand('median://contextMenu/setLinkActions', { actions });
  },
};

export type DeviceInfo = {
  platform: 'ios' | 'android';
  appId: string;
  appVersion: string;
  appBuild: string;
  carrierNames: string[];
  distribution: string;
  hardware: string;
  installationId: string;
  apnsToken?: string;
  fcmToken?: string;
  language: string;
  model: string;
  os: string;
  osVersion: string;
  timeZone: string;
  isFirstLaunch: boolean;
} & Record<string, string | boolean | number>;

const deviceInfo = function (params: CallbackParams<DeviceInfo>) {
  return addCommandCallback<DeviceInfo>('median://run/median_device_info', params, true);
};

type InternalExternalParams = {
  rules: {
    id: number;
    regex: string;
    internal: boolean;
  }[];
};

const internalExternal = {
  set: function (params: InternalExternalParams) {
    addCommand('median://internalExternal/set', params);
  },
};

export type KeyboardInfo = {
  visible: boolean;
  keyboardWindowSize: {
    width: number;
    height: number;
  };
  visibleWindowSize: {
    width: number;
    height: number;
  };
};

const keyboard = {
  info: function (params: CallbackParams<KeyboardInfo>) {
    return addCommandCallback<KeyboardInfo>('median://keyboard/info', params);
  },
  listen: function (callback: (data: KeyboardInfo) => void) {
    addCommand('median://keyboard/listen', { callback });
  },
  showAccessoryView: function (visible: boolean) {
    addCommand('median://keyboard/showAccessoryView', { visible });
  },
};

type NativeBridgeMultiParams = { data: { urls: string[] } };

const nativebridge = {
  custom: function (params: AnyData) {
    return addCommandCallback('median://nativebridge/custom', params);
  },
  multi: function (params: NativeBridgeMultiParams) {
    addCommand('median://nativebridge/multi', params);
  },
};

type NavigationLevelsSetParams = {
  active: boolean;
  levels: { regex: string; level: number }[];
  persist: boolean;
};

type NavigationLevelsSetCurrentParams = {
  data: {
    active: boolean;
    levels: { regex: string; level: number }[];
  };
  persist: boolean;
};

const navigationLevels = {
  set: function (data: NavigationLevelsSetParams) {
    addCommand('median://navigationLevels/set', {
      persist: data.persist,
      data,
    });
  },
  setCurrent: function (params: NavigationLevelsSetCurrentParams) {
    addCommand('median://navigationLevels/set', params);
  },
  revert: function () {
    addCommand('median://navigationLevels/set?persist=true');
  },
};

const navigationMaxWindows = {
  set: function (maxWindows: number, autoClose: boolean) {
    addCommand('median://navigationMaxWindows/set', {
      data: maxWindows,
      autoClose: autoClose,
      persist: true,
    });
  },
  setCurrent: function (maxWindows: number, autoClose: boolean) {
    addCommand('median://navigationMaxWindows/set', {
      data: maxWindows,
      autoClose: autoClose,
    });
  },
};

type NavigationTitlesSetParams = {
  active: boolean;
  titles: { regex: string; showImage?: boolean; title?: number }[];
  persist: boolean;
};

const navigationTitles = {
  set: function (params: NavigationTitlesSetParams) {
    addCommand('median://navigationTitles/set', {
      persist: params.persist,
      data: params,
    });
  },
  setCurrent: function (params: { title: string }) {
    addCommand('median://navigationTitles/setCurrent', params);
  },
  revert: function () {
    addCommand('median://navigationTitles/set?persist=true');
  },
};

const open = {
  appSettings: function () {
    addCommand('median://open/app-settings');
  },
};

const registration = {
  send: function (customData: AnyData) {
    addCommand('median://registration/send', { customData });
  },
};

const run = {
  deviceInfo: function () {
    addCommand('median://run/median_device_info');
  },
};

type ScreenBrightnessType = string | number;

const screen = {
  setBrightness: function (
    data: ScreenBrightnessType | { brightness: ScreenBrightnessType; restoreOnNavigation: boolean }
  ) {
    const params = ['number', 'string'].includes(typeof data) ? { brightness: data } : data;
    addCommand('median://screen/setBrightness', params);
  },
  setMode: function (params: { mode: 'auto' | 'light' | 'dark' }) {
    addCommand('median://screen/setMode', params);
  },
  keepScreenOn: function (params: { enable: boolean }) {
    addCommand('median://screen/keepScreenOn', params);
  },
  keepScreenNormal: function () {
    addCommand('median://screen/keepScreenNormal');
  },
};

const share = {
  sharePage: function (params: { url: string; text?: string }) {
    addCommand('median://share/sharePage', params);
  },
  downloadFile: function (params: { url: string; filename?: string; open?: boolean }) {
    addCommand('median://share/downloadFile', params);
  },
  downloadImage: function (params: { url: string }) {
    addCommand('median://share/downloadImage', params);
  },
};

type SidebarItem = {
  icon?: string;
  label: string;
  url: string;
};

type SidebarGroupItem = {
  icon?: string;
  isGrouping: true;
  label: string;
  subLinks: SidebarItem[];
};

type SidebarSetParams = {
  enabled: boolean;
  items: (SidebarItem | SidebarGroupItem)[];
  persist: boolean;
};

type SidebarGetData = {
  active: boolean;
  items: (SidebarItem | SidebarGroupItem)[] | null;
  name: string;
}[];

const sidebar = {
  setItems: function (params: SidebarSetParams) {
    addCommand('median://sidebar/setItems', params);
  },
  getItems: function (params: CallbackParams<SidebarGetData>) {
    return addCommandCallback<SidebarGetData>('median://sidebar/getItems', params);
  },
};

const statusbar = {
  set: function (params: { style: 'auto' | 'light' | 'dark'; color: string; overlay: boolean; blur: boolean }) {
    addCommand('median://statusbar/set', params);
  },
  matchBodyBackgroundColor: function (params: { active: boolean }) {
    addCommand('median://statusbar/matchBodyBackgroundColor', params);
  },
};

type TabNavigationItem = {
  icon: string;
  label?: string;
  url: string;
};

type TabNavigationSetParams = {
  enabled: boolean;
  items: TabNavigationItem[];
};

const tabNavigation = {
  selectTab: function (tabIndex: number) {
    addCommand('median://tabs/select/' + tabIndex);
  },
  deselect: function () {
    addCommand('median://tabs/deselect');
  },
  setTabs: function (tabs: TabNavigationSetParams) {
    addCommand('median://tabs/setTabs', { tabs });
  },
};

const webview = {
  clearCache: function () {
    addCommand('median://webview/clearCache');
  },
  clearCookies: function () {
    addCommand('median://webview/clearCookies');
  },
  reload: function () {
    addCommand('median://webview/reload');
  },
};

export type NewWindowMode = 'blank' | 'internal' | 'external' | 'appbrowser';

const window = {
  open: function (url: string, mode: NewWindowMode = 'blank') {
    addCommand('median://window/open', { url, mode });
  },
  close: function () {
    addCommand('median://window/close');
  },
};

export {
  camera,
  clipboard,
  config,
  connectivity,
  contextMenu,
  deviceInfo,
  internalExternal,
  keyboard,
  nativebridge,
  navigationLevels,
  navigationMaxWindows,
  navigationTitles,
  open,
  registration,
  run,
  screen,
  share,
  sidebar,
  statusbar,
  tabNavigation,
  webview,
  window,
};
