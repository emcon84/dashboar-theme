import { Breadcrumbs } from "../components/Breadcrumbs";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const LayoutSidebar = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};
