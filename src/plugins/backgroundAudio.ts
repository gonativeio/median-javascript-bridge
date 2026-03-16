import { BackgroundAudio } from '../types/backgroundAudio.js';
import { addCallbackFunction, addCommand, addCommandCallback } from '../utils/index.js';

type RecordingStopInternalResponse = {
  success: boolean;
  base64?: string;
  mimeType?: string;
  state?: BackgroundAudio.RecordingState;
  durationSeconds?: number;
  transcript?: string;
};

type ConvertResultParams = RecordingStopInternalResponse & {
  base64?: string;
  mimeType?: string;
};

const backgroundAudio = {
  checkPermission: function () {
    return addCommandCallback<BackgroundAudio.PermissionResponse>('median://backgroundAudio/checkPermission');
  },
  requestPermission: function () {
    return addCommandCallback<BackgroundAudio.PermissionResponse>('median://backgroundAudio/requestPermission');
  },
  startRecording: function (params: BackgroundAudio.RecordingStartParams) {
    let onRecordingStop: string | undefined;

    if (params?.onRecordingStop) {
      const onRecordingStopCallback = params.onRecordingStop;

      const callback = function (result: RecordingStopInternalResponse) {
        try {
          const data = median_background_audio_convert_result(result);
          onRecordingStopCallback(data);
        } catch (error) {
          onRecordingStopCallback({ success: false, error });
        }
      };

      onRecordingStop = addCallbackFunction(callback);
    }

    return addCommandCallback<BackgroundAudio.RecordingStartResponse>('median://backgroundAudio/startRecording', {
      ...params,
      onRecordingStop,
    });
  },
  stopRecording: async function () {
    const result = await addCommandCallback<RecordingStopInternalResponse>('median://backgroundAudio/stopRecording');
    return median_background_audio_convert_result(result);
  },
  pause: function () {
    return addCommandCallback<BackgroundAudio.RecordingStatusResponse>('median://backgroundAudio/pause');
  },
  resume: function () {
    return addCommandCallback<BackgroundAudio.RecordingStatusResponse>('median://backgroundAudio/resume');
  },
  getStatus: function () {
    return addCommandCallback<BackgroundAudio.RecordingStatusResponse>('median://backgroundAudio/getStatus');
  },
  addListener: async function (callback: (data: BackgroundAudio.RecordingEvent) => void) {
    const listenerIdCallback = addCallbackFunction(callback, true);
    const result = await addCommandCallback('median://backgroundAudio/addListener', { listenerIdCallback });
    if (!result?.listenerId) {
      throw 'INVALID_LISTENER_ID';
    } else {
      return result.listenerId;
    }
  },
  removeListener: function (listenerId: string) {
    addCommand('median://backgroundAudio/removeListener', { listenerId });
  },
};

function median_background_audio_convert_result(result: ConvertResultParams): BackgroundAudio.RecordingStopResponse {
  if (result?.success && result?.base64 && result?.mimeType) {
    const fileUri = median_background_audio_base64_to_url(result.base64, result.mimeType);

    return {
      success: result.success,
      fileUri,
      state: result.state,
      durationSeconds: result.durationSeconds,
      transcript: result.transcript,
    };
  }

  return result;
}

function median_background_audio_base64_to_url(base64: string, mimeType: string) {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  return URL.createObjectURL(blob);
}

export default backgroundAudio;
