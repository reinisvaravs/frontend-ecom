import css from "./Home.module.css";
import JoinBtn from "../../components/JoinBtn";
import InfoContent from "../../components/InfoContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/ProgressBar";
import Hero from "../../components/Hero";
import videoBg from "../../assets/videos/matrixBg.mp4";

function LandingPage() {
  return (
    <div className={css.landingPage}>
      <div className="videoDiv">
        <video
          src={videoBg}
          className="video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <Header />
      <Hero />
      <div className={css.info}>
        <ProgressBar />
        <div className={css.infoContent}>
          <InfoContent />
        </div>
      </div>
      <JoinBtn />
      <Footer />
    </div>
  );
}

export default LandingPage;
