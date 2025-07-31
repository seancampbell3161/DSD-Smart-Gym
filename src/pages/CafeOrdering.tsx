import React, { useEffect, useState } from "react";

interface CafeItem {
  _id: string;
  item_name: string;
  quantity: number;
  price: number;
}

const CafeOrdering: React.FC = () => {
  const [items, setItems] = useState<CafeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("❌ No auth token found.");
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/cafe-inventory`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok) {
          console.error("Fetch failed:", json);
          setMessage("❌ " + (json?.error || "Fetch failed"));
        } else {
          setItems(json.data || []);
          setMessage(""); // clear if successful
        }
      } catch (err) {
        console.error("Network error:", err);
        setMessage("❌ Network error or server not running");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const placeOrder = async (itemId: string) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cafe-inventory/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id: itemId, quantity: 1 }),
      });

      if (res.ok) {
        setMessage("✅ Order placed successfully!");
      } else {
        const error = await res.text();
        setMessage(`❌ Order failed: ${error}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      setMessage("❌ An error occurred while placing the order.");
    }
  };

  if (loading) return <p>Loading café menu...</p>;

  return (
    <div>
      <h2>Café Ordering</h2>
      {message && <p>{message}</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id} style={{ marginBottom: "1rem" }}>
            <strong>{item.item_name}</strong> – ${item.price.toFixed(2)} <br />
            In stock: {item.quantity} <br />
            <button
              onClick={() => placeOrder(item._id)}
              disabled={item.quantity === 0}
            >
              {item.quantity > 0 ? "Order" : "Sold Out"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CafeOrdering;
