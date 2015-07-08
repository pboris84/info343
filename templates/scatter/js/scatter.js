var xScale, yScale;
// Data from http://www.bls.gov/emp/ep_table_001.htm
var data = [{"degree":"Doctoral degree","unemployment":2.1,"weekly_earnings":1591},
{"degree":"Professional degree","unemployment":1.9,"weekly_earnings":1639},
{"degree":"Master's degree","unemployment":2.8,"weekly_earnings":1326},
{"degree":"Bachelor's degree","unemployment":3.5,"weekly_earnings":1101},
{"degree":"Associate's degree","unemployment":4.5,"weekly_earnings":792},
{"degree":"Some college, no degree","unemployment":6,"weekly_earnings":741},
{"degree":"High school diploma","unemployment":6,"weekly_earnings":668},
{"degree":"Less than a high school diploma","unemployment":9,"weekly_earnings":488}]


// SVG to work with
var svg = d3.select('#vis')
  .append('svg')
  .attr('height', 400)
  .attr('width', 400)

// Margin: how much space to leave in the SVG, above and below the charting area
var margin = {
  left:50, 
  bottom:100, 
  top:50, 
  right:50,
}

var height = 400 - margin.bottom - margin.top 
var width = 400 - margin.left - margin.right
// G for the chart markers to be in (i.e., circles)
var g = svg.append('g')
          .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
          .attr('height', height)
          .attr('width', width)
// Write a function to set your scales
var setScales = function() {
  var xMax =d3.max(data, function(d){return d.unemployment})*1.05
  var xMin =d3.min(data, function(d){return d.unemployment})*.95
  var yMin =d3.min(data, function(d){return d.weekly_earnings})*.9
  var yMax =d3.max(data, function(d){return d.weekly_earnings})*1.05
  xScale  = d3.scale.linear().range([0, width]).domain([xMin, xMax])
  yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax])
}

// Write a function to define the positioning of your circles
var circleFunc = function(circle) {
    circle.attr('r', 10)
          .attr('fill', 'blue')
          .attr('cx', function(d) { return xScale(d.unemployment)})
          .attr('cy', function(d) { return yScale(d.weekly_earnings)})
          .attr('title', function(d) {return d.degree})
          .style('opacity', .3)
}



// Write a reusable drawing function for circles
var draw = function(data) {
    // Set Scales
    setScales()
    // Bind self.settings.data
    var circles = g.selectAll('circle').data(data)
	
    // Enter new elements
    circles.enter().append('circle').call(circleFunc)
	
    // Exit elements that may have left
    circles.exit().remove()
	
    // Transition all circles to new dself.settings.data
    g.selectAll('circle').transition().duration(1500).call(circleFunc)  
}

// Pass data to your drawing function
draw(data)

// Add axes 
var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')

var drawAxes = function() {
  svg.append('g').call(xAxis)
      .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
}
drawAxes()

$("circle").tooltip({
    'container': 'body',
    'placement': 'bottom'
}); 
