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
import AdminPortal   from "./pages/AdminPortal";
import MemberPortal  from "./pages/MemberPortal";
import Profile       from "./pages/Profile";
import Classes       from "./pages/Classes";
import CafeOrdering  from "./pages/CafeOrdering";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isMember = location.pathname.startsWith("/member");

  const publicNav = [
    { label: "HOME", to: "/" },
    { label: "CLASSES", to: "/classes" },
    { label: "METRIC CARD", to: "/metric-card" },
    { label: "CAFE ORDERING", to: "/cafe-ordering" },
  ];

  const memberNav = [
    { label: "Home", to: "/member" },
    { label: "Classes", to: "/member/classes" },
    { label: "Cafe", to: "/member/cafe-ordering" },
  ];

  return (
    <>
      {isMember
        ? <MemberNavbar navItems={memberNav} />
        : <Navbar       navItems={publicNav} />
      }

      <Routes>
        {/* public */}
        <Route path="/"        element={<Homepage />} />
        <Route path="/admin"   element={<AdminPortal />} />

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

const App: React.FC = () => <AppContent />;

export default App;
