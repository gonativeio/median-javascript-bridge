import { CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

type BarcodeFormat =
  | 'QR_CODE'
  | 'DATA_MATRIX'
  | 'AZTEC'
  | 'PDF_417'
  | 'EAN_13'
  | 'EAN_8'
  | 'UPC_A'
  | 'UPC_E'
  | 'CODE_39'
  | 'CODE_93'
  | 'CODE_128'
  | 'ITF'
  | 'CODABAR';

type BarcodeScanData = {
  success: boolean;
  type?: string;
  code?: string;
  error?: string;
};

type BarcodeScanParams = CallbackParams<BarcodeScanData> & {
  // Whitelist of symbologies that auto-trigger a scan. Empty/omitted = scan all.
  formats?: BarcodeFormat[];
};

const barcode = {
  scan: function (params: BarcodeScanParams) {
    return addCommandCallback<BarcodeScanData>('median://barcode/scan', params);
  },
  setPrompt: function (prompt: string) {
    return addCommand('median://barcode/setPrompt', { prompt });
  },
};

export default barcode;
