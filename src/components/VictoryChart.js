import React from "react";
import * as Recharts from "recharts";
import styled from "styled-components";

const Container = styled.div``;
const { PieChart, Pie, Cell } = Recharts;

const PieCharts = props => {
  const data = [
    { name: "Wins", value: props.count },
    { name: "Loses", value: props.lostcount }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
      <Container className="card grid-card is-card-dark ">
        <Container className="card-heading">
          <Container className="is-dark-text-light letter-spacing text-small">
            Winning and Loosing Stats
          </Container>
        </Container>
        <PieChart
          width={200}
          height={200}
          className="ssp-700"
          style={{ float: "center" }}
        >
          <Pie
            data={data}
            cx={100}
            cy={110}
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                dataKey={entry.value}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Container>
    </Container>
  );
};

export default PieCharts;
