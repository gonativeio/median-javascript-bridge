import { AnyData } from '../types';
import { addCallbackFunction, addCommand } from '../utils';

/**
 * Options for requesting age-related signals from the platform.
 */
type AgeSignalsOptions = {
  /**
   * iOS:
   *   - Array of up to 3 age thresholds to check against (e.g., [13, 17, 21]).
   *   - Maps to `requestAgeRange(ageGates: ...)` in the native API.
   *
   * Android:
   *   - Used for client-side reference only; the actual thresholds/ranges
   *     are configured in the Google Play Console.
   */
  ageGates: number[];
};

/**
 * Information returned by the age-signals request.
 * Each field may or may not be present depending on platform availability
 * and the user’s device settings.
 */
type AgeSignalsResponse = {
  /** Inclusive lower bound of the inferred age range */
  ageLowerBound?: number;

  /** Inclusive upper bound of the inferred age range */
  ageUpperBound?: number;

  /**
   * Whether the system has strong, high-confidence age verification
   * (e.g., ID verification or verified payment method).
   */
  strongVerification: boolean;

  /** The verification method used, if provided by the platform */
  verificationMethod: string;

  /**
   * Indicates whether the device/account is supervised:
   * - Family Link (Android)
   * - Screen Time / family supervision (iOS)
   */
  supervisedAccount: boolean;

  /**
   * True if the platform requires supervisor/parent approval for
   * significant account or content changes.
   */
  supervisorApprovalRequired: boolean;
};

/** Success callback for age-signal requests */
type AgeSignalsOnSuccess = (data: AgeSignalsResponse) => void;

/**
 * Standardized plugin error shape for the age-safety module.
 */
type PluginError = {
  /** Platform-provided error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Optional platform-specific details */
  details?: string;
  /** Platform where the error occurred */
  platform?: 'ios' | 'android';
};

/** Error callback for age-signal or age-gate failures */
type AgeSignalsOnError = (error: PluginError) => void;

/** Success callback for minimum-age requirement checks */
type RequireMinimumAgeOnSuccess = (data: { allowed: boolean }) => void;

/**
 * Age Safety plugin for Median.
 * Provides access to platform age-signal APIs (Android & iOS) and
 * performs minimum-age checks with optional callbacks.
 */
const ageSafety = {
  /**
   * Request platform-provided age signals.
   *
   * On iOS:
   *   - Uses the system age-range APIs initiated via `ageGates`.
   *
   * On Android:
   *   - Returns Play-Console-configured age information when available.
   *
   * @param options - Age-signal request configuration.
   * @param onSuccess - Called with age-signal results when successful.
   * @param onError - Called if the platform returns an error.
   */
  getAgeSignals: function (options: AgeSignalsOptions, onSuccess?: AgeSignalsOnSuccess, onError?: AgeSignalsOnError) {
    const params: Record<string, AnyData> = { ...options };

    if (onSuccess) {
      params.successCallback = addCallbackFunction(onSuccess);
    }
    if (onError) {
      params.errorCallback = addCallbackFunction(onError);
    }

    addCommand('median://ageSafety/getAgeSignals', params);
  },

  /**
   * Require that the user meets a minimum age threshold.
   *
   * If the user does not meet the requirement, the system may enforce
   * platform-specific restrictions or behavioral responses.
   *
   * @param age - Minimum allowed age.
   * @param onSuccess - Called with `{ allowed: boolean }`.
   * @param onError - Called on platform or validation errors.
   */
  requireMinimumAge: function (age: number, onSuccess?: RequireMinimumAgeOnSuccess, onError?: AgeSignalsOnError) {
    const params: Record<string, AnyData> = { age };

    if (onSuccess) {
      params.successCallback = addCallbackFunction(onSuccess);
    }
    if (onError) {
      params.errorCallback = addCallbackFunction(onError);
    }

    addCommand('median://ageSafety/requireMinimumAge', params);
  },
};

export default ageSafety;
