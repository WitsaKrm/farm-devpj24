import React from "react";
import PropTypes from "prop-types";
import style from "./node.module.css";

const Node = (props) => {
  const statusClass = props.status === "1" ? style.online : style.offline;

  return (
    <>
      <button className={style.container} onClick={props.handleNodeClick}>
        <div className={style.node_container}>
          <div className={style.node_img}>
            <img className={style.node_img} src={props.src} alt="Device Icon" />
          </div>

          <div className={style.nodedetails}>
            <div className={style.details}>
              <span className={style.nodename}>{props.name}</span>
              <span className={`${style.statusnode} ${statusClass}`}>
                <span>{props.status === "1" ? "Online" : "Offline"}</span>
              </span>
              <div className={style.owner}>123</div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

Node.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};

export default Node;
