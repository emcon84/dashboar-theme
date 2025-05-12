import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";
import { LayoutProvider } from "./context/LayoutContext.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <SidebarProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </SidebarProvider>
      </LayoutProvider>
    </ThemeProvider>
  </React.StrictMode>
);
