// LineNotifyButton.jsx
import React from "react";
import style from "./node.module.css";
import { notifyRegis } from "../../services/API/linenotify";

const LineNotifyButton = ({src ,userId}) => {
  const handleRegisterNotify = async () => {

      await notifyRegis(userId);
  };

  return (
    <div className={style.lineNotifyBTN}>
      <button className={`btn btn-success`} onClick={handleRegisterNotify}>
        Register Line Notify
        <img className={style.linelogo} src={src} alt="LineNotify" />
      </button>
    </div>
  );
};

export default LineNotifyButton;
