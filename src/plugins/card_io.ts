import { addCommandCallback } from '../utils/index.js';

type CardIoScanData = {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: number;
  expiryYear: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb';
};

type CardIoScanParams = {
  callback?: (data: CardIoScanData) => void;
  requireExpiry?: boolean;
  scanExpiry?: boolean;
  requireCVV?: boolean;
  requirePostalCode?: boolean;
  numericPostalCode?: boolean;
  requireCardholderName?: boolean;
  useCardIOLogo?: boolean;
  hideCardIOLogo?: boolean;
  instructions?: string;
};

const card_io = {
  scanCard: function (params: CardIoScanParams) {
    return addCommandCallback<CardIoScanData>('median://card.io/scanCard', params);
  },
};

export default card_io;
