export namespace JWPlayer {
  export type InitializeParams = {
    licenseKey: string;
  };

  export type InitializeResponse = {
    success: boolean;
    error?: {
      code: string;
      message: string;
    };
  };

  export type PlayParams = {
    file?: string;
    files?: string[];
    playlistUrl?: string;
    startTime?: number;
    licenseKey: string;
  };

  export type PlayResponse = {
    success: boolean;
    error?: {
      code: string;
      message: string;
    };
  };
}
