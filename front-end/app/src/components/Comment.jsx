import React, { useState, useEffect, useCallback } from "react";
import axios from "../axiosConfig";
import "../css/Comment.css";
import heart from "../images/heart.svg";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [likedComments, setLikedComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://88.200.63.148:8211/api/posts/${postId}`
      );
      console.log("Fetched comments:", response.data);
      setComments(response.data.comments || []);
      setLikedComments(response.data.likedComments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleLike = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to like comments.");
        return;
      }
      await axios.post(
        `http://88.200.63.148:8211/api/posts/${postId}/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to like comments.");
      } else {
        console.error("Error liking comment:", error);
      }
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete comments.");
        return;
      }
      await axios.delete(
        `http://88.200.63.148:8211/api/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to delete comments.");
      } else {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEdit = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to edit comments.");
        return;
      }
      await axios.put(
        `http://88.200.63.148:8211/api/posts/${postId}/comments/${commentId}`,
        { content: editedComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(null);
      setEditedComment("");
      fetchComments();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to edit comments.");
      } else {
        console.error("Error editing comment:", error);
      }
    }
  };

  const handleReply = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to reply to comments.");
        return;
      }
      await axios.post(
        `http://88.200.63.148:8211/api/posts/${postId}/comments/${replyingTo}/reply`,
        {
          content: newReply,
          post_id: postId,
          parent_id: replyingTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewReply("");
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to reply to comments.");
      } else {
        console.error("Error replying to comment:", error);
      }
    }
  };

  const handleNewComment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add comments.");
        return;
      }
      await axios.post(
        `http://88.200.63.148:8211/api/posts/${postId}/comments`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to add comments.");
      } else {
        console.error("Error adding new comment:", error);
      }
    }
  };

  return (
    <div className="comments-section">
      <div className="new-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <button onClick={handleNewComment}>Submit Comment</button>
      </div>
      {Array.isArray(comments) &&
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <div className="comment-header">
              <span className="comment-author">
                {comment.first_name && comment.last_name
                  ? `${comment.first_name} ${comment.last_name}`
                  : "Unknown Author"}
              </span>
              <span className="comment-date">
                {comment.publish_time
                  ? new Date(comment.publish_time).toLocaleString()
                  : "Unknown Date"}
              </span>
            </div>
            {isEditing === comment.comment_id ? (
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
            ) : (
              <p className="comment-text">{comment.content || "No content"}</p>
            )}
            <div className="comment-actions">
              <img
                src={heart}
                alt="Like"
                onClick={() => handleLike(comment.comment_id)}
                className={
                  likedComments.includes(comment.comment_id) ? "liked" : ""
                }
              />
              <span>{comment.likes}</span>
              <button onClick={() => setIsEditing(comment.comment_id)}>
                Edit
              </button>
              <button onClick={() => handleDelete(comment.comment_id)}>
                Delete
              </button>
              <button onClick={() => setReplyingTo(comment.comment_id)}>
                Reply
              </button>
            </div>
            {isEditing === comment.comment_id && (
              <button onClick={() => handleEdit(comment.comment_id)}>
                Save
              </button>
            )}
            {replyingTo === comment.comment_id && (
              <div className="reply-section">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Write a reply..."
                />
                <button onClick={handleReply}>Submit Reply</button>
              </div>
            )}
            {/* Render Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <div key={reply.comment_id} className="reply">
                    <div className="reply-header">
                      <span className="reply-author">
                        {reply.first_name && reply.last_name
                          ? `${reply.first_name} ${reply.last_name}`
                          : "Unknown Author"}
                      </span>
                      <span className="reply-date">
                        {reply.publish_time
                          ? new Date(reply.publish_time).toLocaleString()
                          : "Unknown Date"}
                      </span>
                    </div>
                    <p className="reply-text">
                      {reply.content || "No content"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Comment;
