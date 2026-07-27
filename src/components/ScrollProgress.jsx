import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
};

export default ScrollProgress;
