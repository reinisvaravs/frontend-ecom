import css from "./LandingPage.module.css";
import JoinBtn from "../components/JoinBtn";
import InfoContent from "../components/InfoContent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/progressBar";
import Hero from "../components/Hero";

function LandingPage() {
  return (
    <div className={css.landingPage}>
      <Header />
        <Hero />
        <div className={css.info}>
          <ProgressBar />
          <div className={css.infoContent}>
            <InfoContent />
            <JoinBtn />
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
