import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className="fixed bottom-4 right-4 shadow-lg hover:transform hover:scale-110 transition-transform duration-300 z-50">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow w-full rounded-lg">
        <button
          className="text-gray-800 dark:text-white flex items-center space-x-2"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </div>
  );
};
