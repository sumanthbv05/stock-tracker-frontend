import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">📈 Stock Tracker</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className="nav-link" activeclassname="active" end>
            StockList
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist" className="nav-link" activeclassname="active">
            Watchlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="nav-link" activeclassname="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="nav-link" activeclassname="active">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
