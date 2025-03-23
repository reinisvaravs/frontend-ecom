import postgreLogo from "../assets/icons/postgre.svg";
import expressLogo from "../assets/icons/express.svg";
import reactLogo from "../assets/icons/react.svg";
import nodeLogo from "../assets/icons/node.svg";
import stripeLogo from "../assets/icons/stripe.svg";
import css from "../pages/home/Home.module.css";

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
