import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { RouterProvider } from "react-router";
import router from "./routers";
import { AuthContextProvider } from "./components/contexts/AuthContextProvider";
import { CartContextProvider } from "./components/contexts/CartContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
