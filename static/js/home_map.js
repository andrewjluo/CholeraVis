(function() {
	var width  = 520;
	var height = 800;

	var rateByUpazila = d3.map();

	var quantize = d3.scale.quantize()
	.domain([0, 1.0])
	.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

	var svg = d3.select("#home_map_v").append("svg")
	.attr("width", width).attr("height", height)

  debugger

	var ready = function(error, json) {
      // create a first guess for the projection
      var center = d3.geo.centroid(json)
      var scale  = 150;
      var offset = [width/2, height/2];
      var projection = d3.geo.mercator().scale(scale).center(center)
      .translate(offset);

      // create the path
      var path = d3.geo.path().projection(projection);

      // using the path determine the bounds of the current map and use 
      // these to determine better values for the scale and translation
      var bounds  = path.bounds(json);
      var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
      var scale   = (hscale < vscale) ? hscale : vscale;
      var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
      height - (bounds[0][1] + bounds[1][1])/2];

      // new projection
      projection = d3.geo.mercator().center(center)
      .scale(0.95* scale).translate(offset);
      path = path.projection(projection);

      // //add a rectangle to see the bound of the svg
      // svg.append("rect").attr('width', width).attr('height', height)
      // .style('stroke', 'black').style('fill', 'none');

      svg.selectAll("path")
      .data(json.features).enter().append("path")
      .attr("d", path)
      .attr("id", function(d) {return d.properties.UPAZILA})
      .attr("class", function(d) { return quantize(Math.random()); })
      .style("stroke-width", "1")
      .style("stroke", "black");
  };

	queue()
	.defer(d3.json, "/static/fakedata/bangladesh_simple.geojson")
	.await(ready)

}).call(this);