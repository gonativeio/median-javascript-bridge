import { addCommand, addCommandCallback } from '../utils.js';

interface HtmlCanvasOptions {
  useCORS: boolean;
  scale: number;
}

declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: HtmlCanvasOptions) => Promise<HTMLCanvasElement>;
  }
}

export interface WebScreenshotParams {
  url?: string;
  text?: string;
}

const webScreenshot = {
  shareScreen: function (params: WebScreenshotParams) {
    addCommand('median://webScreenshot/shareScreen', params);
  },
  shareElement: function (element: HTMLElement, params?: WebScreenshotParams) {
    if (!window.html2canvas) {
      return;
    }
    window.html2canvas(element, { useCORS: true, scale: 1.25 }).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      addCommand('median://webScreenshot/shareElement', { dataUrl, ...params });
    });
  },
  captureScreen: async function () {
    const result = await addCommandCallback('median://webScreenshot/captureScreen');
    const binaryString = atob(result.data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/png' });
  },
  captureElement: async function (element: HTMLElement) {
    if (!window.html2canvas) {
      return;
    }
    const canvas = await window.html2canvas(element, { useCORS: true, scale: 1.25 });
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert to blob.'));
        }
      });
    });
  },
};

export default webScreenshot;
