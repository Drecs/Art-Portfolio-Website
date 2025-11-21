import React from "react";
import Layout from "./Layout";
import "../index.css";

export default function Portfolio() {
  // Sample portfolio data
  const portfolio = {
    id: 1,
    name: "John Doe",
    profilePic: "https://via.placeholder.com/50", // Sample profile image
    description: "A passionate photographer and graphic designer. Check out my latest works!",
  };

  return (
    <Layout>

      {/* Portfolio Section */}
      <div className="portfolio-container">
        {/* Create New Portfolio Card */}
        <div className="portfolio-card create-portfolio">
          <h2>Create a New Portfolio</h2>
          <button className="create-btn">+</button>
        </div>

        {/* Existing Portfolio Card */}
        <div className="portfolio-card">
          <div className="portfolio-header">
            <img src={portfolio.profilePic} alt="Profile" className="portfolio-profile-pic" />
            <div className="portfolio-info">
              <h3>{portfolio.name}</h3>
            </div>
          </div>
          <p className="portfolio-description">{portfolio.description}</p>
        </div>
      </div>
    </Layout>
  );
}
