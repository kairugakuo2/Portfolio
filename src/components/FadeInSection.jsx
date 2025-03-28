import React from "react";
import FadeIn from "react-fade-in";
import { useInView } from "react-intersection-observer";

// ref is assigned to section to observe
// inView is true when element is visible
// useInView hook determines when element is in viewport
const FadeInSection = ({children}) => {
    const { ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1, // trigger when 50% of element is visible
    });

    return (
        <div ref={ref}>
            {inView && (
                <FadeIn transitionDuration={1900}>
                    {children}
                </FadeIn>
            )}
        </div>
    );
};

export default FadeInSection;