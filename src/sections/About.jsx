import React from "react";
import myImage from '../assets/me.jpeg';

const About = () => {
    return (
        <div className="about">
            <h1>/ About Me</h1>
            <div className="aboutMeInfo">
                <div className="aboutText">
                    <p>
                        I'm am currently a student programmer at the University of Oklahoma, working under
                        the LLC Department. At the same time, I am undertaking a full-time Bachelor's of
                        Science in Computer Science at the University of Oklahoma.
                    </p>
                    <p> Here are some technologies I have been working with: </p>
                    <ul>
                        <li>C++</li>
                        <li>Java</li>
                        <li>Python</li>
                        <li>React.js</li>
                        <li>Node.js</li>
                        <li>SQL</li>
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