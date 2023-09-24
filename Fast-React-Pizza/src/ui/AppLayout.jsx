import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../Features/cart/CartOverview";
import Loader from "./Loader";

export default function AppLayout() {
  const isLoading = useNavigation().state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Outlet /> is a special component that renders the child route's element. */}
      <CartOverview />
    </div>
  );
}
