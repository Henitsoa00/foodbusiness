import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { PhoneShell } from "./components/Layout";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/client/Login";
import Home from "./pages/client/Home";
import Menu from "./pages/client/Menu";
import ProductDetail from "./pages/client/ProductDetail";
import Cart from "./pages/client/Cart";
import DeliveryTime from "./pages/client/DeliveryTime";
import Recap from "./pages/client/Recap";
import Confirmation from "./pages/client/Confirmation";
import History from "./pages/client/History";
import Payment from "./pages/client/Payment";
import Profile from "./pages/client/Profile";
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyOrders from "./pages/company/Orders";
import CompanyEmployees from "./pages/company/Employees";
import CompanyHistory from "./pages/company/History";
import CompanyProfile from "./pages/company/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminKitchen from "./pages/admin/Kitchen";
import AdminDeliveries from "./pages/admin/Deliveries";
import AdminClients from "./pages/admin/Clients";
import AdminFinances from "./pages/admin/Finances";
import KitchenProduction from "./pages/kitchen/Production";
import KitchenCompanyDetail from "./pages/kitchen/CompanyDetail";
import KitchenOrders from "./pages/kitchen/Orders";
import KitchenReady from "./pages/kitchen/Ready";
import KitchenProfile from "./pages/kitchen/Profile";
import DeliveryList from "./pages/delivery/DeliveryList";
import DeliveryDetail from "./pages/delivery/DeliveryDetail";
import DeliveryHistory from "./pages/delivery/History";
import DeliveryOrders from "./pages/delivery/Orders";
import DeliveryFinances from "./pages/delivery/Finances";
import DeliveryProfile from "./pages/delivery/Profile";

function AppRoutes() {
  return (
    <PhoneShell>
      <Routes>
        <Route path="/" element={<Navigate to="/client/login" replace />} />
        <Route path="/roles" element={<RoleSelect />} />

        <Route path="/client/login" element={<Login />} />
        <Route path="/client/home" element={<Home />} />
        <Route path="/client/menu" element={<Menu />} />
        <Route path="/client/product/:id" element={<ProductDetail />} />
        <Route path="/client/cart" element={<Cart />} />
        <Route path="/client/delivery" element={<DeliveryTime />} />
        <Route path="/client/recap" element={<Recap />} />
        <Route path="/client/confirmation" element={<Confirmation />} />
        <Route path="/client/history" element={<History />} />
        <Route path="/client/payment" element={<Payment />} />
        <Route path="/client/profile" element={<Profile />} />

        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/orders" element={<CompanyOrders />} />
        <Route path="/company/employees" element={<CompanyEmployees />} />
        <Route path="/company/history" element={<CompanyHistory />} />
        <Route path="/company/profile" element={<CompanyProfile />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/kitchen" element={<AdminKitchen />} />
        <Route path="/admin/deliveries" element={<AdminDeliveries />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/finances" element={<AdminFinances />} />

        <Route path="/kitchen/production" element={<KitchenProduction />} />
        <Route path="/kitchen/orders" element={<KitchenOrders />} />
        <Route path="/kitchen/ready" element={<KitchenReady />} />
        <Route path="/kitchen/profile" element={<KitchenProfile />} />
        <Route path="/kitchen/company/:id" element={<KitchenCompanyDetail />} />

        <Route path="/delivery" element={<DeliveryList />} />
        <Route path="/delivery/history" element={<DeliveryHistory />} />
        <Route path="/delivery/orders" element={<DeliveryOrders />} />
        <Route path="/delivery/finances" element={<DeliveryFinances />} />
        <Route path="/delivery/profile" element={<DeliveryProfile />} />
        <Route path="/delivery/:id" element={<DeliveryDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneShell>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  );
}
