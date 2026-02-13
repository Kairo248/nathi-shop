import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { formatPrice } from "../utils/currency";
import "./Cart.css";

export default function Cart() {
  const { items, removeItem, updateQuantity, itemCount } = useCart();

  const lineItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean) as { product: (typeof products)[0]; quantity: number }[];

  const subtotal = lineItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  if (itemCount === 0) {
    return (
      <div className="cart cart--empty">
        <h1 className="cart__title">Your bag</h1>
        <p className="cart__empty-text">Your bag is empty.</p>
        <Link to="/shop" className="cart__empty-cta">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Your bag</h1>

      <div className="cart__content">
        <ul className="cart__list">
          {lineItems.map(({ product, quantity }) => (
            <li key={product.id} className="cart-item">
              <Link to={`/product/${product.id}`} className="cart-item__image-link">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="cart-item__image"
                />
              </Link>
              <div className="cart-item__details">
                <Link to={`/product/${product.id}`} className="cart-item__name">
                  {product.name}
                </Link>
                <p className="cart-item__category">{product.category}</p>
                <p className="cart-item__price">{formatPrice(product.price)}</p>
                <div className="cart-item__actions">
                  <div className="cart-item__qty">
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-item__qty-value">{quantity}</span>
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeItem(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="cart-item__line-total">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="cart__summary">
          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="cart__summary-note">
            Shipping and taxes calculated at checkout.
          </p>
          <Link to="/checkout" className="cart__checkout-btn">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="cart__continue">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
