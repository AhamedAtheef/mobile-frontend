
import { TooltipProvider } from "./components/ui/tooletip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layots";
import Home from "./pages/home";
import Mobiles from "./pages/mobile";
import MobileDetails from "./pages/mobiledetailes";
import Profile from "./pages/profile";
import About from "./pages/about";
import Orders from "./pages/orders";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard";

import AdminOrders from "./pages/admin/orders";
import AdminMobiles from "./pages/admin/mobiles";
import NotFound from "./pages/notfound";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mobiles" element={<Mobiles />} />
            <Route path="mobiles/:id" element={<MobileDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard/>} />
            <Route path="users" element={<h1>User</h1>} />
            <Route path="mobiles" element={<AdminMobiles />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

