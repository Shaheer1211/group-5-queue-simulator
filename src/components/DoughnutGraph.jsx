import React from 'react'
import { Doughnut } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from "chart.js/auto"

function DoughnutGraph({chartData}) {
    const data = {
        labels: ["Utilization", "Idle"].map(data => data),
        datasets: [{
          label: chartData.ServerNo,
          data: [chartData.utilization, 100 - chartData.utilization].map(data => data),
          backgroundColor: ["#2daab8", "#EDEDED"]
        }]
    }
  return (
    <div className=''>
        <Doughnut data={data} />
    </div>
  )
}

export default DoughnutGraph