import { Link } from "react-router-dom";

import SearchOrder from "../Features/order/SearchOrder";

export default function AppLayout() {
  return (
    <header>
      <Link to="/">FAST REACT PIZZA CO.</Link>
      <SearchOrder />
      <h2>Mina Romany</h2>
    </header>
  );
}
