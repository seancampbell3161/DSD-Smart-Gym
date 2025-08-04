import React, { useEffect, useState, useCallback } from "react";
import ApiHandler from "../utils/ApiHandler";
import ProteinShake from "../assets/SG_ProteinShake.png";
import ColdBrew from "../assets/SG_ColdBrew.png";
import EnergyBar from "../assets/SG_Energy.png";
import FruitCup from "../assets/SG_FruitCup.png";
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

const CafeOrdering: React.FC = () => {
  const [cafeItems, setCafeItems] = useState<CafeItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await ApiHandler.get("/api/cafe-inventory");
      setCafeItems(data.data);
    } catch (err: any) {
      setMessage("Failed to load inventory: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addToCart = useCallback((item: CafeItem) => {
    if (item.quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantityOrdered: i.quantityOrdered + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, quantityOrdered: 1 }];
      }
    });
  }, []);

  return (
    <div className="cafe-container">
      <h1 className="cafe-title">☕ Cafe Menu</h1>

      {loading && <p className="loading-text">Loading inventory...</p>}
      {message && <p className="error-text">{message}</p>}

      <div className="cafe-grid">
        {cafeItems.map((item) => {
          let imageSrc;
          if (item.item_name === "protein shake") {
            imageSrc = ProteinShake;
          } else if (item.item_name === "cold Brew") {
            imageSrc = ColdBrew; 
          } else if (item.item_name === "fruit cup") {
            imageSrc = FruitCup;
          } else if (item.item_name === "energy bar") {
            imageSrc = EnergyBar;
          }

          return (
            <div key={item._id} className="cafe-item-card">
              <div className="item-details">
                <h3 className="item-name">{item.item_name.toUpperCase()}</h3>
                <p className="item-detail">Price: ${item.price.toFixed(2)}</p>
                <p className="item-detail">In Stock: {item.quantity}</p>
              </div>
              {imageSrc && (
                <img src={imageSrc} alt={item.item_name} className="item-image" />
              )}
              <button
                onClick={() => addToCart(item)}
                className="add-to-cart-button"
                disabled={item.quantity <= 0}
              >
                {item.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <h2 className="cart-title">🛒 Your Cart</h2>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item._id}>
                {item.item_name} x {item.quantityOrdered}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CafeOrdering;
