import React from "react";
import Layout from "./Layout"; 
import "../App.css"; 

export default function About() {
  return (
    <Layout>
      <div className="about-container">
        {/* About Us Section */}
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            LokinMedia is a platform where creativity meets innovation. We provide a space for artists, designers, and content creators to showcase their talents. 
            Our mission is to connect people with their passions and bring their ideas to life through exceptional design, editorial expertise, and leisure activities.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-cards">
            {/* Design Card */}
            <div className="service-card">
              <h3>Design</h3>
              <ul>
                <li>Graphic Design</li>
                <li>UI/UX Design</li>
                <li>Branding</li>
                <li>Illustration</li>
                <li>Motion Graphics</li>
                <li>Web Design</li>
              </ul>
            </div>

            {/* Editorial Card */}
            <div className="service-card">
              <h3>Editorial</h3>
              <ul>
                <li>Content Writing</li>
                <li>Copy Editing</li>
                <li>Proofreading</li>
                <li>Blog Management</li>
                <li>Magazine Design</li>
                <li>Publishing</li>
              </ul>
            </div>

            {/* Leisure Card */}
            <div className="service-card">
              <h3>Leisure</h3>
              <ul>
                <li>Photography</li>
                <li>Videography</li>
                <li>Music Production</li>
                <li>Podcasting</li>
                <li>Event Coverage</li>
                <li>Art Exhibitions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
