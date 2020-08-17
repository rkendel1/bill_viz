///////CREATE CHART AREA////////

var margin = { top: 20, right: 200, bottom: 20, left: 5 },
    width = 450 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svgNo = d3.select("#chart").append("svg")
    .attr("width", width + margin.left * 2)
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

//create div tag to hold tool tips
var toolTip = d3.select("#chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//make tool tip div visible
var mouseover = function (d) {
    toolTip
        .style("opacity", 1)
        .style("left", "50px")
        .style("top", "75px")
    //highlight circle mouse is on with a black border
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
};

//get pixel location of mouse and create tool tip text with that tag's data
var mousemove = function (d) {
    toolTip
        .html(`${d[1] - d[0]} votes `)
        .style("left", "500px")
        .style("top", "150px")
};

//make div tag invisible upon mouse out
var mouseleave = function (d) {
    toolTip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
};