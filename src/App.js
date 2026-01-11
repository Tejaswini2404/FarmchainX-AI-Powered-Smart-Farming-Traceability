import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

// Farmer
import Dashboard from "./pages/Farmer/Dashboard";
import Addcrop from "./pages/Farmer/Addcrop";
import Mycrops from "./pages/Farmer/Mycrops";
import Orders from "./pages/Farmer/Orders";
import Analytics from "./pages/Farmer/Analytics";
import Alerts from "./pages/Farmer/Alerts";
import AIAdvisor from "./pages/Farmer/AIAdvisor";

// Customer
import Products from "./pages/Customer/Products";
import Cart from "./pages/Customer/Cart";
import MyOrders from "./pages/Customer/MyOrders";
import Profile from "./pages/Customer/Profile";
import CustomerDashboard from "./pages/Customer/Dashboard";
import OrderDetails from "./pages/Customer/OrderDetails";

// Distributor
import DistributorDashboard from "./pages/Distributor/Dashboard";
import DistributorOrders from "./pages/Distributor/Orders";
import DistributorProducts from "./pages/Distributor/Products"; 
import DistributorSuppliers from "./pages/Distributor/Suppliers";
import DistributorInsights from "./pages/Distributor/Insights";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./Layouts/Adminlayout";

import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Farmer */}
        <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><Dashboard /></ProtectedRoute>} />
        <Route path="/farmer/add-crop" element={<ProtectedRoute role="farmer"><Addcrop /></ProtectedRoute>} />
        <Route path="/farmer/my-crops" element={<ProtectedRoute role="farmer"><Mycrops /></ProtectedRoute>} />
        <Route path="/farmer/orders" element={<ProtectedRoute role="farmer"><Orders /></ProtectedRoute>} />
        <Route path="/farmer/analytics" element={<ProtectedRoute role="farmer"><Analytics /></ProtectedRoute>} />
        <Route path="/farmer/ai-advisor" element={<ProtectedRoute role="farmer"><AIAdvisor /></ProtectedRoute>} />
        <Route path="/farmer/alerts" element={<ProtectedRoute role="farmer"><Alerts /></ProtectedRoute>} />

        {/* Customer */}
        <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/products" element={<ProtectedRoute role="customer"><Products /></ProtectedRoute>} />
        <Route path="/customer/cart" element={<ProtectedRoute role="customer"><Cart /></ProtectedRoute>} />
        <Route path="/customer/orders" element={<ProtectedRoute role="customer"><MyOrders /></ProtectedRoute>} />
        <Route path="/customer/orders/:id" element={<ProtectedRoute role="customer"><OrderDetails /></ProtectedRoute>} />
        <Route path="/customer/profile" element={<ProtectedRoute role="customer"><Profile /></ProtectedRoute>} />

        {/* Distributor */}
        <Route path="/distributor/dashboard" element={<ProtectedRoute role="distributor"><DistributorDashboard /></ProtectedRoute>} />
        <Route path="/distributor/products" element={<ProtectedRoute role="distributor"><DistributorProducts /></ProtectedRoute>} />
        <Route path="/distributor/orders" element={<ProtectedRoute role="distributor"><DistributorOrders /></ProtectedRoute>} />
        <Route path="/distributor/suppliers" element={<ProtectedRoute role="distributor"><DistributorSuppliers /></ProtectedRoute>} />
        <Route path="/distributor/insights" element={<ProtectedRoute role="distributor"><DistributorInsights /></ProtectedRoute>} />

         <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
         <Route
          path="/admin/dashboard"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
