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

        //add all values to voteValues to assess range for scales (initCharVars.js)
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

    console.log(`votesNo: ${votesNo}`)


    //////SCALES//////////
    var yScale = d3.scaleBand()
        .domain(votesYes.map(d => d.id))
        .range([0, height])
        .padding(0.1);

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

    ////////////////RECTANGLES////////////////

    //create g tags for each key in stackedSeriesYes
    var selYes = d3.select("#svgYes")
        .select('g')
        .selectAll('g.seriesYes')
        .data(stackedSeriesYes)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key)); //assign color by party (key)
    selYes.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', d => xScaleYes(d[1]) - xScaleYes(d[0])) //length of bars
        .attr('x', d => xScaleYes(d[0])) //bar starting point
        .attr('y', d => yScale(d.data.id)) //unique identifier (num of data points)
        .attr('height', 28) //width of bars
        //tool tips
        .on("mouseover", mouseoverRect)
        .on("mouseout", mouseleave);

    //create g tags for each key in stackedSeriesNo
    var selNo = d3.select("#svgNo")
        .select('g')
        .selectAll('g.seriesNo')
        .data(stackedSeriesNo)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key)); //assign color by party (key)
    //create NO bars
    selNo.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', d => xScaleNo(d[0]) - xScaleNo(d[1])) //length of bars
        .attr('x', d => xScaleNo(d[1])) //bar start point
        .attr('y', d => yScale(d.data.id)) //unique identifer (num of data points)
        .attr('height', 28) //width of bars
        //tool tips
        .on("mouseover", mouseoverRect)
        .on("mouseout", mouseleave);

    //////LINES///////

    d3.select("#svgNo").select("g")
        .append("g")
        .classed("line", true)
        .selectAll("path")
        .data(stackedSeriesNo[2]) //independent votes series (last series in stackedSeriesNo)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        //.style("stroke-dasharray", ("4, 8")) // ("length of dash, space before next dash")
        .attr("d", d => lineGenerator(
            makeCoords(
                0, //start at 0
                xScaleNo(d[1]), //end at bar
                yScale(d.data.id) + 14 //aligns with y tick marks
            )
        )
        );

    //same as above for right side of chart
    d3.select("#svgYes").select("g")
        .append("g")
        .classed("line", true)
        .selectAll("path")
        .data(stackedSeriesYes[2])
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        //.style("stroke-dasharray", ("4, 8"))
        .attr("d", d => lineGenerator(
            makeCoords(
                xScaleYes(d[1]), //start at bar
                width, //end at width of chart
                yScale(d.data.id) + 14
            )
        )
        );

    //////AXESS///////

    //create y axis variable
    var rightAxis = d3.axisRight(yScale)
        .tickFormat(""); //remove tick labels
    //add y axis to page
    svgYes.append("g")
        .classed("yAxis", true)
        .attr("transform", `translate(${width}, 0)`)
        .call(rightAxis);
    //create containter for custom y ticks
    svgYes.append("g").classed("bill-labels", true)
        .selectAll("text")
        .data(votesYes)
        .enter()
        //create text tag for each bill
        .append("text")
        //place along tick marks
        .attr("y", d => yScale(d.id) + 14)
        .attr("x", width + 10)
        .text(d => d.name) //bill ID
        .attr("alignment-baseline", "middle")
        .on("mouseover", mouseoverAxis)
        .on("mouseout", mouseleave
        );
    //create x axis variable for right side and add to page
    var bottomAxisRight = d3.axisBottom(xScaleYes)
    svgYes.append("g")
        .classed("xAxis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxisRight)
    //create x axis variable for left side and add to page
    var bottomAxisLeft = d3.axisBottom(xScaleNo)
    svgNo.append("g")
        .classed("xAxis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxisLeft)
});
