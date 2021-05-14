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



    });