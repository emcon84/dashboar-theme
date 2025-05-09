import { useNavigate, useLocation } from "react-router-dom";

export const LayoutSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSidebar = location.pathname.startsWith("/sidebar");

  const handleSwitch = () => {
    const newLayout = isSidebar ? "/navbar" : "/sidebar";
    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`${newLayout}/${currentPath || "dashboard"}`);
  };

  return (
    <div className="absolute bottom-20 right-4 shadow-lg hover:transform hover:scale-110 transition-transform duration-300">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow w-full rounded-lg">
        <button
          onClick={handleSwitch}
          className="text-gray-800 dark:text-white flex items-center space-x-2"
        >
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {isSidebar ? "Navbar Layout" : "Sidebar Layout"}
          </span>
        </button>
      </div>
    </div>
  );
};
