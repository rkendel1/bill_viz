////script not referenced in index yet

d3.json("/votes").then(function (data) { //replace csv with link
    var demVotes = []
    var repVotes = []
    var indVotes = []
    data.forEach(function(d){
    demYes = d.democratic.yes
    demNo = ~d.democratic.no
    repYes = d.republican.yes
    repNo = ~d.republican.no
    indYes = d.independent.yes
    indNo = ~d.independent.no

    demVotes.push(demYes, demNo)
    repVotes.push(repYes, repNo)
    indVotes.push(indYes, indNo)
    });

    var voteCounts = [demVotes, repVotes, indVotes]

    y.domain(data.map(function (d) { return d.bill.bill_id; })); //bill ids
    x.domain(d3.extent(data, function (d) { return voteCounts; })); //range of all votes counts

    var yAxis = svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .append("line")
        .attr("y1", 0)
        .attr("y2", height);

    var xAxis = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height + cfg.xAxisMargin) + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var bars = svg.append("g")
        .attr("class", "bars")

    //////////START HERE//////////
    bars.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("class", "annual-growth")
        .attr("x", function (d) {
            return x(Math.min(0, voteCounts));
        })
        .attr("y", function (d) { return y(d.bill.bill_id); })
        .attr("height", y.bandwidth())
        .attr("width", function (d) {
            return Math.abs(x(voteCounts) - x(0))
        })
        .style("fill", function (d) {
            return colour(voteCounts)
        });

    var labels = svg.append("g")
        .attr("class", "labels");

    labels.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("x", x(0))
        .attr("y", function (d) { return y(d.bill.bill_id) })
        .attr("dx", function (d) {
            return d.annual_growth < 0 ? cfg.labelMargin : -cfg.labelMargin;
        })
        .attr("dy", y.bandwidth())
        .attr("text-anchor", function (d) {
            return voteCounts< 0 ? "start" : "end";
        })
        .text(function (d) { return d.bill.bill_id })
});
