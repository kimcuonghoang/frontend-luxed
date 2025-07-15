import Home from "../pages/client/Home";
import Contact from "../pages/client/Contact";
import About from "../pages/client/About";
import Products from "../pages/client/Products";
import Shop from "../pages/client/Shop";
import ProfileSetting from "../pages/client/ProfileSetting";
import Account from "../pages/client/Account";
import Cart from "../pages/client/Cart";
import Checkout from "../pages/client/Checkout";

const clientRoutes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/products/:id", element: <Products /> },
  { path: "/shop", element: <Shop /> },
  { path: "/profile-settings", element: <ProfileSetting /> },
  { path: "/account", element: <Account /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
];

export default clientRoutes;
