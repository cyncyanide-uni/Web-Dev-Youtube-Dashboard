import { chartData } from "./chartData.js";
import { myChart, createLinechart } from "./lineChart.js";

function addChart(selectedChannel) {
  let data = [];
  console.log(selectedChannel);
  for (let i = 0; i < 5; i++) {
    const views = Number(
      chartData[selectedChannel].barGraphChartData[i].videoStatistics.viewCount
    );
    const title = chartData[selectedChannel].barGraphChartData[i].videoTitle;
    const currentData = {
      views,
      title,
    };
    data.push(currentData);
  }
  const chartWidth = 800;
  const chartHeight = 300;
  const margin = { top: 40, right: 20, bottom: 150, left: 100 };
  const barWidth = (chartWidth - margin.left - margin.right) / data.length;

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .padding(0.1)
    .domain(data.map((d) => d.title));

  const yScale = d3
    .scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, (d) => d.views) + 20000]);

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const yAxisText = d3.select(".axis-y").selectAll("text");

  // Apply styles
  yAxisText
    .style("font-size", "144px")
    .style("fill", "#333")
    .style("font-family", "Arial, sans-serif")
    .style("font-weight", "semibold");

  const bars = svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.title))
    .attr("y", (d) => yScale(d.views))
    .attr("width", barWidth)
    .attr("height", (d) => chartHeight - yScale(d.views))
    .on("mouseover", function () {
      d3.select(this).transition().duration(200).attr("fill", "#004F82");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("fill", "#0072C6");
    });

  svg.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll(".tick text")
    .call(wrap, xScale.bandwidth());

  svg.selectAll(".tick text").style("font-size", "20px");
  function wrap(text, width) {
    text.each(async function () {
      var text = d3.select(this),
        words = await text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }
}
addChart(0);
export { addChart };
