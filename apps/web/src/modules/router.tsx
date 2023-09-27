import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./auth/storage";

const AuthPage = React.lazy(() => import("./auth/pages/auth.page"));
const DashboardPage = React.lazy(
  () => import("./dashboard/pages/dashboard.page")
);
const PageNotFound = React.lazy(() => import("../shared/pages/not-found.page"));

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
