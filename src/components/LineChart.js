import React from "react";
import * as Recharts from "recharts";
const { LineChart, Line, XAxis, YAxis, Tooltip } = Recharts;

const Linechart = props => (
  <section className="line-chart-container">
    <span
      className="ssp-400"
      style={{
        position: "absolute",
        top: "15px",
        left: "30px",
        fontSize: "20px",
        marginBottom: "10px",
        color: "#ffffff"
      }}
    >
      Runs per match {props.value}
    </span>
    <LineChart
      width={900}
      height={250}
      data={props.data}
      margin={{ top: 40, right: 30, left: 0, bottom: -10 }}
      className="ssp-400"
      style={{ color: "#e91e63" }}
    >
      <XAxis />
      <YAxis type="number" domain={[0, 200]} allowDataOverflow={true} />
      <Tooltip />
      <Line
        type="monotone"
        stroke=" #cfde1a"
        dataKey="runs"
        strokeWidth="3"
        strokeOpacity="0.85"
        activeDot={{ r: 1 }}
      />
    </LineChart>
    <span
      className="ssp-400"
      style={{
        color: "white",
        position: "absolute",
        bottom: "7px",
        left: "47%"
      }}
    >
      Matches Played
    </span>
  </section>
);

export default Linechart;
