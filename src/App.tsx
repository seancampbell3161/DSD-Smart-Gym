import React from "react";
import { Routes, Route } from "react-router-dom";


// Layouts
import NonMemberLayout from "./layout/NonMemberLayout";
import MemberLayout from "./layout/memberLayout";

// Pages
import Homepage from "./pages/Homepage";
import MemberPortal from "./pages/MemberPortal";
import Classes from "./pages/Classes";
import CafeOrdering from "./pages/CafeOrdering";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";

// Global Footer
import Footer from "./layout/footer";

const nonMemberNav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/nonmember/aboutus"},
  { label: "Classes", to: "/nonmember/classes" }
];

const AppContent: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Public Homepage */}
        <Route
          path="/"
          element={
            <NonMemberLayout navItems={nonMemberNav}>
              <Homepage />
            </NonMemberLayout>
          }
        />

        {/* Non-member Classes */}
        <Route
          path="/nonmember/classes"
          element={
            <NonMemberLayout navItems={nonMemberNav}>
              <Classes />
            </NonMemberLayout>
          }
        />
        {/*About Us */}
          <Route
          path="/nonmember/aboutus"
          element={
            <NonMemberLayout navItems={nonMemberNav}>
              <AboutUs />
            </NonMemberLayout>
          }

         />
        {/* Member Portal */}
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

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
};

const App: React.FC = () => <AppContent />;

export default App;
