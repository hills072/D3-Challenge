function drawChart() {
  
  var svgWidth = 1000;
  var svgHeight = 700;

  var margin = {
    top: 50,
    right: 40,
    bottom: 80,
    left: 80
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will the chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data.csv").then(function (demoData, err) {
    if (err) throw err;

    for (var i = 0; i < demoData.length; i++) {

      demoData[i].poverty = +demoData[i].poverty;
      demoData[i].healthcare = +demoData[i].healthcare;

    };
    var povertyMax = d3.max(demoData, d => d.poverty);
    var healthcareMax = d3.max(demoData, d => d.healthcare);

    // create scales
    var xScale = d3.scaleLinear()
      .domain([8, povertyMax + 2])
      .range([0, width])

    var yScale = d3.scaleLinear()
      .domain([4, healthcareMax + 2])
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
    var circleGroup = chartGroup.selectAll('.circleGroup')
      .data(demoData)
      .enter()
      .append('g')
      .attr('class', 'circleGroup')
      .attr('transform', function (d) {
        return 'translate(' + xScale(d.poverty) + ',' + yScale(d.healthcare) + ')'
      })

    circleGroup.append('circle')
      .attr('r', 13)
      .attr("fill", "blue")
      .attr("opacity", ".5");

    circleGroup.append('text')
      .attr("font-size", "12px")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr('dx', -10)
      .attr('dy', 3)
      .text(function (d) { return d.abbr })

    chartGroup.append("text")
      // Position the text
      // Center the text:
      // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
      .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "black")
      .attr("font-weight", "bold")
      .text("In Poverty (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("font-size", "20px")
      .attr("dy", "1em")
      .attr("font-weight", "bold")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2) + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "27px")
      .attr("font-weight", "bold")
      .style("text-decoration", "underline")
      .text("Healthcare vs. Poverty by State");
  })
};
// Initialize the chart
drawChart();


