import React from "react";
import css from "../pages/LandingPage.module.css";

function ContentHeader({ bold, h1, icon }) {
  return (
    <div className={css.content1}>
      <div className={css.iconDiv}>
        {React.cloneElement(icon, { className: css.icon })}
      </div>
      <h1>
        {h1} <b>{bold}</b>
      </h1>
    </div>
  );
}

export default ContentHeader;
