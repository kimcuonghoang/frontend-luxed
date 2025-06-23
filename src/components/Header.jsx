import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { Avatar, Button, Dropdown } from "antd";
import CartModal from "./CartModal";
import { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";

import { getUser } from "../api/authApi";
import { FaRegUserCircle } from "react-icons/fa";
export default function Header() {
  const { state } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  const nav = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res.data.data);
    };
    fetchUser();
  }, []);
  const countProduct = (state.cart || []).reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  const userMenuItems = [
    {
      key: "1",
      label: <Link to="/profile-settings">Profile Settings</Link>,
    },
    {
      key: "2",
      label: <Link to="/account">Account</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: <span className="text-red-500">Sign Out</span>,
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ color: "#484848" }}
        >
          CodeFarm
        </Link>

        {/* Toggle Theme (Mobile) */}
        {/* <div className="sm:hidden">
          <ToggleTheme />
        </div> */}

        <nav className="hidden sm:flex space-x-6 text-base font-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/shop", label: "Shop" },
            { path: "/contact", label: "Contact" },
            { path: "/auth/login", label: "Login" },
            { path: "/auth/register", label: "Register" },
            { path: "/admin", label: "Admin" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition px-2 py-1 rounded"
              style={{ color: "#484848" }}
              onMouseEnter={(e) => {
                e.target.style.color = "#FFFFFF";
                e.target.style.backgroundColor = "#000000";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#484848";
                e.target.style.backgroundColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button type="default" onClick={() => setVisible(true)}>
            <FiShoppingCart />
            <p className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {countProduct}
            </p>
          </Button>
          <CartModal visible={visible} onClose={() => setVisible(false)} />
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Avatar
                  size={32}
                  src={user.avatar || undefined}
                  className="border-2 border-gray-200 dark:border-gray-700"
                />

                <FiChevronDown className="w-4 h-4" />
              </button>
            </Dropdown>
          ) : (
            <Link to="/auth/login">
              <FaRegUserCircle className="" />
            </Link>
          )}
        </div>
        {/* Toggle Theme (PC) */}
        {/* <div className="hidden sm:block">
          <ToggleTheme />
        </div> */}
      </div>
    </header>
  );
}
