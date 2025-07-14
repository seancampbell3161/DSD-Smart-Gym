// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layouts
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import MemberLayout from "./layout/memberLayout";

// Pages
import Homepage from "./pages/Homepage";
import AdminPortal from "./pages/AdminPortal";
import MemberPortal from "./pages/MemberPortal";
import Profile from "./pages/Profile";
import Classes from "./pages/Classes";
import CafeOrdering from "./pages/CafeOrdering";

// Styles
import "./styles/main.css";
import "./styles/MemberNavbar.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isMemberRoute = location.pathname.startsWith("/member");

  const publicNavItems = [
    { label: "HOME", to: "/" },
    { label: "CLASSES", to: "/classes" },
    { label: "CHECK IN STATUS", to: "/check-in-status" },
    { label: "METRIC CARD", to: "/metric-card" },
    { label: "CAFE ORDERING", to: "/cafe-ordering" },
  ];

  return (
    <>
      {!isMemberRoute && <Navbar navItems={publicNavItems} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
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

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
