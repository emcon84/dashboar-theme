import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Sidebar } from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";

export const LayoutSidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <div
        className={`min-h-screen bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${
          isOpen ? "ml-[300px]" : "ml-[70px]"
        }`}
      >
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  );
};
