// src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { ProfileProvider } from "./context/ProfileContext";

// const PUBLISHABLE_KEY = import.meta.env.CLERK_PUBLISHABLE_KEY;
// if (!PUBLISHABLE_KEY) {
//  throw new Error("Cannot find your Clerk key.")
// }
// global vars, body, buttons, etc.

const container = document.getElementById("root");
if (!container) throw new Error("No #root element");

createRoot(container).render(
  // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  //   <ProfileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  //   </ProfileProvider>
  // </ClerkProvider>
);
