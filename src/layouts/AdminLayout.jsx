import { useState } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiPackage,
  FiCreditCard,
  FiStar,
} from "react-icons/fi";
import { Avatar, Badge, Dropdown, Switch } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import imgAvt from "../assets/imgs/imgLogin.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navigationItems = [
    { icon: FiHome, label: "Dashboard", to: "/admin/dashboard" },
    { icon: FiBarChart2, label: "Analytics", to: "/admin/analytics" },
    { icon: FiPackage, label: "Orders", to: "/admin/orders" },
    { icon: FiUsers, label: "Customers", to: "/admin/customers" },
    { icon: FiCreditCard, label: "Payments", to: "/admin/payments" },
    { icon: FiShoppingBag, label: "Products", to: "/admin/products" },
    { icon: CiBoxList, label: "Categories", to: "/admin/categories" },
    { icon: CiBoxList, label: "Attribute", to: "/admin/attribute" },
    { icon: FiSettings, label: "Settings", to: "/admin/settings" },
    { icon: RollbackOutlined, label: "Back to Home", to: "/" },
  ];

  const userMenuItems = [
    {
      key: "1",
      label: "Profile Settings",
    },
    {
      key: "2",
      label: "Account",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Sign Out",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        } border-r`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              <FiStar className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">LUXED</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive =
                item.to !== "/" && location.pathname.startsWith(item.to);

              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 relative group ${
                      isActive
                        ? darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-black"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {/* Border left highlight */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-black dark:bg-white rounded-r" />
                    )}

                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header
          className={`sticky top-0 z-40 h-16 border-b ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          } backdrop-blur-sm bg-opacity-90`}
        >
          <div className="flex items-center justify-between h-full px-6">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <FiSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-black"
                  } focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
                    darkMode ? "focus:ring-white" : "focus:ring-black"
                  }`}
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {darkMode ? (
                  <FiMoon className="w-5 h-5" />
                ) : (
                  <FiSun className="w-5 h-5" />
                )}

                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="bg-gray-300"
                />
              </div>

              {/* Notifications */}
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <Badge count={3} size="small">
                  <FiBell className="w-5 h-5" />
                </Badge>
              </button>

              {/* User Menu */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Avatar
                    size={32}
                    src={imgAvt}
                    className="border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">Kim Cuong</div>
                    <div
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Administrator
                    </div>
                  </div>
                  <FiChevronDown className="w-4 h-4" />
                </button>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout;
