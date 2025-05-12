import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const LayoutNavbar = () => {
  return (
    <div>
      <Navbar />
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};
