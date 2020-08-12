//create var to hold organized data
var votesData = [];

//create list of all values for axis ranges
const voteValues = [];

//access votes route
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

        voteValues.push(demYes, demNo, repYes, repNo, indYes, indNo);

        //append var with desired data
        votesData.push(
            {
                "name": d.bill.bill_id,
                "question": d.question,
                "description": d.description,
                "votes": [
                    {
                        "party": "Democratic",
                        "yes": demYes,
                        "no": demNo
                    },
                    {
                        "party": "Republican",
                        "yes": repYes,
                        "no": demNo
                    },
                    {
                        "party": "Independent",
                        "yes": indYes,
                        "no": indNo
                    }
                ]
            })
    });
    console.log(votesData);
    console.log(votesData[0]);
    console.log("voteValues: :" + voteValues);

    //get min and max values of data
    console.log("max Yes: " + Math.max(...voteValues));
    console.log("min No: " + Math.min(...voteValues));

    //demYes rects
    svg.selectAll("rect")
        .data(votesData)
        .enter()
        .append("rect")
        .attr("width" ,d =>
        d.votes[0].yes)
        .attr("height", 25)
        .attr("x", d => width/2)
        .attr("y", (d, i) => i * 30)
        .style("fill", "green");

});
//console.log(votesData);
//console.log(votesData[0]);

