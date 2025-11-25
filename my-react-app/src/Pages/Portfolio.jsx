import React from "react";
import Layout from "./Layout";
import "../index.css";

export default function Portfolio() {
  const portfolio = {
    id: 1,
    name: "John Doe",
    profilePic: "https://via.placeholder.com/120",  // bigger for top card
    description: "A passionate photographer and graphic designer.",
    samples: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
  };

  return (
    <Layout>
      <div className="portfolio-page">
        <div className="portfolio-container">

          {/* --- CREATE NEW PORTFOLIO CARD --- */}
          <div className="portfolio-card create-portfolio">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile placeholder"
              className="big-profile-pic"
            />
            <h3 className="portfolio-name">John Doe</h3>
            <p className="portfolio-description">
              Create your own portfolio and showcase your creative work.
            </p>
            <button className="create-btn">+</button>
          </div>

          {/* --- EXISTING PORTFOLIO CARD --- */}
          <div className="portfolio-card existing-portfolio">

            {/* Top: Small profile picture left + name */}
            <div className="portfolio-header">
              <img src={portfolio.profilePic} alt="Profile" className="small-profile-pic" />
              <h3 className="existing-title">Photography</h3>
            </div>

            {/* Image preview gallery */}
            <div className="portfolio-gallery">
              {portfolio.samples.map((img, index) => (
                <img key={index} src={img} alt="sample" className="portfolio-sample" />
              ))}
            </div>

            {/* Description */}
            <p className="portfolio-description">{portfolio.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

