import React from "react";
import PropTypes from "prop-types";
import style from "./sensers.module.css";

  const SenSers = (props) => {
  
    return (
      <button className={style.sscontainer} onClick={props.handleSenserClick}>
        <div className={style.ssname}>
          <span>{props.nameEN}</span>
          <br />
          <span>{props.nameTH}</span>
        </div>
        <div className={style.ss}>
          <div className={style.ssimgcontainer}>
            <img className={style.ssimg} src={props.src} alt="Sensor Icon" />
          </div>
          <div className={style.datass}>
            <div className={style.data}>
              <h1 className={style.ssvalue}>
                {props.values} {props.unit}
              </h1>
            </div>
          </div>
        </div>
        <div className={style.updateTime}>
          <p className={style.updatetimetext}>อัพเดตเมื่อ: {props.date} , {props.time}</p>
        </div>
      </button>
    );
  };
  
  SenSers.propTypes = {
    nameEN: PropTypes.string.isRequired,
    nameTH: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    unit: PropTypes.string.isRequired,
  };
  
  export default SenSers;