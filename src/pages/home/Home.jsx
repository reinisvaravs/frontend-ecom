import css from "./Home.module.css";
import JoinBtn from "../../components/JoinBtn";
import InfoContent from "../../components/InfoContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/ProgressBar";
import Hero from "../../components/Hero";

function LandingPage() {
  return (
    <div className={css.landingPage}>
      <Header />
      <Hero />
      <div className={css.info}>
        <ProgressBar />
        <div className={css.infoContent}>
          <InfoContent thirdImg={css.thirdImage} />
        </div>
      </div>
      <JoinBtn style={{ background: "#09111c" }} />
      <Footer />
    </div>
  );
}

export default LandingPage;
