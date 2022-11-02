import React, { Suspense} from "react";
import { useRoutes, useLocation, Navigate } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner";
import MainLayout from "./components/Layout/MainLayout";

const Login = React.lazy(() => import("./pages/Login"))
const ListCustomer = React.lazy(() => import("./pages/ListCustomer"))
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"))

const routes = (isLogin) => [
  {
    element: <Suspense fallback={<LoadingSpinner/>}><Login /> </Suspense>,
    path: "/",
  },
  {
    element:<Suspense fallback={<LoadingSpinner/>}><MainLayout /></Suspense>,
    children: [
      {
        path: '/list-customer',
        element: <ListCustomer />
      },
      {
        path: '/customer-detail/:id',
        element: <CustomerDetail />
      }
    ]
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/" replace />
  // }
]

export default function Router() {
  const elements = useRoutes(routes(false))
  const location = useLocation()
  

  

  return elements
}