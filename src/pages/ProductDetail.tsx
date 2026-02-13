import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="product-detail product-detail--missing">
        <p>Product not found.</p>
        <Link to="/shop">Back to shop</Link>
      </div>
    );
  }

  const showSpecialPrice = product.isOnSpecial || product.isOnPromotion;

  const handleAddToCart = () => {
    addItem(product.id, 1);
    setAdded(true);
  };

  return (
    <div className="product-detail">
      <div className="product-detail__grid">
        <div className="product-detail__media">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-detail__image"
          />
          <div className="product-detail__badges">
            {product.isNew && (
              <span className="product-detail__badge product-detail__badge--new">NEW</span>
            )}
            {(product.isOnSpecial || product.isOnPromotion) && (
              <span
                className={`product-detail__badge product-detail__badge--tag ${
                  product.isOnPromotion ? "product-detail__badge--promo" : "product-detail__badge--special"
                }`}
              >
                {product.isOnPromotion ? "PROMO" : "SPECIAL"}
              </span>
            )}
          </div>
        </div>
        <div className="product-detail__info">
          <p className="product-detail__category">{product.category}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p
            className={`product-detail__price ${
              showSpecialPrice ? "product-detail__price--special" : ""
            } ${product.isOnPromotion ? "product-detail__price--promo" : ""}`}
          >
            {formatPrice(product.price)}
          </p>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__actions">
            <button
              type="button"
              className="product-detail__add"
              onClick={handleAddToCart}
            >
              {added ? "Added to bag" : "Add to bag"}
            </button>
            {added && (
              <Link to="/cart" className="product-detail__view-cart">
                View bag
              </Link>
            )}
          </div>
          <Link to="/shop" className="product-detail__back">← Back to shop</Link>
        </div>
      </div>
    </div>
  );
}
