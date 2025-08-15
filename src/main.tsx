// src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";


const container = document.getElementById("root");
if (!container) throw new Error("No #root element");

createRoot(container).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
);
