///////CREATE CHART AREA////////



///check margins vs padding. may be interferings with axis and nos running into yeses
var margin = { top: 50, right: 5, bottom: 20, left: 5 },
    width = 450 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svgNo = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svgNo")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var svgYes = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svgYes")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");