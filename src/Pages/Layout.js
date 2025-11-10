import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Layout({ children }) {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="brand">LokinMedia</h1>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/portfolios">Portfolios</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <button className="login-button">Log In</button>
      </nav>

      {/* Render the children pages */}
      <main>{children}</main>
    </div>
  );
}
