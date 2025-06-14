import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css"; // Import Tailwind CSS
import Layout from "./layout/Layout"; // Import the main Sakai-based layout

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import MembershipPlanControl from "./pages/admin/MembershipPlanControl";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import AdminCustomerSupportPage from "./pages/admin/CustomerSupport";
import BannerManagement from "./pages/admin/AdvertiseWithUs";
import AffiliateManagement from "./pages/admin/AffiliateManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import LeadsManagement from "./pages/admin/LeadsManagement";
import AdminRequirements from "./pages/admin/AdminRequirements";

// Import PrimeReact and Sakai theme CSS first
import 'primereact/resources/primereact.min.css'; // Core PrimeReact CSS
// import 'primeicons/primeicons.css'; // Icons
// Choose the Sakai theme you want, e.g., saga, arya, vela
// import './styles/themes/lara-light-indigo/theme.scss'; // Example: Lara Light Indigo - Temporarily commented out
// import './styles/themes/saga-blue/theme.css'; 

// Import Sakai layout SASS files
import './styles/layout/layout.scss'; // Main layout styles
// import './styles/demo/Demos.scss'; // Demo specific styles (optional)

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="membership-plans" element={<MembershipPlanControl />} />
            <Route path="categories-management" element={<CategoriesManagement />} />
            <Route path="leads-management" element={<LeadsManagement />} />
            <Route path="admin-requirements" element={<AdminRequirements />} />
            <Route path="customer-support" element={<AdminCustomerSupportPage />} />
            <Route path="advertise-with-us" element={<BannerManagement />} />
            <Route path="affiliate-program" element={<AffiliateManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
