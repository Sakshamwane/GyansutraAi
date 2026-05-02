import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstituteAdmin from "../../components/admin/InstituteAdmin";
import ContributorAdmin from "../../components/admin/ContributorAdmin";
import InternshipAdmin from "../../components/admin/InternshipAdmin";
import EventAdmin from "../../components/admin/EventAdmin";
import "../../styles/admin.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("institutes");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  if (!isAuthorized) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-logo-section">
          <h1 className="gradient-text font-bold">GyanSutra LMS</h1>
          <span className="admin-subtitle">Product Management Portal</span>
        </div>
        <div className="admin-actions">
          <span className="admin-user-badge">Administrator Access</span>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>Logout</button>
        </div>
      </header>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === "institutes" ? "active" : ""}`}
          onClick={() => setActiveTab("institutes")}
        >
          Partner Institutions
        </button>
        <button 
          className={`tab-btn ${activeTab === "contributors" ? "active" : ""}`}
          onClick={() => setActiveTab("contributors")}
        >
          LMS Contributors
        </button>
        <button 
          className={`tab-btn ${activeTab === "internships" ? "active" : ""}`}
          onClick={() => setActiveTab("internships")}
        >
          Programs & Internships
        </button>
        <button 
          className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
      </div>

      <div className="admin-content-card">
        {activeTab === "institutes" && <InstituteAdmin />}
        {activeTab === "contributors" && <ContributorAdmin />}
        {activeTab === "internships" && <InternshipAdmin />}
        {activeTab === "events" && <EventAdmin />}
      </div>
    </div>
  );
};

export default AdminDashboard;
