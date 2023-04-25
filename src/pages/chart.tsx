import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      datasets: [
        {
          label: "Sales",
          data: [32, 45, 12, 76, 69],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
