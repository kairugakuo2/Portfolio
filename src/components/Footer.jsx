import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../context/ThemeContext";
import "../styles/App.css";

const Footer = () => {
    const year = new Date().getFullYear();
    const { theme } = useTheme();

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
            <div className="status-bar" aria-hidden="true">
                <div className="status-group">
                    <span className="status-item">⎇ main</span>
                    <span className="status-item">Norman, OK</span>
                </div>
                <div className="status-group">
                    <span className="status-item">UTF-8</span>
                    <span className="status-item">{theme}</span>
                </div>
            </div>
            <span className="footer-copyright">&copy; {year} Gakuo Kairu. Built with React.</span>
        </footer>
    );
};

export default Footer;
