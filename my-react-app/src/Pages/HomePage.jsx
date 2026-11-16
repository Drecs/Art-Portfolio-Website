
import React, { useState } from "react";
import Layout from "./Layout";
import "../index.css";
import { toast } from "react-toastify";

export default function HomePage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const resetPostForm = () => {
    setDescription("");
    setImages([]);
  };

  const closePostModal = () => {
    setShowCreatePost(false);
    resetPostForm();
  };

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login before creating a post.");
        return;
      }

      if (!description.trim()) {
        toast.error("Please enter a post description.");
        return;
      }

      const formData = new FormData();

      formData.append("description", description);

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Your session has expired. Please login again.");
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Failed to create post.");
        return;
      }

      toast.success("Post created successfully!");

      closePostModal();

    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Unable to connect to the server.");
    }
  };

  return (
    <Layout>
      <div className="home-page">
        <div className="home-container">
          {/* CREATE POST CARD */}
          <div className="post-card create-post-card">
            <h3 className="create-post-title">Create Post</h3>

            <p className="create-post-description">
              Share your creativity and showcase your work
            </p>

            <button
              className="create-post-button"
              onClick={() => setShowCreatePost(true)}
              aria-label="Create a post"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {showCreatePost && (
        <div
          className="portfolio-modal-overlay"
          onClick={closePostModal}
        >
          <div
            className="portfolio-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="modal-header">
              <h2>Create a Post</h2>
            </div>

            {/* FORM */}
            <div className="modal-body">
              <div className="form-group">
                <label>Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setImages(Array.from(e.target.files));
                  }}
                />

                {images.length > 0 && (
                  <div className="preview-grid">
                    {images.map((file, index) => (
                      <img
                        key={`${file.name}-${index}`}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="preview-img"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write something about your post..."
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                className="create-btn-large"
                onClick={handleCreatePost}
              >
                Create Post
              </button>

              <button
                className="cancel-btn"
                onClick={closePostModal}
              >
                Cancel
              </button>
            </div>

            {/* CLOSE BUTTON */}
            <button
              className="close-btn"
              onClick={closePostModal}
              aria-label="Close modal"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
