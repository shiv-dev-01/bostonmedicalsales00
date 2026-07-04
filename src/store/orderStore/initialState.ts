import type { OrderState } from './types';

export const initialState: OrderState = {
  customer: null,
  products: [],
  selectedShippingMethod: null,
  payment: {
    paymentType: 'card',
    cardType: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  },
  productGateways: {},
  productBillingModels: {},
  productCoupons: {},
  useSameAddress: true,
  isCallCenter: false,
  isSubmitting: false,
  orderResponse: null
};