import { useState } from "react";
import { FaMoneyBill1Wave, FaTable, FaUsers } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const objectItems = [
    {
      name: "Dashboard",
      icon: <IoMdHome size={24} />,
      path: "/sidebar/dashboard",
    },
    {
      name: "Sales",
      icon: <FaMoneyBill1Wave size={22} />,
      path: "/sidebar/sales",
    },
    { name: "Users", icon: <FaUsers size={24} />, path: "/sidebar/users" },
    {
      name: "Advanced Table",
      icon: <FaTable />,
      path: "/sidebar/advanced-table",
    },
    {
      name: "Settings",
      icon: <IoSettingsSharp size={24} />,
      path: "/sidebar/settings",
    },
  ];

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-900 ${
        isOpen ? "w-[300px]" : "w-[70px]"
      } h-screen px-4 pt-4 transition-width duration-300 overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-2xl font-bold dark:text-white text-gray-800 ${isOpen ? "block" : "hidden"}`}
        >
          My Dashboard
        </p>
        <button className="top-4 left-4" onClick={handleToggleSidebar}>
          {isOpen ? (
            <MdOutlineArrowLeft size={40} className="text-gray-400" />
          ) : (
            <MdOutlineArrowRight size={40} className="text-gray-400" />
          )}
        </button>
      </div>

      <ul className="pt-10">
        {objectItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="py-3 rounded-lg flex items-center p-2 hover:bg-gray-300 text-gray-500 hover:text-gray-700"
            >
              <div className="w-8 mr-2">{item.icon}</div>
              <p
                className={`${
                  isOpen ? "block" : "hidden"
                } transition-width duration-300 font-bold`}
              >
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
