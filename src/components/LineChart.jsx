import { Line } from 'react-chartjs-2';

function LineChart({chartData}) {
  return (
    <div>
      <Line
        data={chartData}
      />
    </div>
  )
}

export default LineChart