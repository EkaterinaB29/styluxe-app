import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import banner from "../images/bedroom.png";
import Footer from "../components/Footer.jsx";
import image1 from "../images/pexels-pixabay-462235.jpg";
import "../css/CreatePostPage.css";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "You must be logged in to create a post. Please register or log in."
        );
        setMessage("");
        console.log("No token found in local storage.");
        return;
      }

      console.log("Token found:", token);

      const response = await axios.post(
        "http://88.200.63.148:8211/api/posts/",
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setMessage("Post created successfully!");
        setError("");
        console.log("Post created successfully.");

        // Redirect to the Blog Page after 2 seconds
        navigate("/posts");
      } else {
        setError("There was an error creating your post. Please try again.");
        setMessage("");
        console.error("Error response:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setError("There was an error creating your post. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="create-post-page">
      <NavBar />
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
      <h1>Create a New Post</h1>
      <div className="content">
        <div className="quote">
          <p>
            <span className="quote-symbol">“</span>I like an interior that
            defies labeling. I don't really want someone to walk into a room and
            know that I did it
            <span className="quote-symbol">”</span>
          </p>
          <p className="author">- Bunny Williams</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <label>Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />

            <button type="submit">Create Post</button>
          </form>

          <div className="form-image">
            <img src={image1} alt="Decor" />
          </div>
        </div>
        {message && <div className="success-message centered">{message}</div>}
        {error && (
          <div className="error-message centered">
            {error} <a href="/register">Join the community</a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreatePostPage;
