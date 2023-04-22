// Get the canvas element
var ctx = document.getElementById("myChart").getContext("2d");
import { chartData } from "./chartData.js";

const currentChart = document.getElementById("myChart");

var lineChartData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "subscriber growth per month",
      data: chartData[0].monthlyGainedSubs,
      borderColor: "rgba(75, 192, 192, 1)",
    },
  ],
};
var myChart;
// Create the line chart
myChart = new Chart(ctx, {
  type: "line",
  data: lineChartData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function createLinechart(lineChartData) {
  myChart = new Chart(ctx, {
    type: "line",
    data: lineChartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

export { myChart, createLinechart };
// Define the lineChartData for the line chart
