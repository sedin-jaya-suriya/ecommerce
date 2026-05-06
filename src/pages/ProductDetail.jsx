// Shows detailed information of a single product.
// Uses route parameter to fetch and display specific product data.
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();

  const product = useSelector((s) =>
    s.products.items.find((p) => p.id === Number(id))
  );

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} width={200} />
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}