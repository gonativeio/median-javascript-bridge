import { AnyData } from '../types/index.js';

interface JSBridgeType {
  postMessage?: (data: string) => void;
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        JSBridge?: JSBridgeType;
      };
    };
    JSBridge?: JSBridgeType;
  }
}

export function createTempFunctionName(prefix = '_median_temp_') {
  return prefix + Math.random().toString(36).slice(2);
}

// GoNativeJSBridgeLibrary.js
export function addCallbackFunction(callbackFunction: string | ((data?: AnyData) => void), persistCallback?: boolean) {
  if (typeof callbackFunction === 'string') {
    return callbackFunction;
  }

  const callbackName = createTempFunctionName();

  (window[callbackName as AnyData] as AnyData) = function (...args: AnyData) {
    callbackFunction(...args);
    if (!persistCallback) {
      delete window[callbackName as AnyData];
    }
  };

  return callbackName;
}

export function addCommand(command: string, params?: AnyData, persistCallback?: boolean) {
  let data: AnyData = command;

  if (params) {
    data = {};
    if (params.callback && typeof params.callback === 'function') {
      params.callback = addCallbackFunction(params.callback, persistCallback);
    }
    if (params.callbackFunction && typeof params.callbackFunction === 'function') {
      params.callbackFunction = addCallbackFunction(params.callbackFunction, persistCallback);
    }
    if (params.statuscallback && typeof params.statuscallback === 'function') {
      params.statuscallback = addCallbackFunction(params.statuscallback, persistCallback);
    }
    data.medianCommand = command;
    data.data = params;
  }

  // Android
  if (window?.JSBridge?.postMessage) {
    window.JSBridge.postMessage(typeof data === 'string' ? data : JSON.stringify(data));
  }
  // iOS
  if (window?.webkit?.messageHandlers?.JSBridge?.postMessage) {
    window.webkit.messageHandlers.JSBridge.postMessage(data);
  }
}

export function addCommandCallback<T = AnyData>(
  command: string,
  params?: AnyData,
  persistCallback?: boolean
): Promise<T> {
  if (params?.callback || params?.callbackFunction || params?.statuscallback) {
    return addCommand(command, params, persistCallback) as AnyData;
  } else {
    const tempFunctionName = createTempFunctionName();

    if (!params) {
      params = {};
    }

    params.callback = tempFunctionName;
    return new Promise(function (resolve, reject) {
      (window[tempFunctionName as AnyData] as AnyData) = function (data: T) {
        if (data && typeof data === 'object' && 'error' in data) {
          reject(data);
        } else {
          resolve(data);
        }
        delete window[tempFunctionName as AnyData];
      };
      addCommand(command, params);
    });
  }
}
