import { useState } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Available categories to filter
  const categories = ['All', 'Technology', 'Sports', 'Health', 'General News'];

  // Initialize posts using a lazy initializer to avoid calling setState inside useEffect
  const [posts, setPosts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('myNewsPosts')) || null;

    const defaultPosts = [
      {
        id: 1,
        title: 'Hyderabad Metro Expansion Announced',
        content: 'The new metro lines will connect the airport directly from various parts of the city, easing traffic congestion.',
        category: 'General News',
        author: 'Telangana Admin',
        date: new Date().toLocaleDateString(),
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4r0fCgy3sOdc3KsHP7YLXjFcSVMZLkHwp7w&s'
      },
      {
        id: 2,
        title: 'T-Hub Opens New Startup Incubator',
        content: 'T-Hub 2.0 has officially launched its newest phase to support local tech startups in the AI domain.',
        category: 'Technology',
        author: 'Tech Reporter',
        date: new Date().toLocaleDateString(),
        image: 'https://media.telanganatoday.com/wp-content/uploads/2023/03/T-hub-1.jpg'
      },
      {
        id: 3,
        title: 'State Government Announces New Health Scheme',
        content: 'The new health scheme aims to provide affordable healthcare to underprivileged families across the state.',
        category: 'Health',
        author: 'Dr.Manideep',
        date: new Date().toLocaleDateString(),
        image: 'https://cdn.siasat.com/wp-content/uploads/2024/08/Telangana-govt-to-hold-drive-for-jobs-at-Hyderabad-hospitals.jpg'
      },
      {
        id: 4,  
        title: 'Sunrisers Hyderabad qualify for IPL 2026 Playoffs',
        content: 'Sunrisers Hyderabad have secured their place in the IPL 2026 playoffs after a dominant performance in the qualifying matches.',
        category: 'Sports',
        author: 'JK. Rowling',
        date: new Date().toLocaleDateString(),
        image: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2025/03/untitled-design-2025-03-17t154548-1742206559.jpg'
      }
    ];

    if (saved && Array.isArray(saved)) {
      // Merge default posts into saved posts by id, replacing if the default changed
      const byId = new Map(saved.map(p => [p.id, p]));
      let changed = false;
      defaultPosts.forEach(p => {
        const existing = byId.get(p.id);
        // Replace if missing or different
        if (!existing || JSON.stringify(existing) !== JSON.stringify(p)) {
          byId.set(p.id, p);
          changed = true;
        }
      });

      const merged = Array.from(byId.values()).sort((a, b) => a.id - b.id);
      if (changed) {
        localStorage.setItem('myNewsPosts', JSON.stringify(merged));
      }
      return merged;
    } else {
      localStorage.setItem('myNewsPosts', JSON.stringify(defaultPosts));
      return defaultPosts;
    }
  });

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
