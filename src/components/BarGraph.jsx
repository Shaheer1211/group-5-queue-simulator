import React from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from "chart.js/auto"

function BarGraph({chartData}) {
  return (
    <div>
      <Bar
        data={chartData}
      />
    </div>
  );
}

export default BarGraph;
