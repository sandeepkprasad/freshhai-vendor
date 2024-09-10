import React from "react";
import "./App.css";
import FirebaseProvider from "./context/FirebaseContext";
import ProductsProvider from "./context/ProductsContext";
import UsersProvider from "./context/UsersContext";
import DeliveryProvider from "./context/DeliveryContext";
import OrdersProvider from "./context/OrdersContext";
import AdminState from "./context/AdminState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components Imports
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Delivery from "./pages/Delivery";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NotificationPopup from "./components/NotificationPopup";

const App = () => {
  return (
    <Router>
      <FirebaseProvider>
        <ProductsProvider>
          <UsersProvider>
            <DeliveryProvider>
              <OrdersProvider>
                <AdminState>
                  <NotificationPopup />
                  <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AdminState>
              </OrdersProvider>
            </DeliveryProvider>
          </UsersProvider>
        </ProductsProvider>
      </FirebaseProvider>
    </Router>
  );
};

export default App;
