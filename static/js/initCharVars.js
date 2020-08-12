var margin = { top: 50, right: 20, bottom: 10, left: 65 },
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .3);

var x = d3.scale.linear()
    .rangeRound([0, width]);
    
var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var color = d3.scale.ordinal()
    .range(["#c7001e", "#cccccc", "#086fad"]);
    
color.domain(["Republican", "Independent", "Democrat"])


var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "d3-plot")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
