import React, { useEffect, useState } from "react";
import style from "./waterlevel.module.css";

const WaterAnimation = (props) => {
  const [waterHeight, setWaterHeight] = useState(0);

  useEffect(() => {
    const factors = [-15, -10, -5, 0, 5, 10];
    const targetHeights = [0.063, 0.28, 0.495, 0.715, 0.935, 1.157];

    let targetHeight = props.maxWaterHeight;
    for (let i = 0; i < factors.length; i++) {
      if (props.data.current_level <= factors[i]) {
        targetHeight = props.maxWaterHeight * targetHeights[i];
        break;
      }
    }

    setWaterHeight(targetHeight);
  }, [props.data.current_level, props.maxWaterHeight]);

  return (
    <>
      <div className={style.ani_container}>
        <div className={style.date}>
          <h5>วันที่ {props.data.start_date}, เวลา {props.data.start_time}</h5>
        </div>
        <div className={style.glass}>
          <div
            id="water"
            className={
              props.data.current_level === null || props.data.current_level === ""
                ? style.water
                : props.data.current_level < -5
                ? style.waterlow
                : style.waterhigh
            }
            style={{ height: `${waterHeight}px` }}
          ></div>
          <div className={style.Cmlevel}>
            <h3> 10 Cm</h3>
            <h3> 5 Cm</h3>
            <h3> 0 Cm</h3>
            <h3>-5 Cm</h3>
            <h3>-10 Cm</h3>
            <h3>-15 Cm</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaterAnimation;
