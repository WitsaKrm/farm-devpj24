import React, { useEffect } from "react";
import style from "./map.module.css";

const Maps = (props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.longdo.com/map/?key=d50aa5bfdd20b1c8c14056d41f9479cd"; // Replace with your actual LongdoMap API key
    script.async = true;
    script.onload = () => {
      // LongdoMap library is loaded
      const map = new window.longdo.Map({
        placeholder: document.getElementById("longdo-map"),
        zoom: 20,
        location: { lon: props.lon, lat: props.lat },
      });

      const marker = new window.longdo.Marker(
        { lon: props.lon, lat: props.lat },
        {
          title: props.title,
          detail: props.detail,
          weight: window.longdo.OverlayWeight.Top,
        }
      );

      map.Overlays.add(marker);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [props.lon, props.lat]);

  return <div id="longdo-map" className={style.map_container}></div>;
};

export default Maps;
