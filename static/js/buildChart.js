var votesNo = [];
var votesYes = [];
var voteValues = [];

/////////GET DATA/////////////

//access votes route in Flask app
d3.json("/votes").then(function (data) {

    //loop through objects in route
    data.forEach(function (d) {

        //convert data to numeric
        demYes = +d.democratic.yes
        demNo = +d.democratic.no
        repYes = +d.republican.yes
        repNo = +d.republican.no
        indYes = +d.independent.yes
        indNo = +d.independent.no

        //add all values to voteValues (to assess range for scales)
        voteValues.push(demYes, demNo, repYes, repNo, indYes, indNo);

        //push desired data to voteData arrays
        votesYes.push(
            {
                "id": d._id,
                "name": d.bill.bill_id,
                "question": d.question,
                "description": d.description,
                "demYes": demYes,
                "repYes": repYes,
                "indYes": indYes,
            })
        votesNo.push(
            {
                "id": d._id,
                "name": d.bill.bill_id,
                "question": d.question,
                "description": d.description,
                "demNo": demNo,
                "repNo": repNo,
                "indNo": indNo,
            })
    });
    /////////////STACK GENERATORS//////////////

    //create stack generator for YES votes
    var stackGenYes = d3.stack()
        .keys(["demYes", "repYes", "indYes"]) //keys from votesYes
        .order(d3.stackorderDescending)   
        //use generator to create data array
    var stackedSeriesYes = stackGenYes(votesYes);
    console.log(stackedSeriesYes);

    //create stack generator for NO votes
    var stackGenNo = d3.stack()
        .keys(["demNo", "repNo", "indNo"]) //keys from votesNo
    //use generator to create data array
    var stackedSeriesNo = stackGenNo(votesNo);
    console.log(stackedSeriesNo);

    /////////////SCALE FUNCTIONS////////////

    //assign colors to parties
    var colorScale = d3.scaleOrdinal()
        .domain(["demYes", "repYes", "indYes"])
        .range(["#086fad", "#c7001e", "#8A2BE2"]);

    var yScale = d3.scaleBand()
        .domain(votesYes.map(d => d.id))
        .range([0, height])
        .padding(0.1);

    var xScaleYes = d3.scaleLinear()
        .domain([0, 535]) //num members of congress
        .range([0, width]);

    var xScaleNo = d3.scaleLinear()
        .domain([0, 535]) //num members of congress
        .range([width, 0]);


    ////////////////RECTANGLES////////////////

    //create g tags for each YES key
    var selYes = d3.select("#svgYes")
        .select('g')
        .selectAll('g.seriesYes') //series of values for each key
        .data(stackedSeriesYes)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key));
    selYes.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', d => xScaleYes(d[1]) - xScaleYes(d[0]))
        .attr('x', d => xScaleYes(d[0]))
        .attr('y', d => yScale(d.data.id))
        .attr('height', 28)
        //tool tips
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave);

    //create g tags for each NO key
    var selNo = d3.select("#svgNo")
        .select('g')
        .selectAll('g.seriesNo') //series of values for each key
        .data(stackedSeriesNo)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key));
    //create NO bars
    selNo.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', d => xScaleNo(d[0]) - xScaleNo(d[1]))
        .attr('x', d => xScaleNo(d[1]))
        .attr('y', d => yScale(d.data.id))
        .attr('height', 28)
        //tool tips
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave);

    //////AXESS///////
    billIDs = []
    votesYes.forEach(vote => billIDs.push(vote.name))
    console.log(billIDs)

    var rightAxis = d3.axisRight(yScale)
        .tickFormat("");
    svgYes.append("g").classed("bill-labels", true)
        .selectAll("text")
        .data(votesYes)
        .enter()
        .append("text")
        .attr("y", d => yScale(d.id) + 18)
        .attr("x", width + 10)
        .text(d => d.name)
        .attr("alignment-baseline", "middle") //same as above
        .attr("stroke", "black")
        .attr("stroke-width", .5)
    svgYes.append("g")
        .classed("yAxis", true)
        .attr("transform", `translate(${width}, 0)`)
        .call(rightAxis);
    var bottomAxisRight = d3.axisBottom(xScaleYes)
    svgYes.append("g")
        .classed("xAxis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxisRight)
    var bottomAxisLeft = d3.axisBottom(xScaleNo)
    svgNo.append("g")
        .classed("xAxis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxisLeft)


});
