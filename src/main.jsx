import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { CursorProvider } from "./Components/CursorEffect/context/CursorContext.jsx";

createRoot(document.getElementById("root")).render(
  <CursorProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CursorProvider>
);
