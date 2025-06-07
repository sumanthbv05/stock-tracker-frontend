import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://stock-tracker-backend-162a.onrender.com";

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/stocks-data`)
      .then(res => setStocks(res.data))
      .catch(err => console.error("Error loading stocks:", err));
  }, []);

  const addToWatchlist = (stock) => {
    const isUp = stock.initial_price >= stock.price_2007;

    axios.post(`${BASE_URL}/api/watchlist`, {
      symbol: stock.symbol,
      name: stock.company,
      price: stock.initial_price,
      status: isUp ? "up" : "down"
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => alert(`${stock.symbol} added!`))
      .catch(console.error);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Stocks</h2>
      {stocks.map(s => {
        const isUp = s.initial_price >= s.price_2007;
        return (
          <div key={s.symbol} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0097a7",
            padding: "12px 20px",
            marginBottom: "8px",
            borderRadius: "6px",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
            {/* Company Info */}
            <div style={{ flex: 1, fontWeight: 500 }}>
              {s.company} ({s.symbol})
            </div>

            {/* Price */}
            <div style={{
              flex: 1,
              textAlign: "center",
              color: isUp ? "#00ff00" : "#ff0000",
              fontWeight: 700,
              fontSize: "1.1rem"
            }}>
              ₹{s.initial_price.toFixed(2)}
            </div>

            {/* Button */}
            <div style={{ flex: 1, textAlign: "right" }}>
              <button
                onClick={() => addToWatchlist(s)}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0097a7",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s ease"
                }}
                onMouseOver={e => e.target.style.backgroundColor = "#b2ebf2"}
                onMouseOut={e => e.target.style.backgroundColor = "#ffffff"}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StockList;
