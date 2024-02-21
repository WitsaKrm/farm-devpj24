import React from "react";
import style from "./header.module.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {  useLocation } from "react-router-dom";

const AppHeader = (props) => {
  const location = useLocation();
  const handleLogout = () => {
    Swal.fire({
      title: "ออกจากระบบ ?",
      text: "คุณต้องการออกจากระบบ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช้, ออกจากระบบ",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("UID");
        window.location.href = "/login";
      }
    });
  };

  const renderLogoutButton = location.pathname !== "/login" && (
    <i className={style.logoutButton} onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      Logout
    </i>
  );

  return (
    <header className={style.headercontainer}>
      <div className={style.header}>
        <div className={style.headerNav}>
          <div className={style.navlink}>
            <a href="/">{props.header}</a>
          </div>
        </div>
        <div className={style.logout}>
            <button className={style.logoutButton} onClick={handleLogout}>
              {renderLogoutButton}
            </button>
          </div>
      </div>
    </header>
  );
};

export default AppHeader;
