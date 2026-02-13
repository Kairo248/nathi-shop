import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/currency";
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "compact";
};

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const showSpecialPrice = product.isOnSpecial || product.isOnPromotion;

  return (
    <article className={`product-card product-card--${variant}`}>
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrap">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          {product.isNew && (
            <span className="product-card__badge product-card__badge--new" aria-hidden>
              NEW
            </span>
          )}
          {(product.isOnSpecial || product.isOnPromotion) && (
            <span
              className={`product-card__badge product-card__badge--tag ${
                product.isOnPromotion ? "product-card__badge--promo" : "product-card__badge--special"
              }`}
              aria-hidden
            >
              {product.isOnPromotion ? "PROMO" : "SPECIAL"}
            </span>
          )}
        </div>
        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p
            className={`product-card__price ${showSpecialPrice ? "product-card__price--special" : ""} ${
              product.isOnPromotion ? "product-card__price--promo" : ""
            }`}
          >
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
