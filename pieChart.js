function createPiechart(pieChartData) {
  const pieWidth = 300;
  const pieHeight = 300;
  const radius = Math.min(pieWidth, pieHeight) / 2;
  const colors = ["#0072C6", "#E84C3D"];

  const svg2 = d3
    .select("#pie")
    .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", `translate(${pieWidth / 2},${pieHeight / 2})`);

  var pie;
  pie = d3.pie().value((d) => d.value);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const slices = pie(pieChartData);

  const path = svg2
    .selectAll("path")
    .data(slices)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colors[i])
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .on("mouseover", function (d) {
      d3.select(this).transition().duration(200).style("opacity", 1);

      const tooltip = d3
        .select(this.parentNode)
        .append("div")
        .attr("class", "tooltip")
        .text(`${d.data.label}: ${d.data.value}%`);

      const rect = this.getBoundingClientRect();
      tooltip
        .style("left", rect.x + rect.width / 2 + "px")
        .style("top", rect.y - 10 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this.parentNode).select(".tooltip").remove();
    });
}

export { createPiechart };
