import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    // Get all posts
    const allPosts = JSON.parse(localStorage.getItem('myNewsPosts')) || [];
    
    // Filter out posts that belong to the current user
    const myPosts = allPosts.filter(post => post.author === currentUser);
    setUserPosts(myPosts);

    // Get saved posts count
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    setSavedCount(savedPosts.length);
  }, [currentUser]);

  const handleDelete = (postId) => {
    // Delete from my posts state
    const updatedMyPosts = userPosts.filter(p => p.id !== postId);
    setUserPosts(updatedMyPosts);

    // Delete from local storage (all posts)
    const allPosts = JSON.parse(localStorage.getItem('myNewsPosts')) || [];
    const updatedAllPosts = allPosts.filter(p => p.id !== postId);
    localStorage.setItem('myNewsPosts', JSON.stringify(updatedAllPosts));
    
    // Optional: remove from saved posts as well if it's there
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    const updatedSavedPosts = savedPosts.filter(p => p.id !== postId);
    localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
  };

  return (
    <div className="container page-wrapper">
      <div className="profile-header">
        <div className="profile-avatar">
          {currentUser ? currentUser.charAt(0).toUpperCase() : '?'}
        </div>
        <h2 className="profile-name">@{currentUser}</h2>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">{userPosts.length}</div>
          <div className="stat-label">Total Posts Uploaded</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{savedCount}</div>
          <div className="stat-label">Posts Saved</div>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>My Uploaded Posts</h2>
      
      {userPosts.length > 0 ? (
        <div className="posts-grid">
          {userPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              isOwnPost={true} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>You haven't uploaded any news yet. Head over to Local News to share something!</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
