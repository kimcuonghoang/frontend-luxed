import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

import NotFound from "../pages/common/NotFound";
import Register from "../pages/common/Register";
import Login from "../pages/common/Login";
import ProtectedRoute from "./../components/ProtectedRoute";
import adminRoutes from "./adminRoutes";
import clientRoutes from "./clientRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: clientRoutes,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: adminRoutes,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
