import React from "react";
import style from "./chart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    dateTime: `${item.date} ${item.time}`,
  }));
  return (
    <>
      <div className={style["chart-container"]}>
        <div className={style.filter}>
          
        </div>
        <div className={style.chart}></div>
        <ResponsiveContainer
          className={style["responsive-container"]}
          width="95%"
          height={450}
        >
          <AreaChart
            width={650}
            height={350}
            data={formattedData}
            margin={{ top: 10, right: 30, left: 50, bottom: 100 }}
          >
            <defs>
              <linearGradient
                id="temp"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
              <linearGradient
                id="WL"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
              <linearGradient
                id="humi"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
              <linearGradient
                id="mois"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
              <linearGradient
                id="light"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
            </defs>
            <XAxis
              dataKey="dateTime"
              tickCount={10}
              angle={-45}
              textAnchor="end"
            />
            <YAxis domain={[-30, 100]} tickCount={10} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="air_temp"
              stroke="	#FF0000"
              fillOpacity={1}
              fill="url(temp)"
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#000099"
              fillOpacity={1}
              fill="url(WL)"
            />
            <Area
              type="monotone"
              dataKey="air_humi"
              stroke="#6666FF"
              fillOpacity={1}
              fill="url(humi)"
            />
            <Area
              type="monotone"
              dataKey="soil_mois"
              stroke="#663300"
              fillOpacity={1}
              fill="url(mois)"
            />
            <Area
              type="monotone"
              dataKey="light"
              stroke="#FFA500"
              fillOpacity={1}
              fill="url(light)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
