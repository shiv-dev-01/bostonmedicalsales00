import { baseService } from './base';
import { API_ENDPOINTS } from '../endpoints';
import type { ProductLine } from '../../constants/productLines';
import type { OrderListResponse, OrderResponse } from '../../types/order';

export const orderService = {
  getOrders: async (
    productLine: ProductLine,
    page: number = 1,
    orderId?: string
  ): Promise<OrderListResponse> => {
    const api = baseService.api.createInstance(productLine);

    try {
      const response = await api.post(API_ENDPOINTS.ORDERS, {
        page,
        ...(orderId && { order_id: orderId })
      });
      return response.data;
    } catch (error) {
      throw baseService.handleError(error, 'Failed to fetch orders');
    }
  },

  getOrdersEmail: async (
    productLine: ProductLine,
    page: number = 1,
    email?: string
  ): Promise<OrderListResponse> => {
    const api = baseService.api.createInstance(productLine);

    try {
      const response = await api.post(API_ENDPOINTS.GET_USER_ORDERS, {
        page,
        ...(email && { email: email })
      });
      return response.data;
    } catch (error) {
      throw baseService.handleError(error, 'Failed to fetch orders');
    }
  },

  createOrder: async (productLine: ProductLine, formData: FormData): Promise<OrderResponse> => {
    const api = baseService.api.createInstance(productLine);

    try {
      const response = await api.post(API_ENDPOINTS.CREATE_ORDER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw baseService.handleError(error, 'Failed to create order');
    }
  }
};