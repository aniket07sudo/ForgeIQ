import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "../layouts/ProtectedLayout/ProtectedLayout";

import navRoutes, { type NavItem } from "../config/navRoutes";
import PublicRoute from "./PublicRoutes";
import DemoLogin from "../pages/Auth/DemoLogin";

function renderRoute(item: NavItem) {
  const routes = [];

  if (item.path && item.component) {
    const C = item.component;

    routes.push(
      <Route
        handle={{
          subtext: "Aniket heading",
        }}
        key={item.key}
        path={item.path}
        element={<C />}
      />,
    );
  }

  if (item.children) {
    item.children.forEach((c: any) => routes.push(...renderRoute(c)));
  }

  return routes;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/demo"
        element={
          <PublicRoute>
            <DemoLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        {navRoutes.map((r) => renderRoute(r))}
        <Route path="/planning/breakdown/generate" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
