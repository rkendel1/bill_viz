var margin = { top: 40, right: 50, bottom: 60, left: 50 };

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Config
var cfg = {
    labelMargin: 5,
    xAxisMargin: 10,
    legendRightMargin: 0
}

var x = d3.scaleLinear()
    .range([0, width]);

var colour = d3.scaleSequential(d3.interpolatePRGn);

var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var legend = svg.append("g")
    .attr("class", "legend");

legend.append("text")
    .attr("x", width - cfg.legendRightMargin)
    .attr("text-anchor", "end")
    .text("European Countries by");

legend.append("text")
    .attr("x", width - cfg.legendRightMargin)
    .attr("y", 20)
    .attr("text-anchor", "end")
    .style("opacity", 0.5)
    .text("2016 Population Growth Rate (%)");

