import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Check, Search, Eye } from "lucide-react";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "GyanSutra Team",
    content: "",
    excerpt: "",
    image_url: "",
    category: "Technology",
  });

  const categories = ['Technology', 'Career', 'AI', 'Tutorial', 'Industry'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
      const res = await axios.get(`${API_BASE}/api/training/blogs/`);
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // Auto-generate slug from title if title changes and no slug exists
        if (name === 'title' && !editingBlog) {
            newData.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }
        return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
    
    try {
      if (editingBlog) {
        await axios.put(`${API_BASE}/api/training/blogs/${editingBlog.id}/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token }
        });
      } else {
        await axios.post(`${API_BASE}/api/training/blogs/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token }
        });
      }
      setIsModalOpen(false);
      setEditingBlog(null);
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert("Error saving blog: " + (err.response?.data?.detail || "Check all fields"));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      author: "GyanSutra Team",
      content: "",
      excerpt: "",
      image_url: "",
      category: "Technology",
    });
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      content: blog.content,
      excerpt: blog.excerpt,
      image_url: blog.image_url,
      category: blog.category,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem("adminToken");
    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
    
    try {
      await axios.delete(`${API_BASE}/api/training/blogs/${id}/`, {
        headers: { "X-GyanSutra-Admin-Token": token }
      });
      fetchBlogs();
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Blog Management</h2>
        <button className="btn btn-primary" onClick={() => { resetForm(); setEditingBlog(null); setIsModalOpen(true); }}>
          <Plus size={18} /> New Blog Post
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <div className="font-semibold">{blog.title}</div>
                  <div className="text-xs text-slate-500">/{blog.slug}</div>
                </td>
                <td><span className="badge">{blog.category}</span></td>
                <td>{blog.author}</td>
                <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="btn-icon" onClick={() => handleEdit(blog)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="btn-icon delete" onClick={() => handleDelete(blog.id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                  <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="btn-icon">
                    <Eye size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter post title"
                  />
                </div>
                <div className="form-group">
                  <label>Slug (URL Identifier)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    placeholder="how-to-build-ai"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Featured Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://unsplash.com/..."
                  />
                </div>
                <div className="form-group full-width">
                  <label>Excerpt (Short Summary)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="A brief overview for the blog card..."
                  />
                </div>
                <div className="form-group full-width">
                  <label>Content (HTML Supported)</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="10"
                    placeholder="Write your story here... Use <p>, <h2>, <ul> tags for formatting."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingBlog ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
