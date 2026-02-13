import { useMemo, useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import "./ShopAll.css";

type CategoryFilter = "All" | Product["category"];

const categories: CategoryFilter[] = ["All", "Hair", "Skin", "Nails"];

export default function ShopAll() {
  const [category, setCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="shop">
      <header className="shop__header">
        <h1 className="shop__title">Shop All</h1>
        <p className="shop__subtitle">Hair, skin & nails — curated for your ritual.</p>
      </header>

      <div className="shop__filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`shop__filter ${category === c ? "shop__filter--active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="shop__grid" role="list">
        {filtered.map((product) => (
          <div key={product.id} role="listitem">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="shop__empty">No products in this category.</p>
      )}
    </div>
  );
}
