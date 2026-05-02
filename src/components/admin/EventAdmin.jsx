import React, { useState, useEffect } from "react";
import axios from "axios";

const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    date: "", 
    time: "", 
    link: "", 
    category: "" 
  });
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    const token = localStorage.getItem("adminToken");
    try {
        const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
        const res = await axios.get(`${API_BASE}/api/training/events/`, {
            headers: { "X-GyanSutra-Admin-Token": token },
        });
        setEvents(res.data);
    } catch (err) {
        console.error(err);
        alert("Failed to fetch events. Error: " + (err.response?.data?.detail || err.message));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
    
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/training/events/${editingId}/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Event updated successfully!");
      } else {
        await axios.post(`${API_BASE}/api/training/events/`, formData, {
          headers: { "X-GyanSutra-Admin-Token": token },
        });
        alert("Event added successfully!");
      }
      setFormData({ 
        title: "", 
        description: "", 
        date: "", 
        time: "", 
        link: "", 
        category: "" 
      });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + (err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message));
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({ 
      title: event.title, 
      description: event.description, 
      date: event.date, 
      time: event.time, 
      link: event.link, 
      category: event.category 
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    const token = localStorage.getItem("adminToken");
    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
    
    try {
      await axios.delete(`${API_BASE}/api/training/events/${id}/`, {
        headers: { "X-GyanSutra-Admin-Token": token },
      });
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <h3>Manage Events</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input 
                placeholder="Event Title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
            />
            <input 
                placeholder="Category (e.g. Webinar, Workshop)" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
            />
            <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
            />
            <input 
                placeholder="Time (e.g. 5:00 PM)" 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
            />
            <input 
                placeholder="Join Link (URL)" 
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                required
                style={{ gridColumn: 'span 2' }}
            />
            <textarea 
                placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                style={{ gridColumn: 'span 2' }}
            />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {editingId ? "Update Event" : "Add Event"}
        </button>
        {editingId && (
            <button 
                type="button" 
                onClick={() => {
                    setEditingId(null); 
                    setFormData({title: "", description: "", date: "", time: "", link: "", category: ""})
                }}
                className="btn btn-secondary"
                style={{ marginLeft: '1rem' }}
            >
                Cancel
            </button>
        )}
      </form>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.category}</td>
                <td>
                  <button onClick={() => handleEdit(event)} className="action-btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(event.id)} className="action-btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!Array.isArray(events) || events.length === 0) && <p style={{textAlign: 'center', padding: '2rem'}}>No events found.</p>}
    </div>
  );
};

export default EventAdmin;
