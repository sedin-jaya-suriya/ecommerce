
import { useDispatch } from "react-redux";
import { addCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const stockStatus =
    product.stock > 5
      ? "In stock"
      : product.stock >= 2
        ? "Only a few left"
        : product.stock === 1
          ? "Only 1 left"
          : "Unavailable";

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} width={100} />
        <h4>{product.title}</h4>
      </Link>

      <p>${product.price}</p>
      <p>{stockStatus}</p>

      <button
        disabled={product.stock === 0}
        onClick={() =>
          dispatch(addCart({ product, qty: 1 }))
        }
      >
        Add
      </button>
    </div>
  );
}