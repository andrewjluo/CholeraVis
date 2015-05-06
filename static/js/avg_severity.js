function addAxesAndLegend (svg, xAxis, yAxis, zeroAxis, margin, chartWidth, chartHeight, chartZeroHeight) {
  var legendWidth  = 200,
      legendHeight = 100;

  // clipping to make sure nothing appears behind legend
  svg.append('clipPath')
    .attr('id', 'axes-clip')
    .append('polygon')
      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - 1)               + ',' + (-margin.top)                 + ' ' +
                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis);

  axes.append('g')
    .attr('class', 'zero axis')
    .attr('transform', 'translate(0,' + (chartHeight - chartZeroHeight) + ')')
    .call(zeroAxis);

  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Time (s)');
}

function drawPaths (svg, data, x, y, ymax) {

  var plotArea = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.pct95); })
    .y1(function (d) { return y(ymax/2); });

  svg.datum(data);

  svg.append('path')
    .attr('class', 'area')
    .attr('d', plotArea)
    .attr('clip-path', 'url(#rect-clip)');
}

function makeAvgChart (data) {
  var svgWidth  = 500,
      svgHeight = 250,
      margin = { top: 20, right: 20, bottom: 40, left: 40 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom,
      chartZeroHeight = chartHeight/2;

  var ymax = d3.max(data, function(d){return d.pct95;});

  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; })),
      y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, ymax]);


  var xAxis = d3.svg.axis().scale(x).orient('bottom')
                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
      yAxis = d3.svg.axis().scale(y).orient('left')
                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10),
      zeroAxis = d3.svg.axis().scale(x).orient('bottom').ticks(0);

  //Create the svg object
  var avg_svg = d3.select('#avg_sev_v').append('svg')
    .attr('width',  svgWidth)
    .attr('height', svgHeight)
    .attr('class', 'severity')
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Set the threshold
  avg_svg.append("linearGradient")					
    .attr("id", "area-gradient")				// change from line to area
    .attr("gradientUnits", "userSpaceOnUse")	
    .attr("x1", 0).attr("y1", y(0))				
    .attr("x2", 0).attr("y2", y(ymax))			
    .selectAll("stop")								
    .data([										
      {offset: "0%", color: "green"},	
      {offset: "49.75%", color: "green"},	
      {offset: "50.5%", color: "red"},	
      {offset: "100%", color: "red"}	
    ])											
  .enter().append("stop")							
  .attr("offset", function(d) { return d.offset; })		
  .attr("stop-color", function(d) { return d.color; });	

  //Append the path
  avg_svg.append('clipPath')
    .attr('id', 'rect-clip')
    .attr('class', 'area')
    .append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight);

  addAxesAndLegend(avg_svg, xAxis, yAxis, zeroAxis, margin, chartWidth, chartHeight, chartZeroHeight);
  drawPaths(avg_svg, data, x, y, ymax);
}

var parseDate  = d3.time.format('%Y-%m-%d').parse;
d3.json('static/fakedata/severity_data.json', function (error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  var data = rawData.map(function (d) {
    return {
      date:  parseDate(d.date),
      pct95: d.pct95 / 1000
    };
  });
  makeAvgChart(data);
});
