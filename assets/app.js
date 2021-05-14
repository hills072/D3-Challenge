console.log("app.js loaded");

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty_percent";

d3.csv("assets/data.csv").then(function(demoData, err) {
    if (err) throw err;
    console.log(demoData);
    poverty = [];
    healthcare = [];
    states = [];

    for (var i = 0; i < demoData.length; i++) {

        demoData[i].poverty = +demoData[i].poverty;
        demoData[i].healthcare = +demoData[i].healthcare;

        poverty.push(demoData[i].poverty);
        healthcare.push(demoData[i].healthcare);
        states.push(demoData[i].abbr);
    };
    console.log(poverty);
    console.log(healthcare);
    console.log(states);
    var povertyMax = d3.max(demoData, d => d.poverty);
    var healthcareMax = d3.max(demoData, d => d.healthcare);
    console.log(povertyMax);
    console.log(healthcareMax);

    // create scales

    var xScale = d3.scaleLinear()
        .domain(d3.extent(demoData, d => d.poverty))
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([0, healthcareMax])
        .range([height, 0]);
    
    // create axes

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      chartGroup.append("g")
        .call(yAxis);
    
    // create circles

    // var circle = svg.selectAll('.stateCircle') //select all elements with class ufoCircle. (There currently are none)
    //     .data(demoData) //attach the data
    //     .enter().append('circle') //aopend one circle for each data point. There are 11 data points, so there will be 11 circles
    //     .attr('class', 'stateCircle') //give each circle class ufoCircle
    //     .attr('r', 10) //assign radius
    //     // Position the circles based on their x and y attributes. 
    //     .attr("cx", function (d) { return xScale(d.poverty); })
    //     .attr("cy", function (d) { return yScale(d.healthcare); })
    //     .attr("fill", "lightblue")
    //     .attr("opacity", ".5");

    var circleGroup = svg.selectAll('.circleGroup')
        .data(demoData).enter().append('g') 
        .attr('class', 'circleGroup')
        .attr('transform', function(d) { return 'translate(' + xScale(d.poverty) + ',' + yScale(d.healthcare) + ')'})

    circleGroup.append('circle')
        .attr('class', 'stateCircle')
        .attr('r', 10)
        .attr("fill", "lightblue")
        .attr("opacity", ".5");

    circleGroup.append('text')
        .attr('class', 'stateText')
        .attr('dx', -10)
        .attr('dy', 5)
        .text(function(d) { return d.abbr})

    });

    d3.select(window).on("resize", makeResponsive);

    makeResponsive();