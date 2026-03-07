import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { AdminPanel } from "./pages/admin-panel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/admin",
    Component: AdminPanel,
  },
]);