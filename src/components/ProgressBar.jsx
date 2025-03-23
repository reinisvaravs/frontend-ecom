import css from "../pages/LandingPage.module.css";
import { useEffect, useRef } from "react";

function ProgressBar() {
    const progressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const infoElement = document.querySelector(`.${css.info}`);
      const progressEl = progressBarRef.current;

      if (!infoElement || !progressEl) return;

      const rect = infoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const infoTop = rect.top;
      const infoHeight = rect.height;

      const visibleStart = windowHeight - 700; // When top of .info hits bottom of screen (-400 because it starts faster)
      const visibleEnd = -infoHeight + 1200; // When bottom of .info has passed top of screen (+400 because it ends faster)

      // Total scroll distance over which we want to animate
      const totalScrollable = visibleStart - visibleEnd;

      // Current scroll progress in that range
      const scrolledAmount = visibleStart - infoTop;

      const percent = (scrolledAmount / totalScrollable) * 100;

      // Clamp between 0 and 100
      const clamped = Math.min(Math.max(percent, 0), 100);
      progressEl.style.height = `${clamped}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={css.progressBarDiv}>
      <div ref={progressBarRef} className={css.progressBar}></div>
      <div className={css.progressBarHalf}>
        <div className={css.dot} />
      </div>
      <div className={css.progressBarTop}>
        <div className={css.dot} />
      </div>
      <div className={css.progressBarBottom}>
        <div className={css.dot} />
      </div>
    </div>
  );
}

export default ProgressBar;
