
var data = [
    { city: 'San Antonio', population_2012: 1383505, growth: { year_2013: 25405, year_2014: 26644, year_2015: 28593, year_2016: 23591, year_2017: 24208 } },
    { city: 'New York', population_2012: 8383504, growth: { year_2013: 75138, year_2014: 62493, year_2015: 61324, year_2016: 32967, year_2017: 7272 } },
    { city: 'Chicago', population_2012: 2717989, growth: { year_2013: 6493, year_2014: 2051, year_2015: -1379, year_2016: -4879, year_2017: -3825 } },
    { city: 'Los Angeles', population_2012: 3859267, growth: { year_2013: 32516, year_2014: 30885, year_2015: 30791, year_2016: 27657, year_2017: 18643 } },
    { city: 'Phoenix', population_2012: 1495880, growth: { year_2013: 25302, year_2014: 26547, year_2015: 27310, year_2016: 27003, year_2017: 24036 } }
];

//sort bars based on population_2012
for (var i = 0; i < data.length; i++) {
    data[i].population_2017 = data[i].population_2012
    for (var j = 0; j < d3.keys(data[i].growth).length; j++) {
        data[i].population_2017 += data[i].growth[d3.keys(data[i].growth)[j]]
    }
}

//sort bars based on population_2012
data = data.sort(function (a, b) {
    return d3.ascending(a.population_2017, b.population_2017);
})

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = { top: 30, right: 0, bottom: 0, left: 100 },
    width = 960 + margin.left + margin.right,
    height = 400 + margin.top + margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", 1 / 2 * width)
    .attr("height", height + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .range([0, 1 / 2 * width])
    .domain([0, d3.max(data, function (d) {
        return d.population_2017;
    })]);

var y = d3.scale.ordinal()
    .rangeRoundBands([1 / 2 * height, 0], .1)
    .domain(data.map(function (d) {
        return d.city;
    }));

//make y axis to show bar names
var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

var gy = svg.append("g")
    .call(yAxis)

var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

//append rects
bars.append("rect")
    .attr("class", "bar label")
    .attr("y", function (d) {
        return y(d.city);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
        return x(d.population_2017);
    })
    .on("mouseover", function (d) {
        d3.select(this).attr("class", "bluebar");
        showsvg2(d.city)
    })
    .on("mouseout", function (d, i) {
        d3.select("#growthgraph").remove();
        d3.select(this).attr("class", "bar");
    });


//add a value label to the right of each bar
bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.city) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return margin.left / 20
    })
    .text(function (d) {
        return d3.format(",")(d.population_2017);
    })
    .attr("fill", "white");

var growth = []
var population = []
var growthlist = []
var cities = []

for (var i = 0; i < data.length; i++) {
    population.push([data[i].population_2012])
    growth.push([0])
    growthlist.push({})
    cities[i] = data[i].city
}

for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < d3.keys(data[i].growth).length; j++) {
        growth[i][j] = data[i].growth[d3.keys(data[i].growth)[j]] / population[i][j] * 100
        population[i][j + 1] = data[i].growth[d3.keys(data[i].growth)[j]] + population[i][j]
        growthlist[i][j] = { 'year': d3.keys(data[i].growth)[j].replace('year_', ''), 'growth': growth[i][j] }
    }
}

data = growthlist

function showsvg2(city) {
    city_index = cities.indexOf(city)
    // Set the ranges
    var x = d3.scale.linear().range([0, 2 / 5 * width]).domain(d3.extent(data, function (d, j) {
        return d[j].year;
    }));
    var max_year_growth = -Infinity;
    var min_year_growth = Infinity;
    for (i = 0; i < data.length; i++) {
        if (max_year_growth < data[city_index][i].growth) {
            max_year_growth = data[city_index][i].growth
        }
        if (min_year_growth > data[city_index][i].growth) {
            min_year_growth = data[city_index][i].growth
        }
    }

    var y = d3.scale.linear().range([1 / 2 * height, 0]).domain([Math.max(0, min_year_growth), max_year_growth]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

    // Define the line
    var valueline = d3.svg.line()
        .x(function (d, j) {
            return x(data[city_index][j].year) + margin.left / 2;
        })
        .y(function (d, j) { return y(data[city_index][j].growth) + margin.top; });

    // Adds the svg canvas
    var svg2 = d3.select("body")
        .append("svg")
        .attr("id", "growthgraph")
        .attr("width", 1 / 2 * width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    // Add the valueline path.
    svg2.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    //Create X axis
    svg2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left / 2 + "," + (height / 2 + margin.top) + ")")
        .call(xAxis);

    //Create Y axis
    svg2.append("g")
        .attr("class", "axis")
        .call(yAxis)
        .attr("transform", "translate(" + margin.left / 2 + "," + margin.top + ")");

    // Add legend with label.
    svg2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
        .attr("class", "label")
        .attr("x", margin.left / 2)
        .attr("y", -height + margin.top)
        .text("Pct %");

    // Add legend with label.
    svg2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
        .attr("class", "label")
        .attr("x", width / 2 - margin.left / 2)
        .attr("y", -height / 2 + margin.top)
        .text("Year");

}
