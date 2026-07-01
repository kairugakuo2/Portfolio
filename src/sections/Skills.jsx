import React from 'react';
import "../styles/App.css";

const skillGroups = [
    {
        category: "Languages",
        items: ["Python", "C++", "Java", "JavaScript/TypeScript", "C#", "SQL"]
    },
    {
        category: "Frameworks",
        items: ["React", "Next.js", "Node.js", "ASP.NET Core", "Entity Framework Core", "Swagger/OpenAPI", "Vite"]
    },
    {
        category: "Tools",
        items: ["Git/GitHub", "Visual Studio", "Docker", "xUnit/Jest", "MSTest", "Chrome DevTools", "CLI", "Vercel", "Agile Workflow"]
    }
];

export default function Skills() {
    return (
        <div id="skills" className="skills">
            <h1>/ skills</h1>
            <div className="skills-groups">
                {skillGroups.map((group) => (
                    <div key={group.category} className="skills-group">
                        <h4 className="skills-group-title">{group.category}</h4>
                        <div className="skills-container">
                            {group.items.map((item) => (
                                <span key={item} className="skill-tag">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
