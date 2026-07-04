export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/super_admin_login',
  LOGOUT: '/logout',
  
  // Products
  PRODUCTS: '/get_products_test',
  
  // Orders
  ORDERS: '/get_all_orders',
  GET_USER_ORDERS: '/get_user_orders',
  CREATE_ORDER: '/add_user_check_product_agent_test',
  
  // Shipping
  SHIPPING_METHODS: '/shipping_method_find',
  
  // Payment
  PAYMENT_GATEWAYS: '/get_gateway',
  
  // Coupons
  VALIDATE_COUPON: '/check_coupons',
  CREATE_COUPON: '/add_coupons',
  
  // Billing
  BILLING_MODELS: '/billing_model_view',
} as const;