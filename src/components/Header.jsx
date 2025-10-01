import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu } from "antd";
import CartModal from "./CartModal";
import { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  const { state } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  // Lấy user từ localStorage khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
      }
    }
  }, []);

  const countProduct = (state.cart || []).reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    nav("/auth/login");
  };

  // Menu khi user đã login
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile-settings">Profile Settings</Link>
      </Menu.Item>
      <Menu.Item key="account">
        <Link to="/account">Account</Link>
      </Menu.Item>
      {user?.role === "superAdmin" && (
        <Menu.Item key="admin">
          <Link to="/admin">Admin Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <span className="text-red-500">Sign Out</span>
      </Menu.Item>
    </Menu>
  );

  // Menu khi chưa login
  const guestMenu = (
    <Menu>
      <Menu.Item key="login">
        <Link to="/auth/login">Đăng nhập</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/auth/register">Đăng ký</Link>
      </Menu.Item>
    </Menu>
  );

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

        <nav className="hidden sm:flex space-x-6 text-base font-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/shop", label: "Shop" },
            { path: "/contact", label: "Contact" },
            { path: "/privacy", label: "Privacy" },
            { path: "/terms", label: "Terms" },
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
          {/* Giỏ hàng */}
          <Button type="default" onClick={() => setVisible(true)}>
            <FiShoppingCart />
            <p className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {countProduct}
            </p>
          </Button>
          <CartModal visible={visible} onClose={() => setVisible(false)} />

          {/* Dropdown User */}
          <Dropdown
            overlay={user ? userMenu : guestMenu}
            placement="bottomRight"
          >
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {user ? (
                <>
                  <Avatar size="large" src={user?.avatar}>
                    {user?.fullname?.[0] || (
                      <FaRegUserCircle className="w-7 h-7" />
                    )}
                  </Avatar>
                  <FiChevronDown className="w-4 h-4" />
                </>
              ) : (
                <>
                  <FaRegUserCircle className="w-7 h-7" />
                  <FiChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
