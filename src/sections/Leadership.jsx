import React from 'react';
import "../styles/App.css";

const leadership = [
    {
        organization: "Google Developer Group (GDG) - University of Oklahoma",
        title: "Connections Coordinator",
        duration: "SEP 2025 - PRESENT",
        description: "Collaborating with team to plan and coordinate upcoming tech workshops and networking events for students. Leading outreach and partnership efforts to grow cross-organization engagement on campus."
    }
];

export default function Leadership() {
    return (
        <div id="leadership" className="leadership">
            <h1>/ leadership</h1>
            <div className="leadership-grid">
                {leadership.map((role, index) => (
                    <div key={index} className="leadership-card" style={{ "--stagger-index": index }}>
                        <div className="leadership-header">
                            <h3 className="org-name">{role.organization}</h3>
                            <span className="duration">{role.duration}</span>
                        </div>
                        <h4 className="role-title">{role.title}</h4>
                        <p className="role-description">{role.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
