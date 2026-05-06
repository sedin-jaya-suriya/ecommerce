

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearch, setCategory, setView } from "../features/ui/uiSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const cartCount = useSelector((s) =>
    s.cart.items.reduce((a, i) => a + i.quantity, 0)
  );

  return (
    <nav className="nav">
      <Link to="/">Home</Link>

      <input
        placeholder="Search..."
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <select onChange={(e) => dispatch(setCategory(e.target.value))}>
        <option value="all">All</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
        <option value="jewelery">Jewelry</option>
        <option value="electronics">Electronics</option>
      </select>

      <button onClick={() => dispatch(setView("grid"))}>Grid</button>
      <button onClick={() => dispatch(setView("list"))}>List</button>

      <Link to="/cart">Cart ({cartCount})</Link>
    </nav>
  );
}