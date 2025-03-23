import postgreLogo from "../assets/postgre.svg";
import expressLogo from "../assets/express.svg";
import reactLogo from "../assets/react.svg";
import nodeLogo from "../assets/node.svg";
import stripeLogo from "../assets/stripe.svg";
import css from "../pages/LandingPage.module.css";

function Footer() {
  return (
    <footer className={css.stackIconDiv}>
      <img src={postgreLogo} alt="postgreLogo" className={css.stackIcons} />
      <img src={expressLogo} alt="expressLogo" className={css.stackIcons} />
      <img src={reactLogo} alt="reactLogo" className={css.stackIcons} />
      <img src={nodeLogo} alt="nodeLogo" className={css.stackIcons} />
      <img src={stripeLogo} alt="stripeLogo" className={css.stackIcons} />
    </footer>
  );
}

export default Footer;
