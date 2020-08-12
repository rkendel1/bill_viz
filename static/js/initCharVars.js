var margin = { top: 50, right: 20, bottom: 10, left: 65 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var colorScale = d3.scaleOrdinal()
  .domain(["demYes", "repYes", "indYes"])
  .range(["#086fad", "#c7001e", "#cccccc"]);

var xScale = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain([0, 240])
    .range([height, 0]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "d3-plot")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
