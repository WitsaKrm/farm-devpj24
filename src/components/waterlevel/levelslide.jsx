import React, { useState } from "react";
import { createRoot } from "react-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import style from "./levelslide.module.css";

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: -15,
    label: "-15 Cm",
  },
  {
    value: -10,
    label: "-10 Cm",
  },
  {
    value: -5,
    label: "-5 Cm",
  },
  {
    value: 0,
    label: "0 Cm",
  },
  {
    value: 5,
    label: "5 Cm",
  },
  {
    value: 10,
    label: "10 Cm",
  },
];

const Wlevel = (props) => {
  const { data, handleMode } = props;
  const [sliderValue, setSliderValue] = useState(
    parseInt(data.current_level, 10)
  );

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleSetValue = (e) => {
    e.preventDefault();
    if (sliderValue !== undefined) {
      const dataGroup = {
        pump_st: "ON",
        current_level: data.current_level,
        go_level: sliderValue,
        st_mode: "MANUAL",
        devices_node_id: data.devices_node_id,
      };
      handleMode(dataGroup);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    if (sliderValue !== undefined) {
      const dataGroup = {
        pump_st: "OFF",
        current_level: data.current_level,
        go_level: data.current_level,
        st_mode: "NONE",
        devices_node_id: data.devices_node_id,
      };
      handleMode(dataGroup);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "16px 0",
      }}
    >
      <Slider
        aria-label="Water Level"
        value={sliderValue}
        onChange={handleSliderChange}
        color={sliderValue < -5 || sliderValue > 10 ? "error" : "primary"}
        track="inverted"
        aria-labelledby="track-inverted-slider"
        getAriaValueText={valuetext}
        defaultValue={30}
        marks={marks}
        min={-15}
        max={10}
        step={5}
        // disabled={sliderValue <= 0 }
      />

      <div className={style.butt_setvl} style={{ margin: "32px 0 0 0" }}>
        <button className="btn btn-success" onClick={handleSetValue}>
          ตั้งค่าระดับน้ำ
        </button>
        {data.st_mode === "MANUAL" && (
          <button
            className={`${style.btn}  btn btn-danger`}
            onClick={handleCancel}
          >
            ยกเลิกการทำงาน
          </button>
        )}
      </div>
    </Box>
  );
};

export default Wlevel;
