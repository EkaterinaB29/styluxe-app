import React from 'react';
import '../css/Post.css';

const Post = ({ post }) => {
    return (
        <div className="post">
            {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
            <div className="post-content">
                <p>{post.content}</p>
                <p>Likes: {post.likes}</p>
                <p>Posted by User {post.user_id} on {new Date(post.publish_time).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Post;
