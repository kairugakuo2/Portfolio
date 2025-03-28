import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/FadeInSection.css"; // styles

// ref is assigned to section to observe
// inView is true when element is visible
// useInView hook determines when element is in viewport
const FadeInSection = ({children}) => {
    const { ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1, // trigger when 10% of element is visible
    });

    let className = "fade-in-section";
    if (inView) {
        className += " is-visible";
    }

    return (
        <div ref={ref} className={className} >
            {children}
        </div>
    );
};

export default FadeInSection;