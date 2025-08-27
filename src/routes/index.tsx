import React from "react";
import { createBrowserRouter } from "react-router-dom";

const LayoutDefault = React.lazy(() => import("layouts/layout-default"));
const LoginPage = React.lazy(() => import("pages/login"));
const HomePage = React.lazy(() => import("pages/home"));
const CategoriesPage = React.lazy(() => import("pages/categories"));
const AssetsPage = React.lazy(() => import("pages/assets"));
const StaffsPage = React.lazy(() => import("pages/staffs"));
const SuppliersPage = React.lazy(() => import("pages/suppliers"));
const BorrowPage = React.lazy(() => import("pages/borrow"));
const ServicesPage = React.lazy(() => import("pages/services"));
const PrivateRoute = React.lazy(() => import("components/private-router"));

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutDefault />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "assets", element: <AssetsPage /> },
          { path: "staffs", element: <StaffsPage /> },
          { path: "suppliers", element: <SuppliersPage /> },
          { path: "borrow-and-pay", element: <BorrowPage /> },
          { path: "services", element: <ServicesPage /> },
        ],
      },
    ],
  },
]);

export default routes;