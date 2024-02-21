import React from "react";
import PropTypes from "prop-types";
import style from "./box.module.css";

const Box = (props) => {
  return (
    <>
      <div className={style.box}>
        <div className={style.detail}>
        {props.detail}
        </div>
      </div>
    </>
  );
};

export default Box;
