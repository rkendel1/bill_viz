function parse(d) {
    demYes = d.democratic.yes
    demNo = ~d.democratic.no
    repYes = d.republican.yes
    repNo = ~d.republican.no
    inYes = d.independent.yes
    inNo = ~d.independent.no
    return d;
}

d3.csv("popGrowth.csv", parse, function (error, data) {
    if (error) throw error;

    y.domain(data.map(function (d) { return d.country; }));
    x.domain(d3.extent(data, function (d) { return d.annual_growth; }));

    var max = d3.max(data, function (d) { return d.annual_growth; });
    colour.domain([-max, max]);

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

    bars.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("class", "annual-growth")
        .attr("x", function (d) {
            return x(Math.min(0, d.annual_growth));
        })
        .attr("y", function (d) { return y(d.country); })
        .attr("height", y.bandwidth())
        .attr("width", function (d) {
            return Math.abs(x(d.annual_growth) - x(0))
        })
        .style("fill", function (d) {
            return colour(d.annual_growth)
        });

    var labels = svg.append("g")
        .attr("class", "labels");

    labels.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("x", x(0))
        .attr("y", function (d) { return y(d.country) })
        .attr("dx", function (d) {
            return d.annual_growth < 0 ? cfg.labelMargin : -cfg.labelMargin;
        })
        .attr("dy", y.bandwidth())
        .attr("text-anchor", function (d) {
            return d.annual_growth < 0 ? "start" : "end";
        })
        .text(function (d) { return d.country })
        .style("fill", function (d) {
            if (d.country == "European Union") {
                return "blue";
            }
        });

});
