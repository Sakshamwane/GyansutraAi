import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteAdmin = () => {
  const [institutes, setInstitutes] = useState([]);
  const [formData, setFormData] = useState({ name: "", logo_url: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchInstitutes = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get("/api/training/admin/institutes/", {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      setInstitutes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch institutes. Error: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      if (editingId) {
        await axios.put(`/api/training/admin/institutes/${editingId}/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Institute updated successfully!");
      } else {
        await axios.post("/api/training/admin/institutes/", formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Institute added successfully!");
      }
      setFormData({ name: "", logo_url: "" });
      setEditingId(null);
      fetchInstitutes();
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (inst) => {
    setEditingId(inst.id);
    setFormData({ name: inst.name, logo_url: inst.logo_url });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this institute?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/training/admin/institutes/${id}/`, {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      alert("Institute deleted successfully!");
      fetchInstitutes();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h3>Manage Institutes</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          placeholder="Institute Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          placeholder="Logo URL" 
          value={formData.logo_url}
          onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
          required
        />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Institute" : "Add Institute"}
        </button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name: "", logo_url: ""})}}>Cancel</button>}
      </form>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(institutes) && institutes.map(inst => (
              <tr key={inst.id}>
                <td>{inst.name}</td>
                <td><img src={inst.logo_url} alt={inst.name} style={{height: "30px"}} /></td>
                <td>
                  <button onClick={() => handleEdit(inst)} className="action-btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(inst.id)} className="action-btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!Array.isArray(institutes) || institutes.length === 0) && <p style={{textAlign: 'center', padding: '2rem'}}>No institutes found.</p>}
    </div>
  );
};

export default InstituteAdmin;
