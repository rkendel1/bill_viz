////////INIT VARIABLES////////
var votesData = [];
var voteValues = [];

/////////GET DATA/////////////

//access votes route in Flask app
d3.json("/votes").then(function (data) {

    //loop through objects in route
    data.forEach(function (d) {

        //convert data to numeric
        demYes = +d.democratic.yes
        demNo = ~d.democratic.no //makes negative
        repYes = +d.republican.yes
        repNo = ~d.republican.no
        indYes = +d.independent.yes
        indNo = ~d.independent.no

        //add all values to voteValues (to assess range for scales)
        voteValues.push(demYes, demNo, repYes, repNo, indYes, indNo);

        //push desired data to voteData array
        votesData.push(
            {
                "id": d._id,
                "name": d.bill.bill_id,
                "question": d.question,
                "description": d.description,
                "demYes": demYes,
                "repYes": repYes,
                "indYes": indYes,
                "demNo": demNo,
                "repNo": repNo,
                "indNo": indNo
            })
    });
    //console.log(votesData);
    //console.log("voteValues: :" + voteValues);
    //get min and max values of data to help determine scales
    //console.log("max Yes: " + Math.max(...voteValues));
    //console.log("min No: " + Math.min(...voteValues));

    /////////////STACK GENERATOR//////////////

    //create stack generator
    var stackGenYes = d3.stack()
        .keys(["demYes", "repYes", "indYes"]) //keys from votesData
        .order(d3.stackOrderDescending); //demYes, repYes, indYes
    //use generator to create data array
    var stackedSeries = stackGenYes(votesData);
    console.log(stackedSeries);

    /////////////SCALE FUNCTIONS////////////

    //assign colors to parties
    var colorScale = d3.scaleOrdinal()
        .domain(["demYes", "repYes", "indYes"])//keys in votesData obj (buildChart.js)
        .range(["#086fad", "#c7001e", "#8A2BE2"]);

    var yScale = d3.scaleBand()
        .domain(votesData.map(d => d.id))
        .range([0, height])
        .padding(0.1);

    var xScale = d3.scaleLinear()
        .domain([0, 240]) //max number of a single party
        .range([0, width]);
    
    ///////RECTANGLES//////

    //create g tags for each key
    var sel = d3.select("svg")
        .select('g')
        .selectAll('g.series') //series of values for each key
        .data(stackedSeries)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key)); //assign color (initCharVars.js)
    //create bars
    sel.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', d => xScale(d[1]) - xScale(d[0]))
        .attr('x', d => xScale(d[0]))
        .attr('y', d => yScale(d.data.id))
        .attr('height', 32)

    //////AXES///////
    billIDs = []
    votesData.forEach(vote => billIDs.push(vote.name))
    console.log(billIDs)
    
    svg.append("g").selectAll("text")
        .data(votesData)
        .enter()
        .append("text")
        .attr("y", d => yScale(d.id) + 15)
        .attr("x", width + 165)
        .text(d=> d.name)
        .attr("text-anchor", "middle") //anchor text to middle of text
        .attr("alignment-baseline", "middle") //same as above
        .attr("stroke", "black")
        .attr("stroke-width", .5)
    var rightAxis = d3.axisLeft(yScale)
        .tickFormat("");
    svg.append("g")
        .attr("transform", `translate(${width + 115}, 0)`)
        .call(rightAxis);

});
//console.log(votesData);
//console.log(votesData[0]);

