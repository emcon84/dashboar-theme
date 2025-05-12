import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AdvancedTable from "./pages/AdvancedTable";
import { LayoutSidebar } from "./layouts/LayoutSidebar";
import { LayoutNavbar } from "./layouts/LayoutNavbar";
import { LayoutSwitcher } from "./components/LayoutSwitcher";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <LayoutSwitcher />
      <ThemeSwitcher />

      <Routes>
        {/* Layout Sidebar */}
        <Route path="/sidebar" element={<LayoutSidebar />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="users" element={<Users />} />
          <Route path="advanced-table" element={<AdvancedTable />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Layout Navbar */}
        <Route path="/navbar" element={<LayoutNavbar />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="users" element={<Users />} />
          <Route path="advanced-table" element={<AdvancedTable />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to sidebar layout as default */}
        <Route path="/" element={<Navigate to="/sidebar/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
