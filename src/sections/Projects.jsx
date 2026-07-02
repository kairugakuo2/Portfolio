import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../styles/App.css";

const projects = [
    {
        name: "StudySync",
        duration: "AUG 2025 - DEC 2025",
        description: "Collaborative study platform combining real-time collaboration tools with a dashboard-based workflow for exam prep.",
        highlights: [
            "Acted as technical lead for a 5-person team, coordinating sprints, task ownership, and delivery",
            "Built the frontend architecture, including authentication flow and dashboard-based feature layout",
            "Established modular file structure enabling parallel development with minimal conflicts",
            "Delivered end-to-end (demo, documentation, submission), earning a perfect grade"
        ],
        tech: ["React", "JavaScript", "Git", "Vercel"],
        github: "https://github.com/kairugakuo2/StudySync"
    },
    {
        name: "URL Shortener API",
        duration: "SEP 2025 - PRESENT",
        description: "REST API for creating short links, tracking redirects, and recording clicks.",
        highlights: [
            "Implemented robust input validation and centralized error handling with ProblemDetails responses (400, 404, 500)",
            "Tested endpoints with Swagger/OpenAPI; added health checks and seeding routines for reliability",
            "Implemented xUnit tests, Docker containerization, and GitHub Actions CI for automated build/test pipelines"
        ],
        tech: ["C#", "ASP.NET Core", "SQLite", "EF Core"],
        github: "https://github.com/kairugakuo2/url-shortener-minimal"
    },
    {
        name: "Sooner Planner",
        duration: "JUNE 2025 - PRESENT",
        description: "Class scheduler generating 1,000+ possible combinations from OU course data and user filters.",
        highlights: [
            "Crafted a responsive UI with React and Tailwind, supporting mobile and desktop views",
            "Engineered state logic to handle dynamic schedule rendering and real-time updates"
        ],
        tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
        github: "https://github.com/kairugakuo2/sooner-planner"
    }
];

export default function Projects() {
    return (
        <div id="projects" className="projects">
            <h1>/ projects</h1>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card" style={{ "--stagger-index": index }}>
                        <div className="project-header">
                            <h3 className="project-name">{project.name}</h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${project.name} on GitHub`}
                                className="project-github-link"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                        <span className="duration">{project.duration}</span>
                        <p className="project-description">{project.description}</p>
                        <ul className="project-highlights">
                            {project.highlights.map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                            ))}
                        </ul>
                        <div className="skills-container">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="skill-tag">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
