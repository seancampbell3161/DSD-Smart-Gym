// src/components/Modal/ReceiptModal.tsx
import React from "react";
import "../../styles/ReceiptModal.css";

interface CartItem {
  _id: string;
  item_name: string;
  price: number;
  quantityOrdered: number;
}

interface ReceiptModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ cart, total, onClose }) => {
  return (
    <div className="receipt-modal">
      <div className="receipt-content">
        <h2>🧾 Smart Gym Café Receipt</h2>
        <ul className="receipt-list">
          {cart.map((item) => (
            <li key={item._id}>
              <span>{item.item_name}</span>
              <span>x{item.quantityOrdered}</span>
              <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="receipt-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>
        <button className="receipt-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
