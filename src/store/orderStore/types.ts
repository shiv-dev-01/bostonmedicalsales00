import type { 
  Customer, 
  Payment, 
  Product, 
  ShippingMethod,
  Gateway,
  BillingModel,
  CouponInfo,
  OrderSuccess,
  OrderError
} from '../../lib/types';

export interface OrderResponseState {
  message: string;
  orders: OrderSuccess[];
  errors: OrderError[];
}

export interface OrderState {
  customer: Customer | null;
  products: Product[];
  selectedShippingMethod: ShippingMethod | null;
  payment: Payment;
  productGateways: Record<number, Gateway>;
  productBillingModels: Record<number, BillingModel>;
  productCoupons: Record<number, CouponInfo>;
  useSameAddress: boolean;
  isCallCenter: boolean;
  isSubmitting: boolean;
  orderResponse: OrderResponseState | null;
}

export interface OrderActions {
  setCustomer: (customer: Customer | null) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProductCustomPrice: (
    productId: string,
    customPrice: number | undefined
  ) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setPayment: (payment: Partial<Payment>) => void;
  setProductGateway: (productId: number, gateway: Gateway) => void;
  setProductBillingModel: (productId: number, model: BillingModel) => void;
  setProductCoupon: (productId: number, couponInfo: CouponInfo) => void;
  clearProductCoupon: (productId: number) => void;
  setUseSameAddress: (same: boolean) => void;
  setIsCallCenter: (isCallCenter: boolean) => void;
  setOrderResponse: (response: OrderResponseState | null) => void;
  createOrder: () => Promise<void>;
  reset: () => void;
}