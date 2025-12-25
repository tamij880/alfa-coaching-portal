// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // If a role is required and doesn't match → redirect to login
    if (roleRequired && decoded.role !== roleRequired) {
      return <Navigate to="/login" replace />;
    }

    // ✅ Authorized → show the page
    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;