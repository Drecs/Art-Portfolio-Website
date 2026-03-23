import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import bgImage from "../assets/backgroundimage.jpg";
import { toast } from "react-toastify";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ===== Signup state =====
  const [suUsername, setSuUsername] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");

  // ===== SIGNUP HANDLER =====
  const handleSignup = async () => {
    //  Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(suEmail)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!suUsername || !suEmail || !suPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: suUsername,
          email: suEmail,
          password: suPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Signup successful");

      setShowSignUp(false);
      setSuUsername("");
      setSuEmail("");
      setSuPassword("");

    } catch (err) {
      toast.error("Server unreachable. Try again later.");
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      toast.success("Welcome back!");

      // close modal
      setShowLogin(false);

      // clear login and signup inputs
      setLoginEmail("");
      setLoginPassword("");
      setSuUsername("");
      setSuEmail("");
      setSuPassword("");

    } catch (error) {
      toast.error("Server unreachable");
      console.error(error);
    }
  };

  const clearLoginFields = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSuUsername("");
    setSuEmail("");
    setSuPassword("");
  };

  return (
    <div className="landing-page" style={{ backgroundImage: `url(${bgImage})` }}>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="brand">LokinMedia</h1>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/portfolios">Portfolios</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <button className="login-button" onClick={() => setShowLogin(true)}>Log In</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-card">
          <h2>Welcome to Our Website</h2>
          <p>A Platform where people can display their skills and art</p>
          <button className="cta-button" onClick={() => setShowSignUp(true)}>Get Started</button>
        </div>
      </section>

      {/* ================= LOGIN POPUP ================= */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => { setShowLogin(false); clearLoginFields(); }}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="modal-btn" onClick={handleLogin}>
              Log In
            </button>
            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={() => { setShowLogin(false); setShowSignUp(true); clearLoginFields(); }}
                style={{ cursor: "pointer", color: "#646cff", fontWeight: "bold" }}>
                Sign Up
              </span>
            </p>
            <button
              className="close-btn"
              onClick={() => {
                setShowLogin(false);
                clearLoginFields();
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ================= SIGNUP POPUP ================= */}
      {showSignUp && (
        <div className="modal-overlay" onClick={() =>
          setShowLogin(false)
        }>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Sign Up</h2>

            <input
              type="text"
              placeholder="Username"
              value={suUsername}
              onChange={(e) => setSuUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={suEmail}
              onChange={(e) => setSuEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={suPassword}
              onChange={(e) => setSuPassword(e.target.value)}
            />

            <button className="modal-btn" onClick={handleSignup}>
              Sign Up
            </button>

            <button className="close-btn" onClick={() => { setShowSignUp(false); clearLoginFields(); }}>
              ✖
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
