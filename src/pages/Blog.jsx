import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowRight, Search, ChevronRight } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Technology', 'Career', 'AI', 'Tutorial', 'Industry'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/training/blogs/");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1 className="gradient-text animate-fade-in-up">Insights & Innovation</h1>
          <p className="animate-fade-in-up delay-100">
            Deep dives into tech, career strategies, and the future of AI-driven education.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="blog-controls animate-fade-in-up delay-200">
          <div className="blog-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="loading-spinner"></div>
            <p className="mt-4 text-slate-400">Curating the best content for you...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="blog-grid animate-fade-in-up delay-300">
            {filteredPosts.map(post => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id} className="blog-card-link">
                <article className="blog-card">
                  <div className="blog-image-wrapper">
                    <img 
                      src={post.image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"} 
                      alt={post.title} 
                      className="blog-image" 
                    />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">
                      <Calendar size={14} className="inline mr-1" /> 
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt || "Dive into our latest insights on this topic..."}</p>
                    
                    <div className="blog-footer">
                      <div className="blog-author">
                        <div className="author-img">
                          {post.author ? post.author.charAt(0) : 'G'}
                        </div>
                        <span className="author-name">{post.author || "GyanSutra Team"}</span>
                      </div>
                      <span className="read-more">
                        Read Story <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">No stories found</h3>
            <p className="text-slate-400">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
