import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  const BASE_URL = "http://localhost:5000";

  const fetchStocks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/stocks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching stocks", err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Add or update stock based on editingId
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingId) {
        // Update existing stock
        const res = await axios.put(
          `${BASE_URL}/api/stocks/${editingId}`,
          {
            symbol,
            buyPrice: Number(buyPrice),
            quantity: Number(quantity),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Stock updated:", res.data);
      } else {
        // Add new stock
        const res = await axios.post(
          `${BASE_URL}/api/stocks`,
          {
            symbol,
            buyPrice: Number(buyPrice),
            quantity: Number(quantity),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Stock added:", res.data);
      }

      // Reset form and refresh stocks
      setSymbol("");
      setBuyPrice("");
      setQuantity("");
      setEditingId(null);
      fetchStocks();
    } catch (err) {
      console.error("❌ Error saving stock", err);
    }
  };

  const handleEdit = (stock) => {
    setSymbol(stock.symbol);
    setBuyPrice(stock.buyPrice);
    setQuantity(stock.quantity);
    setEditingId(stock._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/stocks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchStocks();
    } catch (err) {
      console.error("Error deleting stock", err);
    }
  };

  return (
    <div>
      <h2>My Stock Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          required
        />
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price"
          required
          min="0"
          step="0.01"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          min="1"
        />
        <button type="submit">{editingId ? "Update Stock" : "Add Stock"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setSymbol("");
              setBuyPrice("");
              setQuantity("");
              setEditingId(null);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <ul>
        {stocks.map((stock) => (
          <li key={stock._id}>
            {stock.symbol} — {stock.quantity} shares @ ₹{stock.buyPrice}
            <button onClick={() => handleEdit(stock)}>Edit</button>
            <button onClick={() => handleDelete(stock._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
