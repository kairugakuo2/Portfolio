import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [flickering, setFlickering] = useState(false);

    const handleClick = () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion) {
            setFlickering(true);
        }
        toggleTheme();
    };

    return (
        <>
            <button
                type="button"
                className="theme-toggle"
                onClick={handleClick}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
                <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>
            {flickering && (
                <div
                    className="crt-flicker"
                    aria-hidden="true"
                    onAnimationEnd={() => setFlickering(false)}
                />
            )}
        </>
    );
};

export default ThemeToggle;
