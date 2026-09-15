export namespace CardIo {
  export type ScanData = {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: number;
    expiryYear: number;
    cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb';
  };

  export type ScanParams = {
    callback?: (data: ScanData) => void;
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
}
