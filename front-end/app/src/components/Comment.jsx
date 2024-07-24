import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';
import Cookies from 'js-cookie';
import '../css/Comment.css';
import heart from '../images/heart.svg';

const Comment = ({ comment, postId, fetchComments, setReplyingTo }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleLike = async () => {
    try {
      const token = Cookies.get('token');
      await axios.post(`http://88.200.63.148:8211/api/posts/${postId}/comments/${comment.comment_id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://88.200.63.148:8211/api/posts/${postId}/comments/${comment.comment_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://88.200.63.148:8211/api/posts/${postId}/comments/${comment.comment_id}`, { text: editedComment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(null);
      fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.author || 'Unknown Author'}</span>
        <span className="comment-date">{comment.publish_time ? new Date(comment.publish_time).toLocaleString() : 'Unknown Date'}</span>
      </div>
      {isEditing === comment.comment_id ? (
        <textarea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      ) : (
        <p className="comment-text">{comment.content || 'No content'}</p>
      )}
      <div className="comment-actions">
        <img src={heart} alt="Like" onClick={handleLike} />
        <button onClick={() => setIsEditing(comment.comment_id)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setReplyingTo(comment.comment_id)}>Reply</button>
      </div>
      {isEditing === comment.comment_id && (
        <button onClick={handleEdit}>Save</button>
      )}
      {comment.replies && comment.replies.map(reply => (
        <div key={reply.comment_id} className="reply">
          <Comment comment={reply} postId={postId} fetchComments={fetchComments} setReplyingTo={setReplyingTo} />
        </div>
      ))}
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://88.200.63.148:8211/api/posts/${postId}`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleReply = async () => {
    try {
      const token = Cookies.get('token');
      await axios.post(`http://88.200.63.148:8211/api/posts/${postId}/comments/${replyingTo}/reply`, {
        content: newReply,
        post_id: postId,
        parent_id: replyingTo
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNewReply('');
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleNewComment = async () => {
    try {
      const token = Cookies.get('token');
      await axios.post(`http://88.200.63.148:8211/api/posts/${postId}/comments`, {
        content: newComment,
        post_id: postId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding new comment:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
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
      {replyingTo && (
        <div className="reply-section">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply}>Submit Reply</button>
        </div>
      )}
      {Array.isArray(comments) && comments.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} postId={postId} fetchComments={fetchComments} setReplyingTo={setReplyingTo} />
      ))}
    </div>
  );
};

export default CommentSection;
