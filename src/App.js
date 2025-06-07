import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
//import Dashboard from "./pages/Dashboard";
import StockList from "./pages/StockList";
import Watchlist from "./pages/WatchList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<StockList />} />
        <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
    </Router>
  );
}

export default App;
