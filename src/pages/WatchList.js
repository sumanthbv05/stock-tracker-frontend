import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("https://stock-tracker-backend-162a.onrender.com/api/watchlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWatchlist(res.data);
    } catch (err) {
      console.error("Error fetching watchlist", err);
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      await axios.delete(`https://stock-tracker-backend-162a.onrender.com/api/watchlist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWatchlist(watchlist.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing stock", err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="watchlist-container">
        <h2 className="watchlist-title">📈 My Watchlist</h2>

        {watchlist.length === 0 ? (
            <p className="empty-text">No stocks added to watchlist yet.</p>
        ) : (
            <ul className="watchlist-list">
                {watchlist.map((stock) => (
                    <li key={stock._id} className="watchlist-item">
                        <div className="stock-symbol">
                            <strong>{stock.symbol}</strong>
                        </div>
                        <div className="stock-price">
                            <span
                                className={`stock-change ${stock.status === "up" ? "stock-up" : "stock-down"}`}
                            >
                                ₹{stock.price}
                            </span>
                        </div>
                        <div className="stock-remove">
                            <button
                                className="remove-btn"
                                onClick={() => removeFromWatchlist(stock._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );

};

export default Watchlist;
