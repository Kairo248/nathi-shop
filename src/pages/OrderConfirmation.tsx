import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/currency";
import "./OrderConfirmation.css";

type OrderState = {
  order: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    items: { product: { name: string; price: number }; quantity: number }[];
    subtotal: number;
  };
};

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state as OrderState | null;
  const order = state?.order;

  if (!order) {
    return (
      <div className="confirmation">
        <h1 className="confirmation__title">Thank you</h1>
        <p className="confirmation__text">
          Your order has been received.
        </p>
        <Link to="/shop" className="confirmation__link">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation">
      <h1 className="confirmation__title">Thank you, {order.name.split(" ")[0]}</h1>
      <p className="confirmation__text">
        Your order has been placed. We’ll send a confirmation to{" "}
        <strong>{order.email}</strong>.
      </p>

      <div className="confirmation__summary">
        <h2 className="confirmation__summary-title">Order summary</h2>
        <ul className="confirmation__items">
          {order.items.map(({ product, quantity }, i) => (
            <li key={i} className="confirmation__item">
              <span>{product.name} × {quantity}</span>
              <span>{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="confirmation__total">
          <span>Total</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <p className="confirmation__shipping">
          Shipping to: {order.address}, {order.city} {order.postalCode}, {order.country}
        </p>
      </div>

      <Link to="/shop" className="confirmation__link">
        Continue shopping
      </Link>
    </div>
  );
}
