export namespace BackgroundAudio {
  export type PermissionResponse = {
    granted: boolean;
    status: 'granted' | 'denied' | 'not-determined' | 'restricted';
  };

  export type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped' | 'error';

  export type RecordingStartParams = {
    /** Audio format for the recorded file. Default: 'm4a'. */
    format?: 'm4a' | 'wav';
    /** Maximum recording duration in seconds. Default: 3600 (60 min). */
    maxDuration?: number;
    /** Enable on-device speech-to-text transcription. Default: false. */
    enableTranscription?: boolean;
    /** Locale/language code for on-device STT (e.g. 'en-US'). Default: device locale. */
    sttLanguage?: string;
    /** Callback when max duration is hit. */
    onRecordingStop?: (data: RecordingStopResponse) => void;
  };

  export type RecordingStartResponse = {
    success: boolean;
    state: RecordingState;
  };

  export type RecordingStopResponse = {
    success: boolean;
    error?: string | unknown;
    state?: RecordingState;
    /** Local file URI of the recorded audio. */
    fileUri?: string;
    /** Duration of the recording in seconds. */
    durationSeconds?: number;
    /** Transcript text (populated only when enableTranscription is true). */
    transcript?: string;
  };

  export type RecordingStatusResponse = {
    state: RecordingState;
    elapsedSeconds?: number;
  };

  export type AddListenerResponse = {
    listenerId: string;
  };

  export type RecordingEvent = {
    state: RecordingState;
    durationSeconds?: number;
  };
}
