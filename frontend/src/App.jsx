import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Import Tailwind CSS
import { AuthProvider } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import ProfileManagement from "./pages/auth/ProfileManagement";

// Buyer Pages
import BuyerPostInquiry from "./pages/buyer/PostInquiry";
import SelectSupplier from "./pages/buyer/SelectSupplier";
import OrderHistory from "./pages/buyer/OrderHistory";

// Supplier Pages
import SubmitQuotation from "./pages/supplier/SubmitQuotation";
import ViewInquiries from "./pages/supplier/ViewInquiries";

// Inquiry Management
import InquiryDetails from "./pages/inquiry-management/InquiryDetails";
import AnonymousBuyerInfo from "./pages/inquiry-management/AnonymousBuyerInfo";

// Search
import IndustryCategory from "./pages/search/IndustryCategory";

// Home Page
import Home from "./pages/Home";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import ManageInquiry from "./pages/buyer/ManageInquiry";
import LeadHistory from "./pages/supplier/LeadHistory";
import SellerFavourites from "./pages/supplier/SellerFavourites";
import LatestBuyLeads from "./homecomponents/LatestBuyLeads";
import ContactUs from "./pages/contact/ContactUs";
import CustomerSupport from "./pages/contact/CustomerSupport";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/customerSupport" element={<CustomerSupport />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/otp-verification" element={<OTPVerification />} />
            <Route path="/auth/profile" element={<ProfileManagement />} />

            {/* Buyer Routes */}
            <Route path="/buyer/post-inquiry" element={<BuyerPostInquiry />} />
            <Route path="/buyer/BuyerDashboard" element={<BuyerDashboard />} />
            <Route path="/buyers/Manage-requirement" element={<ManageInquiry />} />
            <Route path="/buyer/select-supplier" element={<SelectSupplier />} />
            <Route path="/buyer/order-history" element={<OrderHistory />} />

            {/* Supplier Routes */}
            <Route path="/supplier/submit-quotation/:inquiryId" element={<SubmitQuotation />} />
            <Route path="/supplier/view-inquiries" element={<ViewInquiries />} />
            <Route path="/sellers/history" element={<LeadHistory />} />
            <Route path="/sellers/favourites" element={<SellerFavourites />} />
            <Route path="/sellers/leads" element={<LatestBuyLeads />} />

            {/* Inquiry Management */}
            <Route path="/inquiry-management/inquiry-details/:id" element={<InquiryDetails />} />
            <Route path="/inquiry-management/anonymous-buyer-info" element={<AnonymousBuyerInfo />} />

            {/* Search */}
            <Route path="/search/industry/:category" element={<IndustryCategory />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
