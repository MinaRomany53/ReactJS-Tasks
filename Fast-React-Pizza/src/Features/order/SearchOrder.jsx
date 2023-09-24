import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  console.log(searchTerm);

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${searchTerm}`);
    setSearchTerm("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order#"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
