import { BiChart } from "react-icons/bi";
import { FaTable } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

export const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const objectItems = [
    {
      name: "Dashboard",
      icon: <IoMdHome size={24} />,
      path: "/sidebar/dashboard",
    },
    // {
    //   name: "Sales",
    //   icon: <FaMoneyBill1Wave size={22} />,
    //   path: "/sidebar/sales",
    // },
    // { name: "Users", icon: <FaUsers size={24} />, path: "/sidebar/users" },
    {
      name: "Line Chart",
      icon: <BiChart />,
      path: "/sidebar/line-chart",
    },
    {
      name: "Flexible Chart",
      icon: <BiChart />,
      path: "/sidebar/flexible-chart",
    },
    {
      name: "Advanced Table",
      icon: <FaTable />,
      path: "/sidebar/advanced-table",
    },
    // {
    //   name: "Settings",
    //   icon: <IoSettingsSharp size={24} />,
    //   path: "/sidebar/settings",
    // },
  ];

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-900 ${
        isOpen ? "w-[300px]" : "w-[70px]"
      } h-screen fixed top-0 left-0 px-4 pt-4 transition-all duration-300 overflow-hidden z-30`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-2xl font-bold dark:text-white text-gray-800 ${isOpen ? "block" : "hidden"}`}
        >
          My Dashboard
        </p>
        <button className="top-4 left-4" onClick={toggleSidebar}>
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
