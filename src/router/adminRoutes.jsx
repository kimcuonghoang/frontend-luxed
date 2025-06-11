import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import User from "../pages/admin/User";
import ProductAdd from "../pages/admin/ProductAdd";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductDetail from "./../pages/admin/ProductDetail";
import Category from "../pages/admin/Category";
import CategoryAdd from "../pages/admin/CategoryAdd";
import CategoryEdit from "../pages/admin/CategoryEdit";

const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "product", element: <Product /> },
  { path: "product/add", element: <ProductAdd /> },
  { path: "product/:id", element: <ProductDetail /> },
  { path: "product/edit/:id", element: <ProductEdit /> },
  { path: "categories", element: <Category /> },
  { path: "categories/add", element: <CategoryAdd /> },
  { path: "categories/edit/:id", element: <CategoryEdit /> },

  { path: "user", element: <User /> },
];

export default adminRoutes;
