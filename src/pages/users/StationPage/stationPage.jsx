import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../../components/header/app-header";
import style from "./stationPage.module.css";
import Box from "../../../components/box/box";
import { useParams, useLocation } from "react-router-dom";
import WaterLevel from "../../../components/waterlevel/waterlevel";
import LevelSlide from "../../../components/waterlevel/levelslide";
import Maps from "../../../components/maps/map";
import { FetchMode, SetModeNewStation } from "../../../services/API/mode.api";
import endpoint from "../../../services/API/axios";

const MODE_URL = "/mode";

const StationPage = () => {
  const { nodeId } = useParams();
  const history = useHistory();
  const [modeData, setModeData] = useState([]);
  const [isAutoVisible, setIsAutoVisible] = useState(false);
  const [isManualVisible, setIsManualVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [succ, setSucc] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");

  useEffect(() => {
    async function fetchData() {
      try {
        await SetModeNewStation(setModeData, MODE_URL, `${nodeId}`);
        await FetchMode(setModeData, MODE_URL, `${nodeId}`); // Await this promise
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [nodeId]);

  const handleStart = (e) => {
    e.preventDefault();
    const dataGroup = {
      pump_st: "ON",
      current_level: modeData.current_level,
      go_level: modeData.current_level,
      st_mode: "AUTO",
      devices_node_id: modeData.devices_node_id,
    };
    handleMode(dataGroup);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    const dataGroup = {
      pump_st: "OFF",
      current_level: modeData.current_level,
      go_level: modeData.current_level,
      st_mode: "NONE",
      devices_node_id: modeData.devices_node_id,
    };
    handleMode(dataGroup);
  };
  const toggleManual = () => {
    setIsManualVisible(!isManualVisible);
  };

  const toggleAuto = () => {
    setIsAutoVisible(!isAutoVisible);
  };

  const autoContent = () => (
    <>
      <h1>AUTO mode</h1>
      <Box
        detail={
          <div>
            <h3>เริ่มต้นทำงานวันที่ 7/9/2566</h3>
            <h3>ลำดับการทำงาน</h3>
            <ul>
              <li>เพิ่มระดับน้ำในนา 5 ซม. เพื่อกำจัดวัชพืชขังนาน 3 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>
                เมื่อข้าวอยู่ในระยะแตกกอสูงสุด เพิ่มระดับน้ำในนาสูง 5 ซม.
                ขังไว้นาน 3 วัน
              </li>
              <li>รอ 7 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 20 วัน ปล่อยให้น้ำแห้ง</li>
            </ul>
            <p>*</p>
          </div>
        }
      />
      <div className={style.btt}>
        {modeData.st_mode === "AUTO" ? (
          <div className={`btn btn-danger ${style.btn}`} onClick={handleCancel}>
            ยกเลิกการทำงาน
          </div>
        ) : (
          <div className={`btn btn-primary ${style.btn}`} onClick={handleStart}>
            เริ่มการทำงาน
          </div>
        )}
      </div>
    </>
  );
  const manualContent = (modeData) => (
    <>
      <h1>MANUAL</h1>
      <div className={style.box_manual}>
        <WaterLevel data={modeData} maxWaterHeight={300}></WaterLevel>
        <LevelSlide data={modeData} handleMode={handleMode}></LevelSlide>
      </div>
    </>
  );
  const handleMode = async (dataGroup) => {
    try {
      const response = await endpoint.put(
        `${MODE_URL}/${modeData.devices_node_id}`,
        dataGroup
      );
      console.log(response);
      if (response.status === 200) {
        setSucc(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setError("Error updating Mode: " + response.statusText);
      }
    } catch (error) {
      setError("Error updating Mode: " + error.message);
    }
  };
  const handleAutoClick = () => {
    setIsAutoVisible(true);
    setIsManualVisible(false);
  };
  const handleManualClick = () => {
    setIsAutoVisible(false);
    setIsManualVisible(true);
  };
  return (
    <>
      <AppHeader header={`STATION  ${nodeId}`} />

      <div className="container">
        <div className={style.btt}>
          <button
            className={`${style.btn} btn btn-dark`}
            onClick={() => {
              handleAutoClick();
              toggleAuto();
            }}
            disabled={modeData.st_mode === "MANUAL"}
          >
            auto
          </button>
          <button
            className={`${style.btn} btn btn-warning`}
            onClick={() => {
              handleManualClick();
              toggleManual();
            }}
            disabled={modeData.st_mode === "AUTO"}
          >
            manual
          </button>
        </div>
        <div className="control">
          {modeData.st_mode === "MANUAL" ? (
            <>{<div className={style.manual}>{manualContent(modeData)}</div>}</>
          ) : modeData.st_mode === "AUTO" ? (
            <>{<div className={style.auto}>{autoContent()}</div>}</>
          ) : (
            <>
              {isManualVisible && (
                <div className={style.manual}>{manualContent(modeData)}</div>
              )}
              {isAutoVisible && (
                <div className={style.auto}>{autoContent()}</div>
              )}
            </>
          )}
        </div>
        <iframe
          className={style.frameMap}
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15308.797879412565!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTYuNDI4NDMsMTAyLjg2MzU5MiA0Mi44NjM1OTIsLTEwMi44NjM1OTI!5e0!3m2!1sen!2sth!4v1708607597187!5m2!1sen!2sth`}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default StationPage;
