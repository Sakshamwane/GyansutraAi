import React, { useState, useEffect } from "react";
import axios from "axios";

const InternshipAdmin = () => {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: "", 
    image_url: "", 
    description: "", 
    bullet_points: [], 
    plans: [
      { name: "Basic", price: "", features: [] },
      { name: "Pro", price: "", features: [] },
      { name: "Premium", price: "", features: [] }
    ],
    price: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchInternships = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get("/api/training/admin/internships/", {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      setInternships(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch internships. Error: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    // Ensure numeric price
    const dataToSend = { ...formData, price: parseFloat(formData.price) || 0 };
    try {
      if (editingId) {
        await axios.put(`/api/training/admin/internships/${editingId}/`, dataToSend, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Internship updated successfully!");
      } else {
        await axios.post("/api/training/admin/internships/", dataToSend, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Internship added successfully!");
      }
      resetForm();
      fetchInternships();
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + (err.response?.data?.error || err.message));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "", image_url: "", description: "", 
      bullet_points: [], 
      plans: [
        { name: "Basic", price: "", features: [] },
        { name: "Pro", price: "", features: [] },
        { name: "Premium", price: "", features: [] }
      ],
      price: ""
    });
    setEditingId(null);
  };

  const handleEdit = (i) => {
    setEditingId(i.id);
    setFormData({
      title: i.title, 
      image_url: i.image_url, 
      description: i.description, 
      bullet_points: i.bullet_points || [], 
      plans: i.plans || [
        { name: "Basic", price: "", features: [] },
        { name: "Pro", price: "", features: [] },
        { name: "Premium", price: "", features: [] }
      ],
      price: i.price
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this internship?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/training/admin/internships/${id}/`, {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      alert("Internship deleted successfully!");
      fetchInternships();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleBulletChange = (val) => {
    setFormData({ ...formData, bullet_points: val.split("\n").filter(l => l.trim() !== "") });
  };

  const handlePlanPriceChange = (index, val) => {
    const newPlans = [...formData.plans];
    newPlans[index].price = val;
    setFormData({ ...formData, plans: newPlans });
  };

  const handlePlanFeaturesChange = (index, val) => {
    const newPlans = [...formData.plans];
    newPlans[index].features = val.split("\n").filter(l => l.trim() !== "");
    setFormData({ ...formData, plans: newPlans });
  };

  return (
    <div>
      <h3>Manage Internships</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          placeholder="Internship Title" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <input 
          placeholder="Image URL" 
          value={formData.image_url}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
        />
        <textarea 
          placeholder="Base Description" 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <label>Main Bullet Points (one per line):</label>
        <textarea 
          placeholder="Main features..." 
          value={formData.bullet_points.join("\n")}
          onChange={(e) => handleBulletChange(e.target.value)}
        />
        <input 
          type="number"
          placeholder="Main Price (Base)" 
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />

        <div style={{marginTop: "1rem", border: "1px solid #333", padding: "1rem", borderRadius: "10px"}}>
          <h4>Plan Details</h4>
          {formData.plans.map((plan, idx) => (
            <div key={idx} style={{marginBottom: "1rem", borderBottom: "1px solid #222", paddingBottom: "1rem"}}>
              <h5>{plan.name} Plan</h5>
              <input 
                type="number"
                placeholder={`${plan.name} Price`}
                value={plan.price}
                onChange={(e) => handlePlanPriceChange(idx, e.target.value)}
                style={{marginBottom: "0.5rem"}}
              />
              <textarea 
                placeholder={`${plan.name} Features (one per line)`}
                value={plan.features.join("\n")}
                onChange={(e) => handlePlanFeaturesChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Internship" : "Add Internship"}
        </button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(internships) && internships.map(i => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>₹{i.price}</td>
                <td>
                  <button onClick={() => handleEdit(i)} className="action-btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(i.id)} className="action-btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!Array.isArray(internships) || internships.length === 0) && <p style={{textAlign: 'center', padding: '2rem'}}>No internships found.</p>}
    </div>
  );
};

export default InternshipAdmin;
