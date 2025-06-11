import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userRole = JSON.parse(localStorage.getItem("user") || "[]");
  return <>{userRole.id === 2 ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
