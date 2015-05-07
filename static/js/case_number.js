(function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 500 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var movingWindowAvg = function (arr, step) {  // Window size = 2 * step + 1
      return arr.map(function (_, idx) { 
          var leftBound = (idx - step >= 0) ? idx - step : 0;
          var rightBound = (idx + step + 1 <= arr.length - 1) ? idx + step + 1 : arr.length - 1;
          var wnd = arr.slice(leftBound, rightBound); 
          var result = d3.sum(wnd, function(d) {return d.close}) / wnd.length;
          // Check for isNaN, the javascript way
          result = (result == result) ? result : _.close;
          result = Math.round(result);
          var newobj = {date: _.date, close: result};  
          return newobj;
      });
  };

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); })
      .interpolate("basis");

  var svg = d3.select("#case_num_v").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("/static/fakedata/case_num_data2.tsv", function(error, data2) {
    data2.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });
    var data3 = movingWindowAvg(data2, 15);
    data3.forEach(function(d) {
      d.close = +d.close;
    });
    x.domain(d3.extent(data2, function(d) { return d.date; }));
    y.domain(d3.extent(data2, function(d) { return d.close; }));

    var spliced_data = [];
    for (var i = 0; i < data2.length; i = i + 4) {
      spliced_data.push(data2[i]);
    }

    svg.selectAll("circle").data(spliced_data).enter()
      .append("circle")
        .attr("cx", function(d){return x(d.date);})
        .attr("cy",function(d){return y(d.close);})
        .attr("r", 3);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# of Cases");
    
    svg.append("path")
        .datum(data3)
        .attr("class", "line")
        .attr("d", line);
  });
}).call(this);
