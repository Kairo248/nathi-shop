import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const newArrivals = products.filter((p) => p.isNew);

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__eyebrow">Boutique Salon</p>
          <h1 className="hero__title">
            Beauty, refined.
          </h1>
          <p className="hero__subtitle">
            Curated hair, skin & nail care for the modern ritual.
          </p>
          <Link to="/shop" className="hero__cta">
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="new-arrivals">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <Link to="/shop" className="section-link">View all</Link>
        </div>
        <div className="new-arrivals__scroll" role="region" aria-label="New arrivals carousel">
          <div className="new-arrivals__track">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
