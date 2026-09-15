export namespace ApplePay {
  // Parameters
  export type SummaryItem = {
    label: string;
    amount: string;
    type?: 'final' | 'pending';
  };

  export type Network =
    | 'visa'
    | 'masterCard'
    | 'amex'
    | 'discover'
    | 'JCB'
    | 'maestro'
    | 'electron'
    | 'vPay'
    | 'postFinance'
    | 'girocard'
    | 'cartesBancaires'
    | 'privateLabel';

  export type Capability = '3DS' | 'EMV' | 'credit' | 'debit';

  export type ContactField = 'name' | 'phoneticName' | 'emailAddress' | 'phoneNumber' | 'postalAddress';

  export type PostalAddress = {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isoCountryCode?: string;
    subLocality?: string;
    subAdministrativeArea?: string;
  };

  export type Contact = {
    givenName?: string;
    familyName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    postalAddress?: PostalAddress;
  };

  export type CompletionError = {
    code?: string;
    field?: string;
    message?: string;
  }

  // Methods
  export type IsSupportedResponse = {
    supported: boolean;
  };

  export type CanMakePaymentsParams = {
    supportedNetworks?: Network[];
    merchantCapabilities?: Capability[];
  };

  export type RequestPaymentParams = {
    total: SummaryItem;
    lineItems?: SummaryItem[];
    countryCode: string;
    currencyCode: string;
    supportedNetworks?: Network[];
    merchantCapabilities?: Capability[];
    supportedCountries?: string[];
    requiredBillingContactFields?: ContactField[];
    requiredShippingContactFields?: ContactField[];
    applicationData?: string;
  };

  export type RequestPaymentResponse = {
    paymentData?: string;
    transactionIdentifier?: string;
    paymentMethod?: {
      displayName?: string;
      network?: string;
      type?: 'debit' | 'credit' | 'prepaid' | 'store' | 'eMoney' | 'unknown';
    };
    billingContact?: Contact;
    shippingContact?: Contact;
  };

  export type CompletePaymentParams = {
    status: 'success' | 'failure';
    errors?: CompletionError[];
  };
}
