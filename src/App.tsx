import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import NonMemberLayout from "./layout/NonMemberLayout";
import MemberLayout from "./layout/memberLayout";

// Pages
import Homepage from "./pages/Homepage";
import MemberPortal from "./pages/MemberPortal";
import Classes from "./pages/Classes";
import CafeOrdering from "./pages/CafeOrdering";
import AdminDashboard from "./pages/AdminDashboard";
import AdminClasses from "./pages/AdminClasses";

// Global Footer
import Footer from "./layout/footer";

// ------- Auth helpers -------
const isAuthed = () => !!localStorage.getItem("authToken");
const getRole = () => (localStorage.getItem("role") || "").toLowerCase();
const isAdminOrTrainer = () => {
  const role = getRole();
  return role === "admin" || role === "trainer";
};

// ------- Route Guards -------
function RequireAuth({ children }: { children: React.ReactNode }) {
  return isAuthed() ? <>{children}</> : <Navigate to="/" replace />;
}
function RequireAdminOrTrainer({ children }: { children: React.ReactNode }) {
  return isAdminOrTrainer() ? <>{children}</> : <Navigate to="/member" replace />;
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route element={<NonMemberLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* Members (match MemberLayout nav exactly) */}
        <Route
          path="/member"
          element={
            <RequireAuth>
              <MemberLayout>
                <MemberPortal />
              </MemberLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/member/classes"
          element={
            <RequireAuth>
              <MemberLayout>
                <Classes />
              </MemberLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/member/cafe-ordering"
          element={
            <RequireAuth>
              <MemberLayout>
                <CafeOrdering />
              </MemberLayout>
            </RequireAuth>
          }
        />

        {/* Aliases to keep older links working */}
        <Route path="/user" element={<Navigate to="/member" replace />} />
        <Route path="/classes" element={<Navigate to="/member/classes" replace />} />
        <Route path="/cafe" element={<Navigate to="/member/cafe-ordering" replace />} />

        {/* Admin/Trainer areas */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdminOrTrainer>
              <AdminDashboard />
            </RequireAdminOrTrainer>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <RequireAdminOrTrainer>
              <AdminClasses />
            </RequireAdminOrTrainer>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
