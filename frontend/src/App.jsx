import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import Addresses from "./pages/Addresses";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

  <Navbar />

  <Toaster
    position="top-right"
    reverseOrder={false}
  />

  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/addresses" element={<Addresses />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;