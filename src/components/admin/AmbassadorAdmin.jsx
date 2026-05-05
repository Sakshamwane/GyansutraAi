import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, ExternalLink, Mail, Phone, Calendar } from "lucide-react";

const AmbassadorAdmin = () => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const fetchAmbassadors = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/api/training/admin/ambassadors/", {
        headers: { "X-GyanSutra-Admin-Token": token }
      });
      setAmbassadors(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching ambassadors", err);
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Campus Ambassadors Applications</h2>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>College & Year</th>
              <th>Reason / Goal</th>
              <th>Applied Date</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {ambassadors.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="font-semibold text-white">{app.name}</div>
                  {app.linkedin_url && (
                    <a href={app.linkedin_url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 flex items-center gap-1 mt-1">
                      <ExternalLink size={12} /> LinkedIn Profile
                    </a>
                  )}
                </td>
                <td>
                  <div>{app.college}</div>
                  <div className="text-xs text-slate-500">{app.year}</div>
                </td>
                <td className="max-w-xs">
                  <p className="text-xs text-slate-300 line-clamp-3">{app.reason}</p>
                </td>
                <td>
                   <div className="flex items-center gap-2 text-xs text-slate-400">
                     <Calendar size={12} />
                     {new Date(app.created_at).toLocaleDateString()}
                   </div>
                </td>
                <td className="actions-cell">
                  <div className="flex gap-2">
                    <a href={`mailto:${app.email}`} className="btn-icon" title="Email">
                      <Mail size={16} />
                    </a>
                    <a href={`tel:${app.phone}`} className="btn-icon" title="Call">
                      <Phone size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {ambassadors.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-500">
            No applications received yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbassadorAdmin;
