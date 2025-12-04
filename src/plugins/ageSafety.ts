import { addCallbackFunction, addCommand } from '../utils';

type AgeSignalsOptions = {
  /**
   * iOS: Array of up to 3 age thresholds to check against (e.g., [13, 17, 21]).
   * Maps to requestAgeRange(ageGates: ...).
   * Android: Used for client-side reference (actual ranges configured in Play Console).
   */
  ageGates: number[];
};

type AgeSignalsResponse = {
  /** Inclusive lower bound of the user's age range */
  ageLowerBound?: number;

  /** Inclusive upper bound of the user's age range */
  ageUpperBound?: number;

  /** High-confidence verification status (ID or Payment verification) */
  strongVerification: boolean;

  /** Method used for verification, if known */
  verificationMethod: string;

  /** Whether the account is supervised (e.g., Family Link on Android, Screen Time on iOS) */
  supervisedAccount: boolean;

  /** Whether parent approval is required for significant content changes */
  supervisorApprovalRequired: boolean;
};

type AgeSignalsOnSuccess = (data: AgeSignalsResponse) => void;

type PluginError = {
  code: string;
  message: string;
  details?: string;
  platform?: 'ios' | 'android';
};

type AgeSignalsOnError = (error: PluginError) => void;

type RequireMinimumAgeOnSuccess = (data: { allowed: boolean }) => void;

const ageSafety = {
  getAgeSignals: function (
    options: AgeSignalsOptions,
    onSuccess?: AgeSignalsOnSuccess,
    onError?: AgeSignalsOnError
  ) {
    const successCallback = addCallbackFunction(onSuccess || "");
    const errorCallback = addCallbackFunction(onError || "");
    addCommand('median://ageSafety/getAgeSignals', { ...options, successCallback, errorCallback });
  },

  requireMinimumAge: function (
    age: number,
    onSuccess?: RequireMinimumAgeOnSuccess,
    onError?: AgeSignalsOnError
  ) {
    const successCallback = addCallbackFunction(onSuccess || "");
    const errorCallback = addCallbackFunction(onError || "");
    addCommand('median://ageSafety/requireMinimumAge', { age, successCallback, errorCallback });
  }
};

export default ageSafety;
