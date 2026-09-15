import { ApplePay } from '../types/applePay.js';
import { addCommand, addCommandCallback } from '../utils/index.js';

const applePay = {
  isSupported: async function () {
    const result = await addCommandCallback<ApplePay.IsSupportedResponse>('median://applePay/isSupported');
    return result.supported;
  },
  canMakePayments: async function (params: ApplePay.CanMakePaymentsParams) {
    const result = await addCommandCallback<ApplePay.IsSupportedResponse>('median://applePay/canMakePayments', params);
    return result.supported;
  },
  requestPayment: function (params: ApplePay.RequestPaymentParams) {
    return addCommandCallback<ApplePay.RequestPaymentResponse>('median://applePay/requestPayment', params);
  },
  completePayment: function (params: ApplePay.CompletePaymentParams) {
    addCommand('median://applePay/completePayment', params);
  },
};

export default applePay;
