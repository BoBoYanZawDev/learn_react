import { createBrowserRouter } from "react-router";
import App from "../pages/App";
import Profile from "../pages/Profile";
import Layout from "../Layout";
import AdminLayout from "../AdminLayout";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../components/NotFound";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import CheckOut from "../pages/CheckOut";

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
        Component: SignIn,
      },
      {
        path: "/checkout",
        Component: CheckOut,
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
