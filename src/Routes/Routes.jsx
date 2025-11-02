import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Root from "../layouts/Root";
import AllProducts from "../components/AllProducts/AllProducts";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import MyProducts from "../components/MyProducts/MyProducts";

import PrivateRoute from "./PrivateRoute";
import MyBids from "../components/MyBids/MyBids";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
