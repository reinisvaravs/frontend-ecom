import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.avif";
import img3 from "../assets/images/img3.avif";
import Content from "./Content";
import ContentHeader from "./ContentHeader";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import css from "../pages/home/Home.module.css";

function InfoContent({ thirdImg }) {
  return (
    <>
      <img src={img1} className={css.infoContentImg} />
      <ContentHeader h1="Learn vital" bold="life lessons" icon={<IoSchool />} />
      <Content p="World-class" bold="custom built learning application" />
      <Content
        p="Scale from"
        bold="Zero to $10k/month"
        p2="as fast as possible"
      />
      <Content p="Master the skills you need to" bold="maximise your income" />

      <img src={img2} className={css.infoContentImg} />
      <ContentHeader
        h1="Join a private"
        bold="network"
        icon={<FaPeopleGroup />}
      />
      <Content
        p=""
        bold="Celebrate your wins"
        p2="with people who understand"
      />
      <Content p="Make" bold="like-minded friends" p2="on your journey" />
      <Content bold="Network with 113,000+ people" />

      <img src={img3} className={`${css.infoContentImg} ${thirdImg}`} />
      <ContentHeader
        h1="Access to"
        bold="multimillionaires"
        icon={<GiMoneyStack />}
      />
      <Content
        p="Mentors are"
        bold="hyper-successful"
        p2="experts in their field"
      />
      <Content p="Get" bold="mentored every step" p2="of your journey" />
      <Content bold="1-on-1 advice" p2="from industry experts" />
    </>
  );
}

export default InfoContent;
