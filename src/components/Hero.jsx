import css from "../pages/home/Home.module.css";
import videoFile from "../assets/videos/car.mp4";
import JoinBtn from "./JoinBtn";

function Hero() {
  return (
    <>
      <p className={css.parag}>Everything is a functioning DEMO of an E-COMMERCE store with STRIPE invoices in test mode</p>
      <h1 className={css.heroh1}>
        Money making is <b>a skill</b>
      </h1>
      <h2 className={css.heroh2}>
        We will teach you how to master it <b>using code</b>
      </h2>
      <div className={css.videoContainer}>
        <video width="100%" controls className={css.video}>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="videoP">VSL goes here</p>
      </div>
      <JoinBtn />
    </>
  );
}

export default Hero;
