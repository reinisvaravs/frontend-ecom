import { useEffect, useRef } from "react";
import css from "./LandingPage.module.css";
import videoFile from "../assets/car.mp4";
import JoinBtn from "../components/JoinBtn";
import InfoContent from "../components/InfoContent";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LandingPage() {
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
    <div className={css.landingPage}>
      <Header />
      <main className={css.main}>
        <h1>
          Money making is <b>a skill</b>
        </h1>
        <h2>
          We will teach you how to <b>master it</b>
        </h2>
        <div className={css.videoContainer}>
          <video width="100%" controls className={css.video}>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <JoinBtn />

        <div className={css.info}>
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
          <div className={css.infoContent}>
            <InfoContent />
            <JoinBtn />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
