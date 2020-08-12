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
            {"name": d.bill.bill_id,
            "question": d.question,
            "description": d.description,
            "votes": [
                {"category": "Democratic Yes",
                "value": demYes },
                {"category": "Democratic No",
                "value": demNo},
                {"category": "Republican Yes",
                "value": repYes},
                {"category": "Repulican No",
                "value": repNo},
                {"category": "Independent Yes",
                "value": indYes},
                {"category": "Independent No",
                "value": indNo}
            ]
        })
    });
    console.log(votesData);
    console.log(votesData[0]);
    console.log("voteValues: :" + voteValues);

    //get min and max values of data
    console.log("max Yes: " + Math.max(...voteValues));
    console.log("min No: " +  Math.min(...voteValues));

    svg.selectAll("rect")
    .data(votesData)
    .enter()
    .append("rect")
    .attr("width", 25)
    .attr("height", d =>
    d.votes[0].value)
    .attr("x", (d,i) => i * 30)
    .attr("y", d => height - d.votes[0].value);

});
//console.log(votesData);
//console.log(votesData[0]);

