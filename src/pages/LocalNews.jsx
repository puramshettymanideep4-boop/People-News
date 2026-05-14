import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LocalNews() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [imageUrl, setImageUrl] = useState('');

  // Predefined categories
  const categories = ['Technology', 'Sports', 'Health', 'General News'];

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    // Create new post object
    const newPost = {
      id: Date.now(), // Generate a simple unique ID
      title: title,
      content: content,
      category: category,
      author: currentUser, // Set the logged-in user as author
      date: new Date().toLocaleDateString(),
      image: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=600&auto=format&fit=crop' // Default image if none provided
    };

    // Get existing posts
    const existingPosts = JSON.parse(localStorage.getItem('myNewsPosts')) || [];

    // Add new post to the beginning of the list
    const updatedPosts = [newPost, ...existingPosts];

    // Save back to local storage
    localStorage.setItem('myNewsPosts', JSON.stringify(updatedPosts));

    // Redirect to home page
    navigate('/home');
  };

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Share Local News</h1>
      </div>

      <div className="login-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label className="form-label">News Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="What's happening?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL (Optional)</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">News Content</label>
            <textarea
              className="form-input"
              placeholder="Write the details here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Author Name</label>
            <input
              type="text"
              className="form-input"
              value={currentUser}
              disabled
            />
            <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>Posting as logged-in user</small>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            🚀 Upload News
          </button>
        </form>
      </div>
    </div>
  );
}

export default LocalNews;
