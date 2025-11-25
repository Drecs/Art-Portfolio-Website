import React from "react";
import Layout from "./Layout";
import "../index.css";

export default function HomePage() {
  // Sample posts data
  const posts = [
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://via.placeholder.com/50", // Sample profile image
      postImage: "https://via.placeholder.com/300", // Sample post image
      description: "This is a sample post description. Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://via.placeholder.com/50",
      postImage: "https://via.placeholder.com/300",
      description: "Another post description goes here. Lorem ipsum dolor sit.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      profilePic: "https://via.placeholder.com/50",
      postImage: "https://via.placeholder.com/300",
      description: "Here is a description of Emily's post. A simple demo post.",
    },
  ];

  return (
    <Layout>
      <div className="home-page">
        <div className="home-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="profile-section">
                <img src={post.profilePic} className="profile-pic" />
                <span className="profile-name">{post.name}</span>
              </div>

              <img src={post.postImage} className="post-image" />

              <div className="post-description">{post.description}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>

  );

}

