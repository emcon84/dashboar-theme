import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";
import { LayoutProvider } from "./context/LayoutContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </LayoutProvider>
    </ThemeProvider>
  </React.StrictMode>
);
