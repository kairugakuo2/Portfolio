import React, { useState } from "react";
import "../styles/App.css";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navContainer">
                {/* Brand / Name */}
                <a href="#" className="navbar-brand">Gakuo Kairu</a>

                {/* Hamburger icon (only shows on mobile) */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                {/* Full nav links – always visible on desktop, dropdown on mobile */}
                <div className={`navLinks ${menuOpen ? "open" : ""}`}>
                    <div id="leftNav">
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#projects">Projects</a>
                    </div>
                    <div id="rightNav">
                        <a target="_blank" href="mailto:kairugakuo2@gmail.com">Email</a>
                        <a target="_blank" href="https://github.com/kairugakuo2">GitHub</a>
                        <a target="_blank" href="https://www.linkedin.com/in/gakuo/">LinkedIn</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;