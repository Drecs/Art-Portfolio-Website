import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Layout({ children }) {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="main-navbar">
        <div className="navbar-left">
          <h1 className="brand">LokinMedia</h1>
        </div>
        <ul className="nav-links centered-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/portfolios">Portfolios</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Render the children pages */}
      <main>{children}</main>
    </div>
  );
}
