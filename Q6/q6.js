var margin = { left: 100, top: 100, bottom: 0, right: 0 }
var width = 960 + margin.left,
    height = 500 + margin.top;
var legendheight = 20;

var path = d3.geo.path();

d3.select("body")
    .append("center")
    .text("Education Statistics")
    .attr("class", "title")

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var y = d3.scale.linear()
    .domain([0, 100, 10])
    .rangeRound([100, 300]);

var color = d3.scale.threshold()
    .domain(d3.range(10, 100, 10))
    .range(['#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f', '#33000E']);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
    .data(color.range().map(function (d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = y.domain()[0];
        if (d[1] == null) d[1] = y.domain()[1];
        return d;
    }))
    .enter().append("rect")
    .attr("x", width - margin.left)
    .attr("height", legendheight)
    .attr("y", function (d) { return y(d[0]); })
    .attr("width", function (d) { return y(d[1]) - y(d[0]); })
    .attr("fill", function (d) { return color(d[0]); })

g.selectAll("text")
    .data(color.range().map(function (d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = y.domain()[0];
        if (d[1] == null) d[1] = y.domain()[1];
        return d;
    }))
    .enter().append("text")
    .attr("x", width - margin.left * 0.75)
    .attr("y", function (d) { return 0.15 * margin.top + y(d[0]); })
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text(function (d) { return d[1] + '%' })

g.append("text")
    .attr("class", "caption")
    .attr("x", width - margin.left)
    .attr("y", y.range()[0] - margin.top / 2)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Education rate");

d3.queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "education.csv")
    .await(ready);

var countyById = {};
var percent_educatedById = {};
var qualified_professionals = {};
var high_school_graduates = {};
var middle_school_lower_graduates = {};

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html(function (d) {
        return '<p>County:' + countyById[d.id]
            + '</p><p>Percentage Educated: ' + percent_educatedById[d.id]
            + '%</p><p>Qualified Professionals: ' + qualified_professionals[d.id]
            + '</p><p>High school graduates: ' + high_school_graduates[d.id]
            + '</p><p>Middle school or lower graduates: ' + middle_school_lower_graduates[d.id]
    })
svg.call(tip)

function ready(error, us, education) {
    if (error) throw error;
    education.forEach(function (d) {
        percent_educatedById[d.id] = +d.percent_educated;
        countyById[d.id] = d.name
    });
    d3.csv("education_details.csv", function (data) {
        data.forEach(function (d) {
            qualified_professionals[d.id] = d.qualified_professionals
            high_school_graduates[d.id] = d.high_school
            middle_school_lower_graduates[d.id] = d.middle_school_or_lower
        })
    });

    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("d", path)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .style("fill", function (d) {
            return color(percent_educatedById[d.id]);
        });

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a.id !== b.id; }))
        .attr("class", "states")
        .attr("d", path);

}