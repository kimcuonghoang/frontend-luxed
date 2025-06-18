import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import User from "../pages/admin/User";
import ProductAdd from "../pages/admin/ProductAdd";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductDetail from "./../pages/admin/ProductDetail";
import Category from "../pages/admin/Category";
import CategoryAdd from "../pages/admin/CategoryAdd";
import CategoryEdit from "../pages/admin/CategoryEdit";

import Analytics from "../pages/admin/Analytics";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Payments from "../pages/admin/Payments";
import Settings from "../pages/admin/Settings";
import Variants from "../pages/admin/Variants";
import Attribute from "../pages/admin/Attribute";
import VariantValue from "../pages/admin/VariantValue";

const adminRoutes = [
  // Admin pages
  { path: "dashboard", element: <Dashboard /> },
  { path: "analytics", element: <Analytics /> },
  { path: "orders", element: <Orders /> },
  { path: "customers", element: <Customers /> },
  { path: "payments", element: <Payments /> },
  { path: "settings", element: <Settings /> },

  // Admin Products
  { path: "products", element: <Product /> },
  { path: "products/add", element: <ProductAdd /> },
  { path: "products/:id", element: <ProductDetail /> },
  { path: "products/edit/:id", element: <ProductEdit /> },

  //Admin Variants product
  { path: "variants", element: <Variants /> },
  { path: "variants-value", element: <VariantValue /> },

  // Admin Attribute
  { path: "Attribute", element: <Attribute /> },

  // Admin Categories
  { path: "categories", element: <Category /> },
  { path: "categories/add", element: <CategoryAdd /> },
  { path: "categories/edit/:id", element: <CategoryEdit /> },

  // Admin Users
  { path: "user", element: <User /> },
];

export default adminRoutes;
