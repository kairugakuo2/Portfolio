import React from "react";
import myImage from '../assets/me.jpeg';

const About = () => {
    return (
        <div id="about" className="about">
            <h1>/ about me</h1>
            <div className="aboutMeInfo">
                <div className="aboutText">
                    <p>
                        I am currently a <strong>student programmer</strong> at the University of Oklahoma, working under
                        the Language Learning Center (LLC). At the same time, I am undertaking a full-time Bachelor's of
                        Science in Computer Science at the University of Oklahoma.
                    </p>
                    <p> Here are some technologies I have been working with: </p>
                    <ul>
                        <li>C/C++</li>
                        <li>Java</li>
                        <li>Python3</li>
                        <li>React.js</li>
                        <li>Node.js</li>
                        <li>MySQL</li>
                    </ul>
                    <p>
                        Outside of work and school, I'm interested in learning about vulnerabilities
                        within system. I also play a good amount of video games, and I love cooking!
                    </p>
                </div>
                <div className="aboutImage">
                    <img src={myImage} alt="Gakuo Kairu" />
                </div>
            </div>

        </div>
    );
};

export default About;