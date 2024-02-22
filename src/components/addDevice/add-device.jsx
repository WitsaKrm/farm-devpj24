import React, { useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../services/API/axios";
import style from "./add-device.module.css";

const ADDDEVICE_URL = "/add-device";

const AddDevice = ({ userData }) => {

  const [dataGroup, setDataGroup] = useState({
    d_name: "",
    type: "",
    lon: "",
    lat: "",
    // status: "",
    user_id: "",
  });

  const [succ, setSucc] = useState(false);
  const [error, setError] = useState(null);

  const errRef = useRef(); // Assuming you need this ref
console.log('123456');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userData.user_id) {
        const { deviceName, type, lon, lat } = dataGroup;
        const newDevice = {
          d_name: deviceName,
          type: type,
          lon: lon,
          lat: lat,
          user_id: userData.user_id,
        };
        const response = await API.post(ADDDEVICE_URL, newDevice);
        if (response.status === 200) {
          setSucc(true);
          window.location.reload();
        } else {
          setError("Error updating device: " + response.statusText);
        }
      } else {
        setError("Invalid user_id. Update not performed.");
      }
    } catch (error) {
      setError("Error updating device: " + error.message);
    }
  };

  return (
    <div className={style.container}>
      {succ ? (
        <section className={style.section}>
          <h1>
            Success ! <br /> Reloading ...
          </h1>
        </section>
      ) : (
        <section className={style.section}>
          <p
            ref={errRef}
            className={dataGroup.errMsg ? style.errmsg : style.offscreen}
            aria-live="assertive"
          >
            {dataGroup.errMsg}
          </p>
          <h1 className={style.h1}>ADD DEVICES</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="d_name">ชื่ออุปกรณ์ : </label>
            <input
              type="text"
              id="d_name"
              autoComplete="off"
              onChange={(e) =>
                setDataGroup((prevState) => ({
                  ...prevState,
                  deviceName: e.target.value,
                }))
              }
              required
            />
            <div className={style.selectrole}>
              <label htmlFor="type">
                ประเภทอุปกรณ์ :
                <span
                  className={
                    dataGroup.type === "station" || dataGroup.type === "node"
                      ? style.valid
                      : style.hide
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>

              <select
                id="type"
                required
                value={dataGroup.type}
                onChange={(e) =>
                  setDataGroup((prevState) => ({
                    ...prevState,
                    type: e.target.value,
                  }))
                }
              >
                <option value="">Select type</option>
                <option value="station">station</option>
                <option value="node">node</option>
              </select>
            </div>

            <label htmlFor="lon">ลองติจูด : </label>
            <input
              type="text"
              id="lon"
              autoComplete="off"
              onChange={(e) =>
                setDataGroup((prevState) => ({
                  ...prevState,
                  lon: e.target.value,
                }))
              }
              required
            />
            <label htmlFor="lat">ละติจูด : </label>
            <input
              type="text"
              id="lat"
              autoComplete="off"
              onChange={(e) =>
                setDataGroup((prevState) => ({
                  ...prevState,
                  lat: e.target.value,
                }))
              }
              required
            />

            <button className={style.addBtt}>ADD DEVICE</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AddDevice;
