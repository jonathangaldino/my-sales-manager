import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./privateRouter";

const AuthPage = React.lazy(() => import("./auth/pages/auth.page"));
const DashboardPage = React.lazy(
  () => import("./dashboard/pages/dashboard.page")
);
const PageNotFound = React.lazy(() => import("../shared/pages/not-found.page"));

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
