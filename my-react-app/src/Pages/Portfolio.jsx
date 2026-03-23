import React, { useState } from "react";
import Layout from "./Layout";
import "../index.css";
import { toast } from "react-toastify";

export default function Portfolio() {

  // ===== AUTH STATE (reuse logic) =====
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  // ===== CREATE PORTFOLIO STATE =====
  const [showCreatePortfolio, setShowCreatePortfolio] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [samples, setSamples] = useState([]);

  // ===== HANDLE CREATE CLICK =====
  const handleCreateClick = () => {
    if (!isLoggedIn()) {
      toast.info("Please login first");
      setShowLogin(true);
      return;
    }

    setShowCreatePortfolio(true);
  };

  // ===== CLEAR FORM INPUTS =====
  const resetPortfolioForm = () => {
    setTitle("");
    setDescription("");
    setProfilePic(null);
    setSamples([]);
  };



  // ===== CREATE PORTFOLIO =====
  const handleCreatePortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("profilePic", profilePic);

      samples.forEach((file) => {
        formData.append("samples", file);
      });

      const res = await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create portfolio");
        return;
      }

      toast.success("Portfolio created!");
      setShowCreatePortfolio(false);

    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="portfolio-page">
        <div className="portfolio-container">

          {/* CREATE CARD */}
          <div className="portfolio-card create-portfolio">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="big-profile-pic"
            />
            <h3 className="portfolio-name">Create Portfolio</h3>
            <p className="portfolio-description">
              Showcase your creative work
            </p>
            <button className="create-btn" onClick={handleCreateClick}>
              +
            </button>
          </div>

        </div>
      </div>

      {/* ================= LOGIN MODAL ================= */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login Required</h2>

            <p style={{ marginBottom: "1rem" }}>
              You must login to create a portfolio
            </p>

            <button
              className="modal-btn"
              onClick={() => {
                setShowLogin(false);
                setShowSignUp(true);
              }}
            >
              Go to Sign Up
            </button>

            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ================= SIGNUP MODAL ================= */}
      {showSignUp && (
        <div className="modal-overlay" onClick={() => setShowSignUp(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Sign Up</h2>
            <p>Create an account from the homepage</p>

            <button
              className="modal-btn"
              onClick={() => {
                setShowSignUp(false);
                window.location.href = "/";
              }}
            >
              Go to Homepage
            </button>

            <button className="close-btn" onClick={() => setShowSignUp(false)}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ================= CREATE PORTFOLIO MODAL ================= */}
      {showCreatePortfolio && (
        <div
          className="portfolio-modal-overlay"
          onClick={() => {
            setShowCreatePortfolio(false);
            resetPortfolioForm();
          }}
        >
          <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>

            {/* HEADER (fixed) */}
            <div className="modal-header">
              <h2>Create Your Portfolio</h2>
            </div>

            {/* SCROLLABLE FORM */}
            <div className="modal-body">

              <div className="form-group">
                <label>Portfolio Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />

                {profilePic && (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="preview"
                    className="preview-img"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Sample Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setSamples(files);
                  }}
                />

                {samples.length > 0 && (
                  <div className="preview-grid">
                    {samples.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="preview-img"
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* FOOTER (fixed) */}
            <div className="modal-footer">
              <button className="create-btn-large" onClick={handleCreatePortfolio}>
                Create Portfolio
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowCreatePortfolio(false);
                  resetPortfolioForm();
                }}
              >
                Cancel
              </button>
            </div>

            <button
              className="close-btn"
              onClick={() => {
                setShowCreatePortfolio(false);
                resetPortfolioForm();
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}

    </Layout>
  );
}