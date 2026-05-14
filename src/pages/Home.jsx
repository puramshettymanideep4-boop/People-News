import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Available categories to filter
  const categories = ['All', 'Technology', 'Sports', 'Health', 'Local News'];

  useEffect(() => {
    // Fetch posts from local storage
    const savedPosts = localStorage.getItem('myNewsPosts');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // If no posts exist, let's create some default Telangana news
      const defaultPosts = [
        {
          id: 1,
          title: 'Hyderabad Metro Expansion Announced',
          content: 'The new metro lines will connect the airport directly from various parts of the city, easing traffic congestion.',
          category: 'Local News',
          author: 'Telangana Admin',
          date: new Date().toLocaleDateString(),
          image: 'https://images.unsplash.com/photo-1594917637841-f76ea7604a58?q=80&w=600&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'T-Hub Opens New Startup Incubator',
          content: 'T-Hub 2.0 has officially launched its newest phase to support local tech startups in the AI domain.',
          category: 'Technology',
          author: 'Tech Reporter',
          date: new Date().toLocaleDateString(),
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop'
        }
      ];
      localStorage.setItem('myNewsPosts', JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    }
  }, []);

  // Filter posts based on selected category
  const filteredPosts = categoryFilter === 'All' 
    ? posts 
    : posts.filter(post => post.category === categoryFilter);

  // Get current logged-in user to pass down for ownership checking
  const currentUser = localStorage.getItem('currentUser');

  const handleDelete = (postId) => {
    // Only author can delete, but let's implement the deletion logic
    const updatedPosts = posts.filter(p => p.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('myNewsPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Community Updates</h1>
      </div>

      {/* Category Filter Buttons */}
      <div className="category-filter">
        {categories.map((cat, index) => (
          <button 
            key={index}
            className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map(post => (
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
          <h2>No posts found</h2>
          <p>Be the first to share news in this category!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
