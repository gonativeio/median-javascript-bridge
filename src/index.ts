import * as commands from './commands/index.js';
import * as plugins from './plugins/index.js';
import { BranchInitializedData } from './plugins/branch.js';
import { InAppPurchaseInfoReadyData } from './plugins/iap.js';
import { ShareToAppData } from './plugins/shareIntoApp.js';
import { createListener } from './utils/listener.js';
import { AppsFlyer } from './types/appsflyer.js';

namespace Median {
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
  export const jsNavigation = commands.general.jsNavigation;
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
  export const backgroundAudio = plugins.backgroundAudio;
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
  export const masterlock = plugins.masterlock;
  export const modal = plugins.modal;
  export const moengage = plugins.moengage;
  export const moxo = plugins.moxo;
  export const msdynamics = plugins.msdynamics;
  export const nfc = plugins.nfc;
  export const onesignal = plugins.onesignal;
  export const opentok = plugins.opentok;
  export const permissions = plugins.permissions;
  export const plaid = plugins.plaid;
  export const revenueCat = plugins.revenueCat;
  export const salesforceCloud = plugins.salesforceCloud;
  export const shareIntoApp = plugins.shareIntoApp;
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
  export const appResumed = createListener('_median_app_resumed');
  export const deviceShake = createListener('_median_device_shake');

  /**
   * @deprecated Use `Median.appsflyer.conversionData` instead.
   */
  export const appsFlyerConversionData = createListener<AppsFlyer.ConversionData>('_median_appsflyer_cd');
  /**
   * @deprecated Use `Median.appsflyer.deeplinkResult` instead.
   */
  export const appsFlyerDeeplinkResult = createListener<AppsFlyer.DeeplinkResult>('_median_appsflyer_deeplink_result');
  /**
   * @deprecated Use `Median.appsflyer.sdkStart` instead.
   */
  export const appsFlyerSdkStart = createListener<AppsFlyer.SdkStartResponse>('_median_appsflyer_sdk_start');
  /**
   * @deprecated Use `Median.branch.initialized` instead.
   */
  export const branchInitialized = createListener<BranchInitializedData>('_median_branch_initialized');
  /**
   * @deprecated Use `Median.iap.infoReady` instead.
   */
  export const iapInfoReady = createListener<InAppPurchaseInfoReadyData>('_median_info_ready');
  /**
   * @deprecated Use `Median.iap.purchaseResult` instead.
   */
  export const iapPurchases = createListener<Record<string, any>>('_median_iap_purchases');
  /**
   * @deprecated Use `Median.oneSignal.pushOpened` instead.
   */
  export const oneSignalPushOpened = createListener<Record<string, any>>('_median_onesignal_push_opened');
  /**
   * @deprecated Use `Median.shareIntoApp.shareResult` instead.
   */
  export const shareToApp = createListener<ShareToAppData>('_median_share_to_app');
}

export default Median;

///////////////////////////////
//           Types           //
///////////////////////////////
export { AppsFlyer } from './types/appsflyer.js';
export { BackgroundAudio } from './types/backgroundAudio.js';
export { HealthBridge } from './types/healthBridge.js';
export { MasterLock } from './types/masterlock.js';
export { SalesforceCloud } from './types/salesforceCloud.js';
