import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Layout.css";

function ShoppingBagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { itemCount } = useCart();

  return (
    <>
      <header className="nav" role="banner">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            Nathi
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop All</Link>
          </nav>
          <Link to="/cart" className="nav-bag" aria-label={`Shopping bag${itemCount > 0 ? `, ${itemCount} items` : ""}`}>
            <ShoppingBagIcon />
            {itemCount > 0 && (
              <span className="nav-bag-count" aria-hidden>{itemCount}</span>
            )}
          </Link>
        </div>
      </header>
      <main className="main">
        {children ?? <Outlet />}
      </main>
    </>
  );
}
