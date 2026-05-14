import React, { useState, useEffect } from 'react';

function PostCard({ post, isOwnPost, onDelete }) {
  // Local state to check if post is saved
  const [isSaved, setIsSaved] = useState(false);

  // Check initial saved status when component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    const found = savedPosts.some(saved => saved.id === post.id);
    setIsSaved(found);
  }, [post.id]);

  const handleSaveToggle = () => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    
    if (isSaved) {
      // Remove from saved
      const updatedSaved = savedPosts.filter(saved => saved.id !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(updatedSaved));
      setIsSaved(false);
    } else {
      // Add to saved
      savedPosts.push(post);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      setIsSaved(true);
    }
  };

  return (
    <div className="post-card">
      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
      <div className="post-content-wrap">
        <span className="post-category">{post.category}</span>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-desc">{post.content}</p>
        
        <div className="post-meta">
          <span>By: {post.author}</span>
          <span>{post.date}</span>
        </div>
        
        <div className="post-actions">
          <button 
            className={`btn ${isSaved ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleSaveToggle}
          >
            {isSaved ? '❤️ Saved' : '🤍 Save'}
          </button>
          
          {/* Conditionally render delete button only for user's own posts */}
          {isOwnPost && (
            <button className="btn btn-danger" onClick={() => onDelete(post.id)}>
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
