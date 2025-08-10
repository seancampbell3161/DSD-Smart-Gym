// src/pages/CafeOrdering.tsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

import ApiHandler from "../utils/ApiHandler";
import { startStripeCheckout } from "../utils/payments";

import ProteinShake from "../assets/SG_ProteinShake.png";
import ColdBrew from "../assets/SG_ColdBrew.png";
import EnergyBar from "../assets/SG_EnergyBar.png";
import FruitCup from "../assets/SG_FruitCup.png";
import CafeHero from "../assets/SG_Cafe_Hero.png";
import ReceiptModal from "../components/Modal/ReceiptModal";

import "../styles/CafeOrdering.css";

interface CafeItem {
  _id: string;
  item_name: string;
  quantity: number;
  price: number;
}

interface CartItem extends CafeItem {
  quantityOrdered: number;
}

const IMAGE_MAP: Record<string, string> = {
  "protein shake": ProteinShake,
  "cold brew coffee": ColdBrew,
  "fruit cup": FruitCup,
  "energy bar": EnergyBar,
};

function getImageForItem(name: string): string | undefined {
  return IMAGE_MAP[name.trim().toLowerCase()];
}

// 🔑 separate keys so the browsing cart can't clobber the checkout snapshot
const CART_KEY = "smartGymCart";
const SNAPSHOT_KEY = "smartGymCartSnapshot";

const CafeOrdering: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSuccess = params.get("checkout") === "success";

  // Don't rehydrate cart on success return
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      if (search.get("checkout") === "success") return [];
    }
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [cafeItems, setCafeItems] = useState<CafeItem[]>([]);
  const [receiptCart, setReceiptCart] = useState<CartItem[]>([]);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const finalizedRef = useRef(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await ApiHandler.get("/cafe-inventory");
      setCafeItems(data?.data || []);
      console.log("📦 Current inventory from DB:", data?.data);
    } catch (err: any) {
      setMessage("Failed to load inventory: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Keep browsing cart synced (this never touches the snapshot key)
  useEffect(() => {
    if (showReceipt) return; // don't resave while viewing receipt
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, showReceipt]);

  // ✅ On success: read SNAPSHOT first; then clear everything and show receipt
  // ✅ On success: read SNAPSHOT first; then clear everything and show receipt
useEffect(() => {
  if (!isSuccess || finalizedRef.current) return;
  finalizedRef.current = true;

  const storedSnap = localStorage.getItem(SNAPSHOT_KEY);
  const parsedCart: CartItem[] = storedSnap ? JSON.parse(storedSnap) : [];

  const fallbackTotal = parsedCart.reduce(
    (sum, item) => sum + item.price * item.quantityOrdered,
    0
  );

  const finalize = async () => {
    try {
      const res = await ApiHandler.post("/cafe-inventory/checkout-success", {
        cart: parsedCart,
        total: fallbackTotal,
      });

      setReceiptCart(res.data?.items ?? parsedCart);
      setReceiptTotal(res.data?.total ?? fallbackTotal);

      // ✅ Immediately update inventory in UI
      if (res.data?.updatedInventory) {
        setCafeItems(res.data.updatedInventory);
      }
    } catch {
      // fall back to snapshot
      setReceiptCart(parsedCart);
      setReceiptTotal(fallbackTotal);
    } finally {
      setShowReceipt(true);
      setCart([]);
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(SNAPSHOT_KEY);
      // clean URL so effect won't re-run
      window.history.replaceState({}, document.title, location.pathname);
    }
  };

  finalize();
}, [isSuccess, location.pathname]);

  const addToCart = useCallback((item: CafeItem) => {
    if (item.quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantityOrdered: i.quantityOrdered + 1 } : i
        );
      }
      return [...prev, { ...item, quantityOrdered: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantityOrdered, 0),
    [cart]
  );

  // Save a dedicated snapshot right before redirecting to Stripe
  const handleCheckout = useCallback(() => {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(cart));
    // (optional) also keep the normal cart in case user cancels
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    startStripeCheckout(cart);
  }, [cart]);

  return (
    <>
      <section
        className="cafe-hero full-bleed"
        style={{ backgroundImage: `url(${CafeHero})` }}
        aria-label="Smart Gym Café hero"
      >
        <div className="cafe-hero-overlay">
          <h1 className="cafe-hero-title">SMART GYM CAFÉ</h1>
          <p className="cafe-hero-sub">Fuel your workout with clean energy</p>
        </div>
      </section>

      <div className="cafe-page">
        <div className="cafe-container">
          {loading && <p className="loading-text">Loading inventory...</p>}
          {message && <p className="error-text">{message}</p>}

          <div className="cafe-list-rows">
            {cafeItems.map((item) => {
              const imageSrc = getImageForItem(item.item_name);
              const outOfStock = item.quantity <= 0;

              return (
                <div key={item._id} className="cafe-row-line">
                  {imageSrc && (
                    <img src={imageSrc} alt={item.item_name} className="line-image" />
                  )}
                  <div className="line-details">
                    <div className="line-top">
                      <h3 className="item-name">{item.item_name.toUpperCase()}</h3>
                      <div className="price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="stock">In Stock: {item.quantity}</div>
                    <button
                      onClick={() => addToCart(item)}
                      className="add-to-cart-button"
                      disabled={outOfStock}
                      aria-disabled={outOfStock}
                    >
                      {outOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hide cart while receipt is visible */}
          {!showReceipt && cart.length > 0 && (
            <div className="cart-section">
              <h3 className="cart-title">🛒 Your Cart</h3>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item._id} className="cart-line">
                    <span className="cart-name">{item.item_name.toUpperCase()}</span>
                    <span className="cart-mult">x {item.quantityOrdered}</span>
                    <span className="cart-price-wrapper">
                      <span className="cart-price">
                        ${(item.price * item.quantityOrdered).toFixed(2)}
                      </span>
                      <span
                        className="cart-remove-x"
                        onClick={() => removeFromCart(item._id)}
                        role="button"
                      >
                        ×
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Total:</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>

              <button className="checkout-button" onClick={handleCheckout}>
                Checkout with Stripe
              </button>
            </div>
          )}
        </div>
      </div>

      {showReceipt && (
        <ReceiptModal
          cart={receiptCart}
          total={receiptTotal}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </>
  );
};

export default CafeOrdering;
