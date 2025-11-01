import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Root from "../layouts/Root";
import AllProducts from "../components/AllProducts/AllProducts";

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
        path: '/all-products',
        Component: AllProducts,
      }
    ],
  },
]);

export default router;
