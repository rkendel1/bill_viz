///////CREATE CHART AREA////////

var margin = { top: 50, right: 20, bottom: 100, left: 65 },
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "d3-plot")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
