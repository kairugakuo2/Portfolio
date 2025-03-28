import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navContainer">
                <div id="leftNav">
                    <a href="#" className="navbar-brand">Gakuo Kairu</a>

                    <a href='#about'>About</a>
                    <a href='#experience'>Experience</a>
                    <a href='#projects'>Projects</a>
                </div>

                <div id="rightNav">
                    <a target="_blank" href="mailto:kairugakuo2@gmail.com">Email</a>
                    <a target="_blank" href="https://github.com/kairugakuo2">GitHub</a>
                    <a target="_blank" href="https://www.linkedin.com/in/gakuo/">Linkedin</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar