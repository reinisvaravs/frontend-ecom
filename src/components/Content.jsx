import css from "../pages/home/Home.module.css"
import { FaCheck } from "react-icons/fa";

function Content({ p, bold, p2 }) {
  return (
    <div className={css.content2}>
      <FaCheck className={css.faCheck} />
      <p>
        {p} <span>{bold}</span> {p2}
      </p>
    </div>
  );
}

export default Content;
