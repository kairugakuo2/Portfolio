import React, { useState} from 'react';
import {Tabs, Tab, Box, Typography, } from '@mui/material';
import "../styles/App.css";
//experience data
const experiences = [
    {
        company: "University of Oklahoma",
        title: "Student Programmer",
        duration: "FEB 2025 - PRESENT",
        details: `
            <ul>
                <li>Maintain and update department web/apps, manage databases, and generate reports.</li>
                <li>Provide tech support for students, faculty, and staff, including language tests and video streaming.</li>
                <li>Work with the team on troubleshooting and larger tech projects.</li>
            </ul>
        `,
    },
    {
        company: "Delta Tau Delta Fraternity",
        title: "Philanthropy Committee Member",
        duration: "JAN 2025 - PRESENT",
        details: `
            <ul>
                <li>Managed the GivePulse app to track fraternity volunteer hours.</li>
                <li>Onboarded members, imported data, and maintained records.</li>
                <li>Coordinated with GivePulse reps and helped set up volunteer opportunities.</li>
            </ul>
        `,
    },
    {
        company: "Velocity Detailing",
        title: "Owner",
        duration: "MAY 2024 - PRESENT",
        details:`
            <ul>
                <li>Launched and scaled a mobile detailing business, completing 30+ projects in 3 months with 98% customer satisfaction. </li>
                <li>Acquired customers via free marketing platforms (Google, Yelp, TikTok, Instagram, Facebook).</li>
                <li>Designed and developed the website using CRM software, with additional customization in HTML and CSS.</li>
            </ul>
        `,
    },
    {
        company: "Arcis Golf",
        title: "Outside Service Attendant",
        duration: "SEP 2022 - AUG 2024",
        details:`
            <ul>
                <li>Greet and assist golfers for a great experience.</li>
                <li>Keep carts in top shape and equipment organized.</li>
                <li>Help with events and smooth daily operations.</li>
            </ul> 
        `,
    }
];

export default function Experience() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <>
            <div id="experience" className="experience">
                <h1>/ experiences </h1>
                <Box className="experience-container">
                    {/*vertical tabs */}
                    <div className="experience-tabs">
                        <Tabs
                            orientation="vertical"
                            value={selectedTab}
                            onChange={(e, newValue) => setSelectedTab(newValue)}
                        >
                            {experiences.map((exp, index) => (
                                <Tab key={index} label={exp.company} />
                            ))}
                        </Tabs>
                    </div>
                    {/*Tab Content */}
                    <div className="experience-content">
                        <Box>
                            {experiences.map((exp, index) => (
                                <Box key={index} hidden={selectedTab !== index}>
                                    <Typography>
                                        {exp.title} @ {exp.company}
                                    </Typography>
                                    <Typography>
                                        {exp.duration}
                                    </Typography>
                                    <div dangerouslySetInnerHTML={{ __html: exp.details }} />
                                </Box>
                            ))}
                        </Box>
                    </div>

                </Box>
            </div>
        </>
    );
};
