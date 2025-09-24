import Dashboard from "../pages/admin/Dashboard";

import User from "../pages/admin/User";

import Analytics from "../pages/admin/Analytics";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Payments from "../pages/admin/Payments";
import Settings from "../pages/admin/Settings";
import Variants from "../pages/admin/manager-variant/Variants";
import Attribute from "../pages/admin/manager-attribute/Attribute";
import VariantValue from "../pages/admin/manager-variant/VariantValue";
import Category from "../pages/admin/manager-category/Category";
import CategoryAdd from "../pages/admin/manager-category/CategoryAdd";
import CategoryEdit from "../pages/admin/manager-category/CategoryEdit";
import Product from "../pages/admin/manager-product/Product";
import ProductAdd from "../pages/admin/manager-product/ProductAdd";
import ProductDetail from "../pages/admin/manager-product/ProductDetail";
import ProductEdit from "../pages/admin/manager-product/ProductEdit";
import AttributeValue from "../pages/admin/manager-attribute/AttributeValue";

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
  { path: "attribute", element: <Attribute /> },
  { path: "attribute-value", element: <AttributeValue /> },

  // Admin Categories
  { path: "categories", element: <Category /> },
  { path: "categories/add", element: <CategoryAdd /> },
  { path: "categories/edit/:id", element: <CategoryEdit /> },

  // Admin Users
  { path: "user", element: <User /> },
];

export default adminRoutes;
