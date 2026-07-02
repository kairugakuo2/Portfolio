import React from 'react';
import "../styles/App.css";

const experiences = [
    {
        company: "Argo Data",
        title: "Software Engineer Intern",
        duration: "JUN 2026 - PRESENT",
        description: "Building a secure signing key bootstrap and rotation system in C#/.NET for GLBA/HIPAA-regulated banking infrastructure. Implementing DPAPI-encrypted local key cache, Registrar API client, and automated rotation logic with resilient failure recovery. Writing MSTest coverage for bootstrap, cache, DPAPI round-trip, rotation, and Registrar error scenarios.",
        skills: ["C#", ".NET", "MSTest", "Security", "Banking Infrastructure"]
    },
    {
        company: "William Kerber Software Studio",
        title: "Founder (Selected Team)",
        duration: "FEB 2026 - PRESENT",
        description: "Selected as part of a 4 person team to develop a professional esports media aggregation platform. Led UI/UX design through Figma prototypes used in investor pitch and MVP planning.",
        skills: ["UI/UX Design", "Figma", "Product Strategy", "Team Leadership"]
    },
    {
        company: "University of Oklahoma",
        title: "Student Programmer",
        duration: "FEB 2025 - PRESENT",
        description: "Maintain and update department web/apps, manage databases, and generate reports. Provide tech support for students, faculty, and staff, including language tests and video streaming. Work with the team on troubleshooting and larger tech projects.",
        skills: ["Web Development", "Database Management", "Tech Support", "Team Collaboration"]
    },
    {
        company: "Delta Tau Delta Fraternity",
        title: "Philanthropy Committee Member",
        duration: "JAN 2025 - PRESENT",
        description: "Managed the GivePulse app to track fraternity volunteer hours. Onboarded members, imported data, and maintained records. Coordinated with GivePulse reps and helped set up volunteer opportunities.",
        skills: ["App Management", "Data Management", "Volunteer Coordination", "Team Leadership"]
    },
    {
        company: "Velocity Detailing",
        title: "Owner",
        duration: "MAY 2024 - PRESENT",
        description: "Launched and scaled a mobile detailing business, completing 30+ projects in 3 months with 98% customer satisfaction. Acquired customers via free marketing platforms (Google, Yelp, TikTok, Instagram, Facebook). Designed and developed the website using CRM software, with additional customization in HTML and CSS.",
        skills: ["Business Development", "Digital Marketing", "Web Design", "Customer Service", "Project Management"]
    },
    {
        company: "Arcis Golf",
        title: "Outside Service Attendant",
        duration: "SEP 2022 - AUG 2024",
        description: "Greet and assist golfers for a great experience. Keep carts in top shape and equipment organized. Help with events and smooth daily operations.",
        skills: ["Customer Service", "Equipment Maintenance", "Event Coordination", "Operations Management"]
    }
];

export default function Experience() {
    return (
        <div id="experience" className="experience">
            <h1>/ experiences</h1>
            <div className="experience-grid">
                {experiences.map((exp, index) => (
                    <div key={index} className="experience-card" style={{ "--stagger-index": index }}>
                        <div className="experience-header">
                            <h3 className="company-name">{exp.company}</h3>
                            <span className="duration">{exp.duration}</span>
                        </div>
                        <h4 className="job-title">{exp.title}</h4>
                        <p className="job-description">{exp.description}</p>
                        <div className="skills-container">
                            {exp.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

