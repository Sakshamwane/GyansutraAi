import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
        const res = await axios.get(`${API_BASE}/api/training/blogs/${slug}/`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Story not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="blog-page flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error || !post) return (
    <div className="blog-page text-center pt-40">
      <h1 className="text-4xl font-bold mb-6">{error}</h1>
      <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <article className="post-page">
      <div className="container">
        <div className="post-nav mb-12">
          <Link to="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Back to Insights
          </Link>
        </div>

        <header className="post-header animate-fade-in-up">
          <div className="post-meta-top">
            <span className="post-category-badge">{post.category}</span>
            <span className="flex items-center gap-2">
              <Calendar size={16} /> 
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} /> 5 min read
            </span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-author-large mt-8 flex items-center justify-center gap-4">
            <div className="author-img-large w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
              {post.author ? post.author.charAt(0) : 'G'}
            </div>
            <div className="text-left">
              <div className="font-semibold">{post.author || "GyanSutra Team"}</div>
              <div className="text-slate-400 text-sm">Industry Expert</div>
            </div>
          </div>
        </header>

        <img 
          src={post.image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"} 
          alt={post.title} 
          className="post-featured-image animate-fade-in delay-200" 
        />

        <div className="post-body animate-fade-in-up delay-300">
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <footer className="post-footer-section mt-20 pb-20 border-t border-slate-800 pt-10">
          <div className="flex justify-between items-center">
            <div className="share-buttons flex items-center gap-4">
              <span className="text-slate-400 font-medium">Share this story:</span>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"><Share2 size={20} /></button>
            </div>
            <Link to="/blog" className="text-blue-500 font-semibold hover:underline">More Insights <ArrowLeft className="rotate-180 inline" size={16} /></Link>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
