// Displays all items added to the cart.
// Calculates total price and GST for checkout view.

import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  if (items.length === 0) {
    return <h2>Your cart is empty 🛒</h2>;
  }

  const subtotal = items.reduce(
    (a, i) => a + i.price * i.quantity,
    0
  );

  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  return (
    <div>
      <h2>Cart</h2>

      {items.map((i) => (
        <div key={i.id}>
          {i.title} x {i.quantity}

          <button onClick={() => dispatch(removeCart(i.id))}>
            Remove
          </button>
        </div>
      ))}

      <hr />

      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>GST: ${gst.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>

      <button onClick={() => alert("Checkout Success 🚀")}>
        Checkout
      </button>
    </div>
  );
}