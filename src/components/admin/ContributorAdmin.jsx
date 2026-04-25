import React, { useState, useEffect } from "react";
import axios from "axios";

const ContributorAdmin = () => {
  const [contributors, setContributors] = useState([]);
  const [formData, setFormData] = useState({
    name: "", image_url: "", company: "", position: "", achievements: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchContributors = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get("/api/training/admin/contributors/", {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      setContributors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch contributors. Error: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      if (editingId) {
        await axios.put(`/api/training/admin/contributors/${editingId}/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Contributor updated successfully!");
      } else {
        await axios.post("/api/training/admin/contributors/", formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Contributor added successfully!");
      }
      setFormData({ name: "", image_url: "", company: "", position: "", achievements: "" });
      setEditingId(null);
      fetchContributors();
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setFormData({ 
      name: c.name, image_url: c.image_url, 
      company: c.company, position: c.position, 
      achievements: c.achievements 
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contributor?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/training/admin/contributors/${id}/`, {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      alert("Contributor deleted successfully!");
      fetchContributors();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h3>Manage Contributors</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          placeholder="Image URL" 
          value={formData.image_url}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
        />
        <input 
          placeholder="Company" 
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
        />
        <input 
          placeholder="Position" 
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
        />
        <textarea 
          placeholder="Achievements (comma separated or multiline)" 
          value={formData.achievements}
          onChange={(e) => setFormData({...formData, achievements: e.target.value})}
        />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Contributor" : "Add Contributor"}
        </button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name: "", image_url: "", company: "", position: "", achievements: ""})}}>Cancel</button>}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(contributors) && contributors.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.company} ({c.position})</td>
              <td>
                <button onClick={() => handleEdit(c)} className="action-btn btn-edit">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="action-btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!Array.isArray(contributors) || contributors.length === 0) && <p style={{textAlign: 'center', padding: '2rem'}}>No contributors found.</p>}
    </div>
  );
};

export default ContributorAdmin;
