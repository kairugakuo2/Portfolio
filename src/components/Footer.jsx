import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../styles/App.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <span className="footer-name">Gakuo Kairu</span>
            <div className="footer-social">
                <a target="_blank" rel="noreferrer" href="mailto:kairugakuo2@gmail.com" aria-label="Email">
                    <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/kairugakuo2" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} className="socialIcon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/gakuo/" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} className="socialIcon" />
                </a>
            </div>
            <span className="footer-copyright">&copy; {year} Gakuo Kairu. Built with React.</span>
        </footer>
    );
};

export default Footer;
