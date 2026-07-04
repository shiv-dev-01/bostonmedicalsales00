import type { Customer, Payment, Product, ShippingMethod, BillingModel, Gateway } from '../types';
import { SITE_ID } from '../config';

export function createOrderFormData({
  customer,
  payment,
  products,
  selectedBillingModel,
  productGateways,
  productBillingModels,
  productCoupons,
  useSameAddress,
  isCallCenter
}: {
  customer: Customer | null;
  payment: Payment;
  products: Product[];
  selectedBillingModel?: BillingModel | null;
  productGateways: Record<number, Gateway>;
  productBillingModels: Record<number, BillingModel>;
  productCoupons: Record<number, any>;
  useSameAddress: boolean;
  isCallCenter: boolean;
}) {
  const formData = new FormData();

  formData.append('site_id', SITE_ID.toString());

  // Add call center value
  formData.append('call_center_value', isCallCenter ? 'true' : 'false');

  // Add billing same as shipping flag
  formData.append('billingSameAsShipping', useSameAddress ? 'YES' : 'NO');

  // Add customer information
  if (customer) {
    // Shipping information
    formData.append('email', customer.email);
    formData.append('first_name', customer.firstName);
    formData.append('last_name', customer.lastName);
    formData.append('phone', customer.phone.replace(/\D/g, ''));
    formData.append('address', customer.shippingAddress.street);
    formData.append('city_name', customer.shippingAddress.city);
    formData.append('state_name', customer.shippingAddress.state);
    formData.append('zip_code', customer.shippingAddress.zipCode);

    // Add billing information only if different from shipping
    if (!useSameAddress) {
      formData.append('billing_first_name', customer.billingAddress.firstName);
      formData.append('billing_last_name', customer.billingAddress.lastName);
      formData.append('billing_email', customer.billingAddress.email || '');
      formData.append('billing_phone', (customer.billingAddress.phone || '').replace(/\D/g, ''));
      formData.append('billing_address', customer.billingAddress.street);
      formData.append('billing_city', customer.billingAddress.city);
      formData.append('billing_state', customer.billingAddress.state);
      formData.append('billing_zip_code', customer.billingAddress.zipCode);
    }
  }

  // Add payment information
  if (payment.paymentType === 'offline') {
    formData.append('payment_type', 'offline');
  } else {
    formData.append('payment_type', 'card');
    formData.append('card_type', payment.cardType);
    formData.append('card_no', payment.cardNumber.replace(/\s/g, ''));
    formData.append('ex_month', payment.expiryDate.split('/')[0]);
    formData.append('ex_year', payment.expiryDate.split('/')[1]);
    formData.append('cvv_no', payment.cvv);
    formData.append('card_holder_name', payment.cardholderName);
  }

  // Add products, gateways, billing models, coupons, and custom prices
  products.forEach((product) => {
    const productId = product.product_id.toString();
    const quantity = product.quantity || 1;
    const gateway = productGateways[product.product_id];
    const billingModel = productBillingModels[product.product_id];
    const couponInfo = productCoupons[product.product_id];
    const price = product.custom_price ?? product.product_price;

    formData.append('product_id[]', product.uniq_id || productId);
    formData.append('product_price[]', price.toString());
    formData.append('original_price[]', product.product_price.toString());
    formData.append('gateway_id[]', gateway?.gateway_id.toString() || '');
    formData.append('billing_model_id[]', billingModel?.id || '');
    formData.append('promoCodes[]', couponInfo?.isValid ? couponInfo.code : '0');
    formData.append('qty[]', quantity.toString());
  });

  // Log form data for debugging
  const formDataObj: Record<string, any> = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log('Form Data:', formDataObj);

  return formData;
}