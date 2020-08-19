///////CHART SVG AREAS////////

var margin = { top: 20, right: 100, bottom: 20, left: 5 },
    width = 350 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

//create text "Votes Against" below x axis
var chartLabelLeft = d3.select("#chartLabel")
    .append("svg")
    .attr("width", width)
    .attr("height", 35)
    .attr("class", "chartLabels")
    .append("g")
    .attr("id", "chartLabelLeft")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("text")
    .html("Votes Against")
    .attr("x", (width - margin.right)/ 2)
    .attr("alignment-baseline", "bottom")
    .attr("stroke", "black")
    .attr("stroke-width", .5);
//create text "Votes For" below x axis
var chartLabelRight = d3.select("#chartLabel")
    .append("svg")
    .attr("width", width)
    .attr("height", 35)
    .attr("class", "chartLabels")
    .append("g")
    .attr("id", "chartLabelRight")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("text")
    .html("Votes For")
    .attr("x", (width - margin.right) / 2)
    .attr("alignment-baseline", "bottom")
    .attr("stroke", "black")
    .attr("stroke-width", .5);
//create left side svg
var svgNo = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svgNo")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//create right side svg
var svgYes = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svgYes")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//create legend
var legend = d3.select("#legend")
    .attr("width", width)
    .attr("height", 100)

var colors = ["#086fad", "#c7001e", "#8A2BE2"]
var parties = ["Democrat", "Republican", "Independent"]

demLeg = ["Democrat", "#086fad"];
repLeg = ["Republican", "#c7001e"];
indLeg = ["Independent", "#8A2BE2"];

var partyColors = []
partyColors.push(demLeg, repLeg, indLeg)
console.log(partyColors)


legend.selectAll("svg")
    .data(partyColors)
    .enter()
    .append("svg")
    .attr("class", "legendSvgs")
    .attr("width", 160)
    .append("g")
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("x", 80)
    .style("fill", pair => pair[1]);

var legendSvgs = d3.select(".legendSvgs")

legendSvgs.selectAll("text")
    .data(pair => pair)
    .append("text")


///////TOOL TIPS/////////

//create div tag to hold tool tips
var toolTip = d3.select("#chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//function to make tool tip div visible
var mouseover = function (d) {
    toolTip
        .html(`${d[1] - d[0]} votes `)
        .style("opacity", 1)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
    //highlight circle mouse is on with a black border
    d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", 2)
};

//function make tool tips invisible
var mouseleave = function (d) {
    toolTip
        .style("opacity", 0) //hides tool tip
        .style("left", "0px")
        .style("top", "0px")
    d3.select(this)
        .style("stroke", "none") //removes border around rect
};

////////LINES/////////

//func to create coords list for line generator object
function makeCoords(x, y, z) {

    var coords = [
        [x, z], //x,y coords of line start
        [y, z] //line end
    ];
    return coords
}
//console.log(makeCoords(1,5))

var lineGenerator = d3.line();