import { addCommand, createTempFunctionName } from './index.js';

const listeners: Record<string, Record<string, (...args: any) => void>> = {};

function setMedianCallback(command: string, callbackFunctions: Record<string, (...args: any) => void>) {
  (window[command as any] as any) = function (...args: any) {
    Object.keys(callbackFunctions).forEach((key) => {
      const callbackFunction = callbackFunctions[key];
      if (typeof callbackFunction === 'function') {
        callbackFunction(...args);
      }
    });
  };
}

function setSubscription(eventName: string, subscribe: boolean) {
  if (subscribe) {
    return addCommand('median://events/subscribe', { eventName });
  } else {
    return addCommand('median://events/unsubscribe', { eventName });
  }
}

const addListener = <T>(functionName: string, callback: (data: T) => void) => {
  const functionId = createTempFunctionName(functionName);

  if (typeof callback !== 'function') return functionId;

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

export const createListener = <T = any>(functionName: string) => ({
  addListener: (callback: (data: T) => void) => addListener<T>(functionName, callback),
  removeListener: (functionId: string) => removeListener(functionName, functionId),
});
