import { Routes, Route } from 'react-router-dom';
import './App.css'
import AppMenu from './components/AppMenu/AppMenu.tsx';
import { Box } from '@mui/material';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import HomePage from './pages/HomePage.tsx';
import StorePage from './pages/StorePage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import OrdersPage from './pages/OrdersPage/OrdersPage.tsx';
import OrderPage from './pages/OrderPage/OrderPage.tsx';
import '@fontsource/metropolis';
import ProtectedRoute from './components/ProtectedRoute.tsx';

function App() {
  return <>
      <AppMenu/>
      <Box sx={{mx:'auto', width:'100%'}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/register" element={<RegisterPage/>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />



          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderPage />} />
          </Route>
        </Routes>
      </Box>
    </>
     
}

export default App
