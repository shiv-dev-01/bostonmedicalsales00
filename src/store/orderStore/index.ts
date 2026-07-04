import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { orderService } from '../../lib/api/services/orders';
import { useProductLineStore } from '../productLineStore';
import { createOrderFormData } from '../../lib/utils/formData';
import { validateOrder } from '../../lib/validations/orderValidation';
import { initialState } from './initialState';
import type { OrderState, OrderActions } from './types';
import toast from 'react-hot-toast';

export const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCustomer: (customer) => set({ customer }),
      
      addProduct: (product) => set((state) => ({
        products: [...state.products, product]
      })),
      
      removeProduct: (productId) => set((state) => ({
        products: state.products.filter((p) => p.product_id.toString() !== productId),
        productGateways: Object.fromEntries(
          Object.entries(state.productGateways).filter(([id]) => id.toString() !== productId)
        ),
        productBillingModels: Object.fromEntries(
          Object.entries(state.productBillingModels).filter(([id]) => id.toString() !== productId)
        ),
        productCoupons: Object.fromEntries(
          Object.entries(state.productCoupons).filter(([id]) => id.toString() !== productId)
        )
      })),

      updateProductCustomPrice: (productId, customPrice) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.product_id.toString() === productId
              ? { ...product, custom_price: customPrice }
              : product
          ),
        })),
      
      setShippingMethod: (method) => set({ selectedShippingMethod: method }),
      
      setPayment: (payment) => set((state) => ({
        payment: { ...state.payment, ...payment }
      })),
      
      setProductGateway: (productId, gateway) => set((state) => ({
        productGateways: { ...state.productGateways, [productId]: gateway }
      })),
      
      setProductBillingModel: (productId, model) => set((state) => ({
        productBillingModels: { ...state.productBillingModels, [productId]: model }
      })),
      
      setProductCoupon: (productId, couponInfo) => set((state) => ({
        productCoupons: { ...state.productCoupons, [productId]: couponInfo }
      })),
      
      clearProductCoupon: (productId) => set((state) => {
        const { [productId]: _, ...rest } = state.productCoupons;
        return { productCoupons: rest };
      }),
      
      setUseSameAddress: (same) => set({ useSameAddress: same }),
      
      setOrderResponse: (response) => set({ orderResponse: response }),

      setIsCallCenter: (isCallCenter) => set({ isCallCenter }),

      createOrder: async () => {
        const state = get();
        const validationError = validateOrder(state);
        
        if (validationError) {
          toast.error(validationError);
          return;
        }

        set({ isSubmitting: true });

        try {
          const productLine = useProductLineStore.getState().selectedLine;
          const formData = createOrderFormData({
            customer: state.customer,
            payment: state.payment,
            products: state.products,
            productGateways: state.productGateways,
            productBillingModels: state.productBillingModels,
            productCoupons: state.productCoupons,
            useSameAddress: state.useSameAddress,
            selectedShippingMethod: state.selectedShippingMethod,
            isCallCenter: state.isCallCenter
          });

          const response = await orderService.createOrder(productLine, formData);
          
          set({ 
            orderResponse: {
              message: response.message,
              orders: response.orders || [],
              errors: response.errors || []
            }
          });

          if (response.status === 1 && (!response.errors || response.errors.length === 0)) {
            setTimeout(() => get().reset(), 2000);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to process order';
          set({ 
            orderResponse: {
              message: errorMessage,
              orders: [],
              errors: [{ status: 'error', message: errorMessage }]
            }
          });
          toast.error(errorMessage);
        } finally {
          set({ isSubmitting: false });
        }
      },

      reset: () => set(initialState)
    }),
    {
      name: 'order-store',
      version: 1,
      partialize: (state) => ({
        isCallCenter: state.isCallCenter,
        useSameAddress: state.useSameAddress
      })
    }
  )
);