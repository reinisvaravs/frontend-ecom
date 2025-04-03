import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import Content from "./Content";
import ContentHeader from "./ContentHeader";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiUpgrade } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import css from "../pages/home/Home.module.css";

function InfoContent() {
  return (
    <>
      <img src={img1} className={css.infoContentImg} />
      <ContentHeader h1="Benefits of the program" icon={<IoSchool />} />
      <Content bold="Coding certifications" p2="(HTML5, CSS3, Javascript)" />
      <Content
        bold="Regular group Zoom meetings"
        p2="for coaching, Q&A and discussions"
      />
      <Content p="Immediate access to our pro coder community" />
      <Content p="A flexible schedule" />
      <Content p="Self-paced learning" />
      <Content p="Lifetime access" />

      <img src={img2} className={css.infoContentImg} />
      <ContentHeader
        h1="Insight into what you'll learn"
        icon={<FaPeopleGroup />}
      />
      <Content
        bold="Learn:"
        p2="pro level HTML5, CSS3, Javascript / ES6, SQL, React.js, Node.js, Express.js"
      />
      <Content
        bold="Learn:"
        p2="data structures, algorithms, design patterns and refactoring"
      />
      <Content
        bold="Soft skills:"
        p2="job interview prep, resume building, landing your first job, freelancing."
      />

      <img src={img3} className={css.infoContentImg} />
      <ContentHeader h1="What you'll become" icon={<GiUpgrade />} />
      <Content p="From beginner to" bold="confident developer" />
      <Content
        p="Gain the skills to build"
        bold="real-world apps and portfolios"
      />
      <Content
        p="Land your first job as a"
        bold="frontend or fullstack developer"
      />
      <Content
        p="Learn to"
        bold="think like an engineer"
        p2="and solve problems like a pro"
      />
      <Content p="Become part of a movement of" bold="self-made coders" />
    </>
  );
}

export default InfoContent;
