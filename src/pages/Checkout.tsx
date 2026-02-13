import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { formatPrice } from "../utils/currency";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, itemCount } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/checkout/confirmation", {
      state: {
        order: {
          ...form,
          items: lineItems,
          subtotal,
        },
      },
    });
  };

  if (itemCount === 0 && !lineItems.length) {
    return (
      <div className="checkout checkout--empty">
        <h1 className="checkout__title">Checkout</h1>
        <p>Your cart is empty.</p>
        <button
          type="button"
          className="checkout__back"
          onClick={() => navigate("/shop")}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Checkout</h1>

      <form className="checkout__form" onSubmit={handleSubmit}>
        <div className="checkout__grid">
          <section className="checkout__section">
            <h2 className="checkout__section-title">Contact & shipping</h2>
            <div className="checkout__fields">
              <label className="checkout__label">
                Full name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="checkout__input"
                  autoComplete="name"
                />
              </label>
              <label className="checkout__label">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="checkout__input"
                  autoComplete="email"
                />
              </label>
              <label className="checkout__label">
                Address
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="checkout__input"
                  autoComplete="street-address"
                />
              </label>
              <div className="checkout__row">
                <label className="checkout__label">
                  City
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="checkout__input"
                    autoComplete="address-level2"
                  />
                </label>
                <label className="checkout__label">
                  Postal code
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    className="checkout__input"
                    autoComplete="postal-code"
                  />
                </label>
              </div>
              <label className="checkout__label">
                Country
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="checkout__input"
                  autoComplete="country-name"
                />
              </label>
            </div>
          </section>

          <aside className="checkout__order">
            <h2 className="checkout__section-title">Order summary</h2>
            <ul className="checkout__items">
              {lineItems.map(({ product, quantity }) => (
                <li key={product.id} className="checkout__item">
                  <span className="checkout__item-name">
                    {product.name} × {quantity}
                  </span>
                  <span className="checkout__item-total">
                    {formatPrice(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="checkout__total-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="checkout__note">
              This is a demo. No payment is collected.
            </p>
            <button type="submit" className="checkout__submit">
              Place order
            </button>
          </aside>
        </div>
      </form>
    </div>
  );
}
