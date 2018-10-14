var margin = { top: 50, right: 0, bottom: 0, left: 450 },
    width = 1280,
    height = 760,
    gridSize = Math.floor(width / 16),
    legendElementWidth = gridSize / 2;
d3.csv("heatmap.csv", function (buckets) {

    colors = ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"]; // alternatively colorbrewer.YlGnBu[9]

    var houses = d3.map(buckets, function (d) { if (d.House) { return d.House; } }).keys();
    houses = houses.filter(function (element) {
        return element !== 'undefined';
    });

    d3.select("body")
        .append("center")
        .attr("class", "label")
        .text("Vizualizing Wizarding Houses and Spells")

    var select = d3.select("body")
        .append("center")
        .style("margin-top", "20px")
        .text("House:")
        .append("select")
        .on('change', onchange)

    select.selectAll('option')
        .data(houses).enter()
        .append('option')
        .text(function (d) {
            return d;
        });

    // Get the maximum of all values
    var colorScale = {
        Gryffindor: d3.scale.quantile().domain([0, colors.length - 1, d3.max(buckets, function (d) {
            if (d.House == 'Gryffindor') {
                return Math.max(d["Sorcerer's Stone"], d["Chamber of Secrets"], d["Goblet of Fire"], d["Goblet of Fire"], d["Order of the Phoenix"], d["Half Blood Prince"], d["Deathly Hallows"])
            }
        })])
            .range(colors),
        Hufflepuff: d3.scale.quantile().domain([0, colors.length - 1, d3.max(buckets, function (d) {
            if (d.House == 'Hufflepuff') {
                return Math.max(d["Sorcerer's Stone"], d["Chamber of Secrets"], d["Goblet of Fire"], d["Goblet of Fire"], d["Order of the Phoenix"], d["Half Blood Prince"], d["Deathly Hallows"])
            }
        })])
            .range(colors),
        Ravenclaw: d3.scale.quantile().domain([0, colors.length - 1, d3.max(buckets, function (d) {
            if (d.House == 'Ravenclaw') {
                return Math.max(d["Sorcerer's Stone"], d["Chamber of Secrets"], d["Goblet of Fire"], d["Goblet of Fire"], d["Order of the Phoenix"], d["Half Blood Prince"], d["Deathly Hallows"])
            }
        })])
            .range(colors),
        Slytherin: d3.scale.quantile().domain([0, colors.length - 1, d3.max(buckets, function (d) {
            if (d.House == 'Slytherin') {
                return Math.max(d["Sorcerer's Stone"], d["Chamber of Secrets"], d["Goblet of Fire"], d["Goblet of Fire"], d["Order of the Phoenix"], d["Half Blood Prince"], d["Deathly Hallows"])
            }
        })])
            .range(colors)
    }
    // Round off color scale quantiles
    var colornum = { Gryffindor: [], Hufflepuff: [], Ravenclaw: [], Slytherin: [] }
    for (i = 0; i < [0].concat(colorScale.Gryffindor.quantiles()).length; i++) {
        colornum.Gryffindor[i] = [0].concat(colorScale.Gryffindor.quantiles())[i].toFixed()
        colornum.Hufflepuff[i] = [0].concat(colorScale.Hufflepuff.quantiles())[i].toFixed()
        colornum.Ravenclaw[i] = [0].concat(colorScale.Ravenclaw.quantiles())[i].toFixed()
        colornum.Slytherin[i] = [0].concat(colorScale.Slytherin.quantiles())[i].toFixed()
    }

    onchange();

    function onchange() {
        d3.select("svg").remove();

        selectValue = d3.select('select').property('value')

        var svg = d3.select('body').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Get y label
        var ys = d3.keys(buckets[0]).slice(0, 7);

        // Add y label
        svg.selectAll(".yLabel")
            .data(ys)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .attr("class", "label")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 2 + ")");

        // Filter and get x label
        var xs = d3.map(buckets, function (d) { if (d.SpellType) { return d.SpellType; } }).keys().sort()
            .filter(function (element) {
                return element !== 'undefined';
            });

        // Add x label
        svg.selectAll(".xLabel")
            .data(xs)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", function (d, i) { return i * gridSize; })
            .attr("y", height - 3 * margin.top)
            .attr("class", "label")
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)");

        var cards = svg.selectAll(".g").data(buckets);

        cards.append("title")

        d3.keys(buckets[0]).slice(0, 7).forEach(function (d2, j) {
            buckets.forEach(function (d1, i) {
                if (d1.House == selectValue) {
                    cards.enter().append("rect")
                        .attr("x", xs.indexOf(d1.SpellType) * gridSize)
                        .attr("y", j * gridSize)
                        .attr("rx", 4)
                        .attr("ry", 4)
                        .attr("width", gridSize)
                        .attr("height", gridSize)
                        .style("fill", colors[0])
                    cards.transition().duration(1000)
                        .style("fill", function () {
                            if (selectValue == 'Gryffindor') {
                                return colorScale.Gryffindor(d1[d2]);
                            }
                            if (selectValue == 'Hufflepuff') {
                                return colorScale.Hufflepuff(d1[d2]);
                            }
                            if (selectValue == 'Ravenclaw') {
                                return colorScale.Ravenclaw(d1[d2]);
                            }
                            if (selectValue == 'Slytherin') {
                                return colorScale.Slytherin(d1[d2]);
                            }
                        });
                }
            })
        });

        // Add an x-axis with label.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("class", "label")
            .attr("x", width - 1.2 * margin.left)
            .attr("y", -3 * margin.top)
            .attr("text-anchor", "end")
            .attr("font-size", "15px")
            .text("Spell Type");

        // Add a y-axis with label.
        svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("class", "label")
            .attr("y", -0.5 * margin.top)
            .attr("dy", ".71em")
            .attr("text-anchor", "end")
            .attr("font-size", "15px")
            .text("Book");

        // Add legend with label.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("class", "label")
            .attr("x", 0.5 * margin.left)
            .attr("y", -2.5 * margin.top)
            .attr("text-anchor", "end")
            .attr("font-size", "15px")
            .text("No. of Spells");

        var legend = svg.selectAll(".legend")
            .data([0].concat(colorScale.Gryffindor.quantiles()), function (d) { return d; });

        legend.enter().append("g")
            .attr("class", "legend");

        // Add legend color bar.
        legend.append("rect")
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height - margin.top * 2)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function (d, i) { return colors[i]; });

        // Add legend color quantile label
        legend.append("text")
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height - margin.top)
            .text(function (d, i) {
                if (selectValue == 'Gryffindor') {
                    return colornum.Gryffindor[i];
                }
                if (selectValue == 'Hufflepuff') {
                    return colornum.Hufflepuff[i];
                }
                if (selectValue == 'Ravenclaw') {
                    return colornum.Ravenclaw[i];
                }
                if (selectValue == 'Slytherin') {
                    return colornum.Slytherin[i];
                }
            })

        legend.exit().remove();
    }
})
