import { Outlet } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../Features/cart/CartOverview";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Outlet /> is a special component that renders the child route's element. */}
      <CartOverview />
    </>
  );
}
