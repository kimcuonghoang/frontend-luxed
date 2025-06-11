import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { Button } from "antd";
import CartModal from "./CartModal";
import { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";
export default function Header() {
  const { state } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const countProduct = (state.cart || []).reduce(
    (total, item) => total + (item?.quantity || 0),
    0
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
        <Button type="default" onClick={() => setVisible(true)}>
          <FiShoppingCart />
          <p className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {countProduct}
          </p>
        </Button>
        <CartModal visible={visible} onClose={() => setVisible(false)} />

        {/* Toggle Theme (PC) */}
        {/* <div className="hidden sm:block">
          <ToggleTheme />
        </div> */}
      </div>
    </header>
  );
}
