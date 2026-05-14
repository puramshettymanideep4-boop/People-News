import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const currentUser = localStorage.getItem('currentUser');

  // Load saved posts on mount and refresh automatically 
  // We can setup an interval or just rely on local state updates if we managed state globally.
  // Since we rely on localStorage and beginner friendly approaches, we just load once on mount.
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    setSavedPosts(posts);
  }, []);

  // We need to pass a callback to update the saved posts list if a post is unsaved from this page
  // Wait, the PostCard modifies localStorage itself. If they unsave it here, it will just change the button.
  // To make it disappear, we could periodically check or listen to storage event.
  // For simplicity (beginner friendly), let's just let it stay on the screen as "Unsaved" until page refresh,
  // or we could add a small refresh logic. We'll keep it simple: it stays until page refresh.

  // The delete button shouldn't show on saved posts unless they own it,
  // but let's avoid letting them delete from here to keep things simple, or we can just pass the delete handler.

  const handleDelete = (postId) => {
    // Delete from all posts
    const allPosts = JSON.parse(localStorage.getItem('myNewsPosts')) || [];
    const updatedAllPosts = allPosts.filter(p => p.id !== postId);
    localStorage.setItem('myNewsPosts', JSON.stringify(updatedAllPosts));
    
    // Also remove from saved posts
    const updatedSavedPosts = savedPosts.filter(p => p.id !== postId);
    setSavedPosts(updatedSavedPosts);
    localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
  };

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Saved Posts ❤️</h1>
      </div>
      
      {savedPosts.length > 0 ? (
        <div className="posts-grid">
          {savedPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              isOwnPost={post.author === currentUser} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No saved posts</h2>
          <p>You haven't saved any posts yet. Go to Home to explore and save local news!</p>
        </div>
      )}
    </div>
  );
}

export default SavedPosts;
