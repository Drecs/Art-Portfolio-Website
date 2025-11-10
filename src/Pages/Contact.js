import React from "react";
import Layout from "./Layout";
import "../App.css";

export default function Contact() {
  return (
    <Layout>
      <div className="contact-container">
        {/* Contact Information Section */}
        <section className="contact-info">
          <h2>Contact Us</h2>
          <p>Have questions or need assistance? Reach out to us using the form below or via our contact details.</p>
          <div className="contact-details">
            <p><strong>Email:</strong> contact@lokinmedia.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Creative Street, Design City, 56789</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message..." rows="5" required></textarea>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </section>
      </div>
    </Layout>
  );
}
