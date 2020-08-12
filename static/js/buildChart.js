////script not referenced in index yet

votesData = []


d3.json("/votes").then(function (data) {
    data.forEach(function (d) {
        //convert data to numeric
        demYes = +d.democratic.yes
        demNo = ~d.democratic.no //makes negative
        repYes = +d.republican.yes
        repNo = ~d.republican.no
        indYes = +d.independent.yes
        indNo = ~d.independent.no
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
    console.log(votesData)
});
