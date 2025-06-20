import { createBrowserRouter } from "react-router";
import App from "../pages/App";
import Profile from "../pages/Profile";
import Layout from "../Layout";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../components/NotFound";
import Register from "../pages/Register";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Register,
      },
      {
        path: "/product/:id",
        Component: ProductDetail,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
