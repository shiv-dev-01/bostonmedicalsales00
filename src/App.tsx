import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewOrderPage } from './pages/orders/NewOrderPage';
import { OrderListPage } from './pages/orders/OrderListPage';
import { OrderDetailsPage } from './pages/orders/OrderDetailsPage';
import { CreateCouponPage } from './pages/coupons/CreateCouponPage';
import { PermissionGuard } from './lib/guards';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import { LoadingBar } from './components/ui/LoadingBar';
import { OrderListEmail } from './pages/orders/OrderListEmail';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <BrowserRouter>
      <LoadingBar isLoading={isLoading} />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<DashboardPage />} />
          
          <Route path="orders">
            <Route index element={<OrderListPage />} />
            <Route 
              path="new" 
              element={
                // <PermissionGuard requiredPermission={['1']}>
                  <NewOrderPage />
                // {/* </PermissionGuard> */}
              } 
            />
            <Route path=":orderId" element={<OrderDetailsPage />} />
          </Route>
          {/* Order by Email  */}
          <Route path="ordersemail">
            <Route index element={<OrderListEmail />} />
            <Route 
              path="new" 
              element={
                  <NewOrderPage />
              } 
            />
            <Route path=":orderId" element={<OrderDetailsPage />} />
          </Route>
          
          <Route path="coupons">
            <Route 
              path="new" 
              element={
                // <PermissionGuard requiredPermission={['1', '2', '3']}>
                  <CreateCouponPage />
                // </PermissionGuard>
              } 
            />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;