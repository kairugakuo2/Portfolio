import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import "../styles/App.css";

const NavBar = () => {

    return (
        <nav className="navbar">
            <div className="navContainer">
                {/* Brand / Name */}
                <a href="#" className="navbar-brand">Gakuo Kairu</a>

                {/* Full nav links – always visible on desktop, dropdown on mobile */}
                <div className={"navLinks"}>
                    <div id="leftNav">
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#projects">Projects</a>
                    </div>
                    <div id="rightNav">
                        <a target="_blank" href="mailto:kairugakuo2@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                        </a>
                        <a target="_blank" href="https://github.com/kairugakuo2">
                            <FontAwesomeIcon icon={faGithub} className="socialIcon"/>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/gakuo/">
                            <FontAwesomeIcon icon={faLinkedin} className="socialIcon"/>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;