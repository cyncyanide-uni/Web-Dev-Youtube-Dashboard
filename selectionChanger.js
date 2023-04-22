import { chartData } from "./chartData.js";
import { myChart, createLinechart } from "./lineChart.js";
import { createPiechart } from "./pieChart.js";
import { addChart } from "./index.js";
console.log(chartData);
createPiechart([
  { label: "Male", value: 80 },
  { label: "Female", value: 20 },
]);
let selectedChannel = 0;

const selection = document.getElementById("ChannelList");
const pieEle = document.getElementById("pie");
selection.addEventListener("change", async () => {
  const title = document.getElementById("ytTitle");
  selectedChannel = selection.selectedIndex;
  const currentChart = document.getElementById("chart");
  currentChart.innerHTML = "";
  addChart(selectedChannel);
  await myChart.destroy();
  pieEle.innerHTML = "";
  if (selectedChannel == 1) {
    title.innerText = "Huberman Labs";
    createPiechart([
      { label: "Male", value: 70 },
      { label: "Female", value: 30 },
    ]);
  }
  if (selectedChannel == 2) {
    title.innerText = "Lex Fridman";
    createPiechart([
      { label: "Male", value: 65 },
      { label: "Female", value: 35 },
    ]);
  }
  if (selectedChannel == 0) {
    title.innerText = "Flagarant";
    createPiechart([
      { label: "Male", value: 80 },
      { label: "Female", value: 20 },
    ]);
  }

  createLinechart({
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
        data: chartData[selectedChannel].monthlyGainedSubs,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  });
});
