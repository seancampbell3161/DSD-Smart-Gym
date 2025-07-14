
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layouts
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import MemberLayout from "./layout/memberLayout";

// Pages
import Home from "./pages/Home";
import AdminPortal from "./pages/AdminPortal";
import MemberPortal from "./pages/MemberPortal";
import Profile from "./pages/Profile";
import Classes from "./pages/Classes";
import CafeOrdering from "./pages/CafeOrdering";

// import "./styles/main.css";
import "./styles/MemberNavbar.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isMemberRoute = location.pathname.startsWith("/member");

  const publicNavItems = [
    { label: "HOME", to: "/" },
    { label: "Classes", to: "/class-list" },
    { label: "Check In Status", to: "/check-in-status" },
    { label: "Metric Card", to: "/metric-card" },
    { label: "Cafe Ordering", to: "/cafe-ordering" },
  ];

  return (
    <>
      {/* Render Navbar only outside of /member routes */}
      {!isMemberRoute && <Navbar navItems={publicNavItems} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPortal />} />

        {/* Member-only routes */}
        <Route
          path="/member"
          element={
            <MemberLayout>
              <MemberPortal />
            </MemberLayout>
          }
        />
        <Route
          path="/member/profile"
          element={
            <MemberLayout>
              <Profile />
            </MemberLayout>
          }
        />
        <Route
          path="/member/classes"
          element={
            <MemberLayout>
              <Classes />
            </MemberLayout>
          }
        />
        <Route
          path="/member/cafe-ordering"
          element={
            <MemberLayout>
              <CafeOrdering />
            </MemberLayout>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);


export default App;
