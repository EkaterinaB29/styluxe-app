import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import "../css/SinglePostContent.css";
import heart from "../images/heart.svg";

const SinglePostContent = ({ post }) => {
  const { postId } = useParams();
  const [likes, setLikes] = useState(post ? post.likes : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post ? post.content : "");

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("logged_in_user_id");

    if (post && parseInt(post.user_id, 10) === parseInt(loggedInUserId, 10)) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }

    const token = localStorage.getItem("token");
    console.log("Token retrieved from cookies:", token);
  }, [post]);

  const handleLike = async () => {
    if (isLiked) return; // Prevent multiple likes
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://88.200.63.148:8211/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://88.200.63.148:8211/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Post deleted successfully.");
        // Redirect to another page or update the state to reflect the deletion
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://88.200.63.148:8211/api/posts/${postId}`,
        {
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Post updated successfully.");
        setIsEditing(false);
        post.content = editContent;
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-post-content">
      <h1>{post.title}</h1>
      <img
        src={`http://88.200.63.148:8211${post.image_url}`}
        alt={post.title}
        className="post-image"
      />

      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="5"
            cols="60"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>{post.content}</p>
      )}

      <div className="likes" onClick={handleLike} style={{ cursor: "pointer" }}>
        <div>{likes}</div>
        <div>
          <img
            src={heart}
            alt="heart"
            className={`heart-icon ${isLiked ? "liked" : ""}`}
          />
        </div>
      </div>

      <p>Posted on {new Date(post.publish_time).toLocaleDateString()}</p>

      {isAuthor ? (
        <div className="post-actions dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </button>
          {showDropdown && (
            <ul className="dropdown-menu show">
              <li onClick={handleEdit}>Edit</li>
              <li onClick={handleDelete}>Delete</li>
            </ul>
          )}
        </div>
      ) : (
        <div className="notification">
          <p>
            You cannot edit or delete this post because you are not the author.
          </p>
        </div>
      )}
    </div>
  );
};

export default SinglePostContent;
