import { AnyData, CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';
import { createListener } from '../utils/listener.js';

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

const jsNavigation = {
  url: createListener<{ url: string }>('_median_url_changed'),
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

export type NavigationTitleImageParams = ({ url: string } | { image: string | Blob }) &
  CallbackParams<NavigationResult>;

export type NavigationResult = { success: boolean; error?: { code: string; message: string } };

type NavigationCallbacks<T> = Exclude<CallbackParams<T>, void>;
type NavigationParams<P, R> = P & NavigationCallbacks<R>;

export type NavigationError = { code: string; message: string };
export type NavigationFailure = { success: false; error: NavigationError };

export type NavigationItem = {
  label?: string;
  url?: string;
  icon?: string;
  inactiveIcon?: string;
  system?: string;
};

export type NavigationRenderedItem = NavigationItem & {
  index: number;
  badge: number | null;
  selected?: boolean;
};

export type NavigationItemUpdate = {
  item: number;
  instanceId?: string;
  label?: string;
  icon?: string;
  inactiveIcon?: string;
  url?: string;
  javascript?: string;
  badge?: number | null;
};

export type NavigationBarComponent = { items?: NavigationItem[] } & Record<string, unknown>;

export type NavigationInstance = {
  id: string;
  name?: string;
  visibleIn: string | string[];
  custom?: boolean;
  components: {
    topNavigationBar?: NavigationBarComponent;
    sidebarNavigationBar?: Record<string, unknown>;
    bottomTabBar?: NavigationBarComponent;
    contextualNavToolbar?: Record<string, unknown>;
  };
};

export type NavigationInstanceScope = { instanceId?: string };

export type NavigationSetInstancesParams = NavigationParams<
  { instances: NavigationInstance[] },
  NavigationResult
>;
export type NavigationSetInstanceParams = NavigationParams<
  { instance: NavigationInstance },
  NavigationResult
>;
export type NavigationSetItemsParams = NavigationParams<
  { items: NavigationItem[] } & NavigationInstanceScope,
  NavigationResult
>;
export type NavigationUpdateItemParams = NavigationParams<NavigationItemUpdate, NavigationResult>;
export type NavigationTopNavBarColorParams = NavigationParams<
  { color: string; colorDark?: string } & NavigationInstanceScope,
  NavigationResult
>;

export type NavigationGetInstanceResult =
  | { success: true; instance: NavigationInstance }
  | NavigationFailure;
export type NavigationGetInstancesResult =
  | { success: true; instances: NavigationInstance[] }
  | NavigationFailure;
export type NavigationGetItemsResult =
  | { success: true; items: NavigationRenderedItem[] }
  | NavigationFailure;

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

const navigation = {
  /**
   * Shows an image in place of the top bar title for the current navigation instance, until
   * resetTitleImage() or app restart. `url` is downloaded by the app; `image` is a Blob,
   * a data URL or base64.
   */
  setTitleImage: async function (params: NavigationTitleImageParams) {
    let data: AnyData = params;
    if (params && 'image' in params && params.image instanceof Blob) {
      data = { ...params, image: await blobToDataUrl(params.image) };
    }
    return addCommandCallback<NavigationResult>('median://navigation/setTitleImage', data);
  },
  /** Goes back to the configured title for the current navigation instance. */
  resetTitleImage: function (params: CallbackParams<NavigationResult>) {
    return addCommandCallback<NavigationResult>('median://navigation/resetTitleImage', params);
  },
  /** Replaces the whole list of navigation instances for this session. */
  setInstances: function (params: NavigationSetInstancesParams) {
    return addCommandCallback<NavigationResult>('median://navigation/setInstances', params);
  },
  /** Adds or replaces one navigation instance for this session. */
  setInstance: function (params: NavigationSetInstanceParams) {
    return addCommandCallback<NavigationResult>('median://navigation/setInstance', params);
  },
  /** Restores the configured navigation instances. */
  resetInstances: function (params?: CallbackParams<NavigationResult>) {
    return addCommandCallback<NavigationResult>('median://navigation/resetInstances', params);
  },
  /** Returns the navigation instance for the current page as rendered. */
  getInstance: function (params?: CallbackParams<NavigationGetInstanceResult>) {
    return addCommandCallback<NavigationGetInstanceResult>('median://navigation/getInstance', params);
  },
  /** Returns all navigation instances as rendered. */
  getInstances: function (params?: CallbackParams<NavigationGetInstancesResult>) {
    return addCommandCallback<NavigationGetInstancesResult>('median://navigation/getInstances', params);
  },
  /** Replaces the top bar items of an instance. */
  setTopItems: function (params: NavigationSetItemsParams) {
    return addCommandCallback<NavigationResult>('median://navigation/setTopItems', params);
  },
  /** Returns the top bar items of an instance as rendered. */
  getTopItems: function (params?: NavigationParams<NavigationInstanceScope, NavigationGetItemsResult>) {
    return addCommandCallback<NavigationGetItemsResult>('median://navigation/getTopItems', params);
  },
  /** Updates one top bar item by index. */
  updateTopItem: function (params: NavigationUpdateItemParams) {
    return addCommandCallback<NavigationResult>('median://navigation/updateTopItem', params);
  },
  /** Removes runtime top bar items and item updates of an instance. */
  resetTopItems: function (params?: NavigationParams<NavigationInstanceScope, NavigationResult>) {
    return addCommandCallback<NavigationResult>('median://navigation/resetTopItems', params);
  },
  /** Sets the top bar color of an instance, with an optional dark mode color. */
  setTopNavBarColor: function (params: NavigationTopNavBarColorParams) {
    return addCommandCallback<NavigationResult>('median://navigation/setTopNavBarColor', params);
  },
  /** Removes the runtime top bar color of an instance. */
  resetTopNavBarColor: function (params?: NavigationParams<NavigationInstanceScope, NavigationResult>) {
    return addCommandCallback<NavigationResult>('median://navigation/resetTopNavBarColor', params);
  },
  /** Replaces the bottom tab bar items of an instance. */
  setBottomItems: function (params: NavigationSetItemsParams) {
    return addCommandCallback<NavigationResult>('median://navigation/setBottomItems', params);
  },
  /** Returns the bottom tab bar items of an instance as rendered. */
  getBottomItems: function (params?: NavigationParams<NavigationInstanceScope, NavigationGetItemsResult>) {
    return addCommandCallback<NavigationGetItemsResult>('median://navigation/getBottomItems', params);
  },
  /** Updates one bottom tab bar item by index. */
  updateBottomItem: function (params: NavigationUpdateItemParams) {
    return addCommandCallback<NavigationResult>('median://navigation/updateBottomItem', params);
  },
  /** Removes runtime bottom tab bar items and item updates of an instance. */
  resetBottomItems: function (params?: NavigationParams<NavigationInstanceScope, NavigationResult>) {
    return addCommandCallback<NavigationResult>('median://navigation/resetBottomItems', params);
  },
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

const general = {
  camera,
  clipboard,
  config,
  connectivity,
  contextMenu,
  deviceInfo,
  internalExternal,
  jsNavigation,
  keyboard,
  nativebridge,
  navigation,
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

export default general;
