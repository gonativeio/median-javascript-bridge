import * as commands from './commands';
import * as plugins from './plugins';
import { BranchInitializedData } from './plugins/branch';
import { InAppPurchaseInfoReadyData } from './plugins/iap';
import { ShareToAppData } from './plugins/share';
import { createTempFunctionName, setMedianCallback, setSubscription } from './utils';

import { HealthBridge as HealthBridgeType } from './types/healthBridge';

namespace Median {
  ///////////////////////////////
  //          Internal         //
  ///////////////////////////////
  const listeners: Record<string, Record<string, (...args: any[]) => void>> = {};

  const addListener = <T>(functionName: string, callback: (data: T) => void) => {
    const functionId = createTempFunctionName(functionName);

    if (typeof callback !== 'function') {
      return functionId;
    }

    listeners[functionName] = listeners[functionName] || {};
    listeners[functionName][functionId] = callback;

    setMedianCallback(functionName, listeners[functionName]);
    setSubscription(functionName, true);

    return functionId;
  };

  const removeListener = (functionName: string, functionId: string) => {
    if (!functionName || !functionId) return;

    listeners[functionName] = listeners[functionName] || {};
    delete listeners[functionName][functionId];

    setMedianCallback(functionName, listeners[functionName]);
    if (Object.keys(listeners[functionName]).length === 0) {
      setSubscription(functionName, false);
    }
  };

  const createListenerProp = <T = void>(functionName: string) => ({
    addListener: (callback: (data: T) => void) => addListener<T>(functionName, callback),
    removeListener: (functionId: string) => removeListener(functionName, functionId),
  });

  ///////////////////////////////
  //      General Commands     //
  ///////////////////////////////
  export const ios = commands.ios;
  export const android = commands.android;
  export const camera = commands.general.camera;
  export const clipboard = commands.general.clipboard;
  export const config = commands.general.config;
  export const connectivity = commands.general.connectivity;
  export const deviceInfo = commands.general.deviceInfo;
  export const internalExternal = commands.general.internalExternal;
  export const keyboard = commands.general.keyboard;
  export const nativebridge = commands.general.nativebridge;
  export const navigationLevels = commands.general.navigationLevels;
  export const navigationMaxWindows = commands.general.navigationMaxWindows;
  export const navigationTitles = commands.general.navigationTitles;
  export const open = commands.general.open;
  export const registration = commands.general.registration;
  export const run = commands.general.run;
  export const screen = commands.general.screen;
  export const share = commands.general.share;
  export const sidebar = commands.general.sidebar;
  export const statusbar = commands.general.statusbar;
  export const tabNavigation = commands.general.tabNavigation;
  export const webview = commands.general.webview;
  export const window = commands.general.window;

  ///////////////////////////////
  //          Plugins          //
  ///////////////////////////////
  export const adjust = plugins.adjust;
  export const admob = plugins.admob;
  export const ageSafety = plugins.ageSafety;
  export const appreview = plugins.appreview;
  export const appsflyer = plugins.appsflyer;
  export const auth = plugins.auth;
  export const auth0 = plugins.auth0;
  export const autorefresh = plugins.autorefresh;
  export const backgroundLocation = plugins.backgroundLocation;
  export const backgroundMedia = plugins.backgroundMedia;
  export const barcode = plugins.barcode;
  export const beacon = plugins.beacon;
  export const braze = plugins.braze;
  export const branch = plugins.branch;
  export const calendar = plugins.calendar;
  export const card_io = plugins.card_io;
  export const contacts = plugins.contacts;
  export const cordial = plugins.cordial;
  export const documentScanner = plugins.documentScanner;
  export const downloads = plugins.downloads;
  export const esmiley = plugins.esmiley;
  export const facebook = plugins.facebook;
  export const firebaseAnalytics = plugins.firebaseAnalytics;
  export const firebaseCrashlytics = plugins.firebaseCrashlytics;
  export const grow = plugins.grow;
  export const haptics = plugins.haptics;
  export const healthBridge = plugins.healthBridge;
  export const iap = plugins.iap;
  export const intentedge = plugins.intentedge;
  export const intercom = plugins.intercom;
  export const iterable = plugins.iterable;
  export const kaltura = plugins.kaltura;
  export const keychainSwift = plugins.keychainSwift;
  export const klaviyo = plugins.klaviyo;
  export const localpreferences = plugins.localpreferences;
  export const modal = plugins.modal;
  export const moengage = plugins.moengage;
  export const moxo = plugins.moxo;
  export const msdynamics = plugins.msdynamics;
  export const nfc = plugins.nfc;
  export const onesignal = plugins.onesignal;
  export const opentok = plugins.opentok;
  export const permissions = plugins.permissions;
  export const plaid = plugins.plaid;
  export const purchase = plugins.iap.purchase;
  export const revenueCat = plugins.revenueCat;
  export const socialLogin = plugins.socialLogin;
  export const socialShare = plugins.socialShare;
  export const storage = {
    app: plugins.localpreferences.nonpersistent,
    cloud: plugins.localpreferences.persistent,
    filesystem: plugins.localpreferences.filesystem,
  };
  export const twilio = plugins.twilio;
  export const webScreenshot = plugins.webScreenshot;
  export const zoom = plugins.zoom;

  ///////////////////////////////
  //         Functions         //
  ///////////////////////////////
  export const isNativeApp = () => {
    const window = globalThis.window;
    return !!window?.webkit?.messageHandlers?.JSBridge || !!window?.JSBridge;
  };

  export const getPlatform = async () => {
    if (!isNativeApp()) return 'web';
    const info = await commands.general.deviceInfo();
    return info?.platform;
  };

  export const onReady = (callback: () => void) => {
    if (typeof callback !== 'function') return;

    let currentCallback: (() => void) | null = callback;
    let counter = 0;

    const interval = setInterval(() => {
      if (isNativeApp() && currentCallback) {
        currentCallback();
        currentCallback = null;
      }

      counter++;
      if (counter >= 20 || !currentCallback) {
        clearInterval(interval);
      }
    }, 500);
  };

  ///////////////////////////////
  //           Events          //
  ///////////////////////////////
  export const appsFlyerConversionData = createListenerProp<any>('_median_appsflyer_cd_success');
  export const appResumed = createListenerProp('_median_app_resumed');
  export const branchInitialized = createListenerProp<BranchInitializedData>('_median_branch_initialized');
  export const deviceShake = createListenerProp('_median_device_shake');
  export const iapInfoReady = createListenerProp<InAppPurchaseInfoReadyData>('_median_info_ready');
  export const iapPurchases = createListenerProp<any>('_median_iap_purchases');
  export const oneSignalPushOpened = createListenerProp<any>('_median_onesignal_push_opened');
  export const shareToApp = createListenerProp<ShareToAppData>('_median_share_to_app');
}

export default Median;

///////////////////////////////
//           Types           //
///////////////////////////////
export declare namespace Types {
  export import HealthBridge = HealthBridgeType;
}
