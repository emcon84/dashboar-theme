import { useState } from "react";
import {
  FiChevronDown,
  FiLogOut,
  FiMoon,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      {/* Left side: title */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        My Dashboard
      </h1>

      {/* Right side: dark toggle + user menu */}
      <div className="flex items-center space-x-4 relative">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
        >
          {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
        </button>

        {/* User avatar & menu */}
        <div>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              E
            </div>
            <FiChevronDown />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border dark:border-gray-700">
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUser className="mr-2" /> Perfil
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiSettings className="mr-2" /> Settings
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
