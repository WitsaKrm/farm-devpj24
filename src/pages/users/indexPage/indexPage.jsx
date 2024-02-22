import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NodeBox from "../../../components/node/node";
import LineNotifyButton from "../../../components/Notify_btn/notify_button";
import style from "./indexPage.module.css";
import AppHeader from "../../../components/header/app-header";
import { SETUIDLocal } from "../../../services/tkEndcoded.service";
import { FetchDevicesByUid } from "../../../services/API/node.api";
import { authenticate } from "../../../services/API/auth.api";
import svg from "../../../assets/svg/svg";
import { GetUserById } from "../../../services/API/user.api";

const USER_URL = `/user/id`;
const DEVICE_URL = `/devices`;
const AUTH_URL = `/authen`;

const IndexPage = () => {
  const history = useHistory();
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      authenticate(AUTH_URL, history);
      SETUIDLocal();
      const UID = localStorage.getItem("UID");
      setUID(UID);
      try {
        await FetchDevicesByUid(setDevices, DEVICE_URL, UID);
        setIsLoading(false);
        await GetUserById(setUser, USER_URL, UID);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [history]);

  const handleNodeClick = (userId, type, nodeId, lat, lon) => {
    const encodedUserId = encodeURIComponent(userId);
    const encodedNodeId = encodeURIComponent(nodeId);
    const encodedType = encodeURIComponent(type);
    const encodedLat = encodeURIComponent(lat);
    const encodedLon = encodeURIComponent(lon);
    const encodedLatLon = `lat=${encodedLat}&lon=${encodedLon}`;
    console.log(encodedType);
    const enURL = `/${encodedType}/${encodedUserId}${encodedNodeId}?${encodedLatLon}`;

    history.push(enURL);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AppHeader header="ComputerEng PROJECT" />
      <div className={`container-fluid ${style.indexPageContainer}`}>
        <div className={style.LineNotifyButton}>
          {user.map((u, idx) => (
            <div key={idx}>
              {u.line_acctk !== null && u.line_acctk !== " " ? (
                <>{u.line_acctk}</>
              ) : (
                <div>
                  <LineNotifyButton src={svg.line.default} userId={uid} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="row">
          {devices.map(
            (station) =>
              station.type === "station" && (
                <div className="col-md-3 col-sm-6" key={station.d_id}>
                  <div className={`node d-flex ${style.nodeBox}`}>
                    <NodeBox
                      name={station.d_name.toUpperCase()}
                      src={svg.station.default}
                      status={station.status.toString()}
                      handleNodeClick={() =>
                        handleNodeClick(
                          station.user_id,
                          "station",
                          station.d_id,
                          station.lat,
                          station.lon
                        )
                      }
                    />
                  </div>
                </div>
              )
          )}
        </div>
        <div className="row">
          {devices.map(
            (node) =>
              node.type === "node" && (
                <div className="col-md-3 col-sm-6" key={node.d_id}>
                  <div className={`node d-flex ${style.nodeBox}`}>
                    <NodeBox
                      name={node.d_name.toUpperCase()}
                      src={svg.node.default}
                      status={node.status.toString()}
                      handleNodeClick={() =>
                        handleNodeClick(
                          node.user_id,
                          node.type === "station" ? "station" : "senser",
                          node.d_id,
                          node.lat,
                          node.lon
                        )
                      }
                    />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
