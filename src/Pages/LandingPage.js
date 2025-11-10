import React from "react";
import { Link } from "react-router-dom"; 
import "../App.css"; 

export default function LandingPage() {
  return (
    <div className="landing-page">
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

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to Our Website</h2>
        <p>A Platform where people can display their skills and art</p>
        <Link to="/home">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>
    </div>
  );
}
