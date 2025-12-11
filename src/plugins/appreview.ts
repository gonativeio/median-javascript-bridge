import { CallbackParams } from '../types';
import { addCommand, addCommandCallback } from '../utils';

/**
 * App Review plugin for Median.
 * Provides a simple interface for prompting the system's
 * in-app review dialog (App Store / Play Store).
 */
const appreview = {
  /**
   * Prompt the user for an app review.
   *
   * Behavior:
   * - On iOS, this triggers `SKStoreReviewController.requestReview()`,
   *   which may or may not display a review prompt depending on
   *   system heuristics.
   *
   * - On Android, this triggers the in-app review flow provided by
   *   the Play Core Review API.
   *
   * If callback parameters are provided, the result is returned via
   * `addCommandCallback`, otherwise the command is executed fire-and-forget.
   *
   * @param params - Optional callback parameters to receive success or error results (Android only).
   * @returns A promise resolving with callback data if params are provided.
   */
  prompt: function (params?: CallbackParams) {
    if (params) {
      return addCommandCallback('median://appReview/prompt', params);
    }
    addCommand('median://appReview/prompt');
  },
};

export default appreview;
