//Read CSV
d3.csv("movies.csv", function (data) {

    //Width and height
    var margin = { left: 50, top: 30, bottom: 0, right: 0 }
    var w = 800;
    var h = 600;

    var xtitle = 'IMDb Rating'
    var ytitle = 'Wins+Noms'
    var ytitle2 = 'Budget'
    var ytitle3 = 'IMDb Votes'

    //Dynamic, random dataset
    var xRange = 10;
    var yRange = 1.1 * d3.max(data, function (d) { return parseInt(d.WinsNoms); });
    var yRange2 = 1.1 * d3.max(data, function (d) { return parseInt(d.Budget); });
    var yRange3 = 1.1 * d3.max(data, function (d) { return parseInt(d.imdbVotes); });
    var yRange4 = 1.1 * d3.max(data, function (d) { return Math.sqrt(parseInt(d.WinsNoms)); });
    var yRange5 = 1.1 * d3.max(data, function (d) { return Math.log(parseInt(d.WinsNoms)); });
    var radius = 2
    var color = ["red", "blue"];

    //Create scale functions
    var xScale = d3.scale.linear()
        .domain([0, xRange])
        .range([margin.left, w - margin.left * 3]);

    var yScale = d3.scale.linear()
        .domain([0, yRange])
        .range([h - margin.top, margin.top]);

    var xScale2 = d3.scale.linear()
        .domain([0, xRange])
        .range([margin.left, w - margin.left * 3]);

    var yScale2 = d3.scale.linear()
        .domain([0, yRange2])
        .range([h - margin.top, margin.top]);

    var xScale3 = d3.scale.linear()
        .domain([0, xRange])
        .range([margin.left, w - margin.left * 3]);

    var yScale3 = d3.scale.linear()
        .domain([0, yRange3])
        .range([h - margin.top, margin.top]);

    var xScale4 = d3.scale.linear()
        .domain([0, xRange])
        .range([margin.left, w - margin.left * 3]);

    var yScale4 = d3.scale.linear()
        .domain([0, yRange4])
        .range([h - margin.top, margin.top]);

    var xScale5 = d3.scale.linear()
        .domain([0, xRange])
        .range([margin.left, w - margin.left * 3]);

    var yScale5 = d3.scale.linear()
        .domain([0, yRange5])
        .range([h - margin.top, margin.top]);

    //Define X axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10);
    //Define X axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10);
    //Define X axis
    var xAxis2 = d3.svg.axis()
        .scale(xScale2)
        .orient("bottom")
        .ticks(10);
    //Define X axis
    var yAxis2 = d3.svg.axis()
        .scale(yScale2)
        .orient("left")
        .ticks(10);

    //Define X axis
    var xAxis3 = d3.svg.axis()
        .scale(xScale3)
        .orient("bottom")
        .ticks(10);
    //Define X axis
    var yAxis3 = d3.svg.axis()
        .scale(yScale3)
        .orient("left")
        .ticks(10);

    //Define X axis
    var xAxis4 = d3.svg.axis()
        .scale(xScale4)
        .orient("bottom")
        .ticks(10);
    //Define X axis
    var yAxis4 = d3.svg.axis()
        .scale(yScale4)
        .orient("left")
        .ticks(10);

    //Define X axis
    var xAxis5 = d3.svg.axis()
        .scale(xScale5)
        .orient("bottom")
        .ticks(10);
    //Define X axis
    var yAxis5 = d3.svg.axis()
        .scale(yScale5)
        .orient("left")
        .ticks(10);


    d3.select("body")
        .append("center")
        .text("Wins+Nominations vs. IMDb Rating")

    //Create SVG element
    var svg = d3.select("body")
        .append("center")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.select("body")
        .append("center")
        .text("Budget vs. IMDb Rating")

    //Create SVG element
    var svg2 = d3.select("body")
        .append("center")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.select("body")
        .append("center")
        .text("Votes vs. IMDb Rating sized by Wins+Nominations")

    //Create SVG element
    var svg3 = d3.select("body")
        .append("center")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


    d3.select("body")
        .append("center")
        .text("Wins+Nominations (square-root-scaled) vs. IMDb Rating")

    //Create SVG element
    var svg4 = d3.select("body")
        .append("center")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.select("body")
        .append("center")
        .text("Wins+Nominations (log-scaled) vs. IMDb Rating")

    //Create SVG element
    var svg5 = d3.select("body")
        .append("center")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.IsGoodRating == '0') {
                return xScale(d.imdbRating)
            }
        })
        .attr("cy", function (d) {
            if (d.IsGoodRating == '0') {
                return yScale(d.WinsNoms)
            }
        })
        .attr("r", radius)
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    svg.selectAll("svg")
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(10 * radius))
        .attr('transform', function (d) {
            if (d.IsGoodRating == '1') {
                return "translate(" + xScale(d.imdbRating) + "," + yScale(d.WinsNoms) + ")";
            }
        })
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    var legend = svg.selectAll(".legend")
        .data(color)
        .enter().append("g")
        .attr("class", "legend")

    legend.filter(function (d) { return d === "red"; })
        .append("circle")
        .attr("cx", w - margin.left)
        .attr("cy", 1.85 * margin.top)
        .attr("r", function (d) { return 5 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    legend.filter(function (d) { return d === "blue"; })
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(20 * radius))
        .attr('transform', "translate(" + (w - margin.left) + "," + 3 * margin.top + ")")
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    //add legend text
    legend.append("text")
        .attr("x", w - 3 * margin.left)
        .attr("y", function (d) {
            if (d == "red") {
                return 2 * margin.top
            }
            if (d == "blue") {
                return 3 * margin.top
            }
        })
        .text(function (d) {
            if (d === "red") return "bad rating";
            if (d === "blue") return "good rating";
        })


    svg2.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.IsGoodRating == '0') {
                return xScale2(d.imdbRating)
            }
        })
        .attr("cy", function (d) {
            if (d.IsGoodRating == '0') {
                return yScale2(d.Budget)
            }
        })
        .attr("r", function (d) { return 2 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    svg2.selectAll("svg")
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(10 * radius))
        .attr('transform', function (d) {
            if (d.IsGoodRating == '1') {
                return "translate(" + xScale2(d.imdbRating) + "," + yScale2(d.Budget) + ")";
            }
        })
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    var legend2 = svg2.selectAll(".legend")
        .data(color)
        .enter().append("g")
        .attr("class", "legend")

    legend2.filter(function (d) { return d === "red"; })
        .append("circle")
        .attr("cx", w - margin.left)
        .attr("cy", 1.85 * margin.top)
        .attr("r", function (d) { return 5 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    legend2.filter(function (d) { return d === "blue"; })
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(20 * radius))
        .attr('transform', "translate(" + (w - margin.left) + "," + 3 * margin.top + ")")
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    //add legend text
    legend2.append("text")
        .attr("x", w - 3 * margin.left)
        .attr("y", function (d) {
            if (d == "red") {
                return 2 * margin.top
            }
            if (d == "blue") {
                return 3 * margin.top
            }
        })
        .text(function (d) {
            if (d === "red") return "bad rating";
            if (d === "blue") return "good rating";
        })

    svg3.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.IsGoodRating == '0') {
                return xScale3(d.imdbRating)
            }
        })
        .attr("cy", function (d) {
            if (d.IsGoodRating == '0') {
                return yScale3(d.imdbVotes)
            }
        })
        .attr("r", function (d) { return Math.sqrt(d.WinsNoms) / 2 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    svg3.selectAll("svg")
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(function (d) {
            return 10 * Math.sqrt(d.WinsNoms) / 2
        }))
        .attr('transform', function (d) {
            if (d.IsGoodRating == '1') {
                return "translate(" + xScale3(d.imdbRating) + "," + yScale3(d.imdbVotes) + ")";
            }
        })
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    var legend3 = svg3.selectAll(".legend")
        .data(color)
        .enter().append("g")
        .attr("class", "legend")

    legend3.filter(function (d) { return d === "red"; })
        .append("circle")
        .attr("cx", w - margin.left / 2)
        .attr("cy", 1.85 * margin.top)
        .attr("r", function (d) { return 5 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    legend3.filter(function (d) { return d === "blue"; })
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(20 * radius))
        .attr('transform', "translate(" + (w - margin.left / 2) + "," + 3 * margin.top + ")")
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    //add legend text
    legend3.append("text")
        .attr("x", w - 2.5 * margin.left)
        .attr("y", function (d) {
            if (d == "red") {
                return 2 * margin.top
            }
            if (d == "blue") {
                return 3 * margin.top
            }
        })
        .text(function (d) {
            if (d === "red") return "bad rating";
            if (d === "blue") return "good rating";
        })

    svg4.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.IsGoodRating == '0') {
                return xScale4(d.imdbRating)
            }
        })
        .attr("cy", function (d) {
            if (d.IsGoodRating == '0') {
                return yScale4(Math.sqrt(d.WinsNoms))
            }
        })
        .attr("r", function (d) { return 2 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    svg4.selectAll("svg")
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(10 * radius))
        .attr('transform', function (d) {
            if (d.IsGoodRating == '1') {
                return "translate(" + xScale4(d.imdbRating) + "," + yScale4(Math.sqrt(d.WinsNoms)) + ")";
            }
        })
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    var legend4 = svg4.selectAll(".legend")
        .data(color)
        .enter().append("g")
        .attr("class", "legend")

    legend4.filter(function (d) { return d === "red"; })
        .append("circle")
        .attr("cx", w - margin.left / 4)
        .attr("cy", 2 * margin.top)
        .attr("r", function (d) { return 5 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    legend4.filter(function (d) { return d === "blue"; })
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(20 * radius))
        .attr('transform', "translate(" + (w - margin.left / 4) + "," + 3 * margin.top + ")")
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    //add legend text
    legend4.append("text")
        .attr("x", w - 2 * margin.left)
        .attr("y", function (d) {
            if (d == "red") {
                return 2 * margin.top
            }
            if (d == "blue") {
                return 3 * margin.top
            }
        })
        .text(function (d) {
            if (d === "red") return "bad rating";
            if (d === "blue") return "good rating";
        })

    svg5.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.IsGoodRating == '0') {
                return xScale5(d.imdbRating)
            }
        })
        .attr("cy", function (d) {
            if (d.IsGoodRating == '0' && d.WinsNoms > 0) {
                return yScale5(Math.log(d.WinsNoms))
            }
        })
        .attr("r", function (d) { return 2 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    svg5.selectAll("svg")
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(10 * radius))
        .attr('transform', function (d) {
            if (d.IsGoodRating == '1' && d.WinsNoms > 0) {
                return "translate(" + xScale5(d.imdbRating) + "," + yScale5(Math.log(d.WinsNoms)) + ")";
            }
        })
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    var legend5 = svg5.selectAll(".legend")
        .data(color)
        .enter().append("g")
        .attr("class", "legend")

    legend5.filter(function (d) { return d === "red"; })
        .append("circle")
        .attr("cx", w - margin.left / 4)
        .attr("cy", 2 * margin.top)
        .attr("r", function (d) { return 5 })
        .attr("stroke", function (d) { return color[0]; })
        .attr("fill", "white");

    legend5.filter(function (d) { return d === "blue"; })
        .append('path')
        .attr('d', d3.svg.symbol().type('cross').size(20 * radius))
        .attr('transform', "translate(" + (w - margin.left / 4) + "," + 3 * margin.top + ")")
        .attr('fill', 'white')
        .attr('stroke', function (d) { return color[1]; })
        .attr('stroke-width', 1);

    //add legend text
    legend5.append("text")
        .attr("x", w - 2 * margin.left)
        .attr("y", function (d) {
            if (d == "red") {
                return 2 * margin.top
            }
            if (d == "blue") {
                return 3 * margin.top
            }
        })
        .text(function (d) {
            if (d === "red") return "bad rating";
            if (d === "blue") return "good rating";
        })

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);

    // text label for the y axis
    svg.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .text(ytitle);

    //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - margin.top) + ")")
        .call(xAxis);
    // text label for the x axis
    svg.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - 3 * margin.left) + "," + (h - 1.5 * margin.top) + ")")
        .text(xtitle);

    //Create Y axis
    svg2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + ",0)")
        .call(yAxis2);

    // text label for the y axis
    svg2.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")")
        .text(ytitle2);

    //Create X axis
    svg2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + "," + (h - margin.top) + ")")
        .call(xAxis2);
    // text label for the x axis
    svg2.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - 2 * margin.left) + "," + (h - 1.5 * margin.top) + ")")
        .text(xtitle);

    //Create Y axis
    svg3.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + ",0)")
        .call(yAxis3);

    // text label for the y axis
    svg3.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")")
        .text(ytitle3);

    //Create X axis
    svg3.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + "," + (h - margin.top) + ")")
        .call(xAxis3);
    // text label for the x axis
    svg3.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - 2 * margin.left) + "," + (h - 1.5 * margin.top) + ")")
        .text(xtitle);

    //Create Y axis
    svg4.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + ",0)")
        .call(yAxis4);

    // text label for the y axis
    svg4.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")")
        .text(ytitle);

    //Create X axis
    svg4.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + "," + (h - margin.top) + ")")
        .call(xAxis3);
    // text label for the x axis
    svg4.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - 2 * margin.left) + "," + (h - 1.5 * margin.top) + ")")
        .text(xtitle);

    //Create Y axis
    svg5.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + ",0)")
        .call(yAxis5);

    // text label for the y axis
    svg5.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")")
        .text(ytitle);

    //Create X axis
    svg5.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + "," + (h - margin.top) + ")")
        .call(xAxis5);
    // text label for the x axis
    svg5.append("text")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - 2 * margin.left) + "," + (h - 1.5 * margin.top) + ")")
        .text(xtitle);
});