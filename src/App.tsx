// src/App.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layouts & Navbars
import Navbar        from "./layout/navbar";
import MemberNavbar  from "./layout/memberNavbar";
import Footer        from "./layout/footer";
import MemberLayout  from "./layout/memberLayout";

// Pages
import Homepage      from "./pages/Homepage";
import MemberPortal  from "./pages/MemberPortal";
import Classes       from "./pages/Classes";
import CafeOrdering  from "./pages/CafeOrdering";
import AdminDashboard from "./pages/AdminDashboard";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isMember = location.pathname.startsWith("/member");

  const memberNav = [
    { label: "Home", to: "/member" },
    { label: "Classes", to: "/member/classes" },
    { label: "Cafe", to: "/member/cafe-ordering" },
  ];

  return (
    <>
      {isMember
        ? <MemberNavbar navItems={memberNav} />
        : <Navbar />
      }

      <Routes>
        {/* public */}
        <Route path="/" element={<Homepage />} />

        {/* member */}
        <Route
          path="/member"
          element={
            <MemberLayout>
              <MemberPortal />
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

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
};

const App: React.FC = () => <AppContent />;

export default App;
