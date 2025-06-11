import Home from "../pages/client/Home";
import Contact from "../pages/client/Contact";
import About from "../pages/client/About";
import Products from "../pages/client/Products";
import Shop from "../pages/client/Shop";

const clientRoutes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/products/:id", element: <Products /> },
  { path: "/shop", element: <Shop /> },
];

export default clientRoutes;
