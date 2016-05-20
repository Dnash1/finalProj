console.log("linked");

$('button').click(function(){
	$('button').removeClass('clicked');
	$(this).toggleClass('clicked');
});

function modal()
{
  if(document.body.className == 'modal')
  	document.body.className = '';
  else
  	document.body.className = 'modal';
}

document.getElementById('overlay').onclick = modal;

var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#mapbox').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .5
  , height = width * mapRatio;

var projection = d3.geo.albers()
    .rotate([-95, -1.5])
    .center([0, 33.5])
    .parallels([50, 60])
    .scale(width * 1.75)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
	   .projection(projection);

var svg = d3.select("#mapbox").append("svg")
	.attr("id", "mw")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g");

d3.json("finmap.json", function(map) {
  svg.append("path")
    .datum(topojson.feature(map, map.objects.regions))
    .attr("d", path)
    .attr("id", "tibet")
    .transition().duration(4500).style("stroke", "white")
    .transition().duration(4500).style("fill", "#aad4e5");
  })

d3.json("data.json", function(error, db) {
	svg.selectAll(".label")
    .data(db.places)
  .enter().append("text")
    .attr("class", "label")
    .attr("transform", function(d) { return "translate(" + projection([d.lat, d.lon]) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });
})


function allPoints() {
	clearMap();
	for(var i = 4; i < 4; i++) {
		setPoints(i);
	}
}

function clearMap() {
	d3.select("svg").selectAll("circle.point")
		.remove();
}

function updateMap(o) {
	clearMap();
	setPoints(o);
}

function setPoints(y) {
	d3.json("data.json", function(error, db) {
		svg.selectAll(".label")
		.transition().duration(2500).attr("opacity", .3);
		if (error) {console.log(error)} else
		console.log(db);
		if (y === 7) {
			for (var i = 0; i < 6; i++) {
				d3.select("svg").selectAll("circle.point")
		  		.data(db.stuff[i].incidents)
		  		.enter()
		  		.append("circle")
		  		.attr("class", "point")
		  		.attr("r", 1)
		  		.html(function(d) {return d.id} )
		  		.on("mouseover", function() {
		  			d3.select(this).style("fill", "black").attr("r", 5)
		  		})
		  		.on("click", function() {
		  			modal();
		  			d3.select(this).style("fill", "black").attr("r", 5)
		  			var x = this.innerHTML;
		  			d3.select("#biobox").selectAll("img").remove();
		  			d3.select("#biobox")
		  				.style("opacity", 0)
		  				.transition().duration(1500).style("opacity", 10);
		  			d3.select("#biobox").insert("img", "#nam")
		  				.data(db.stuff[i].incidents)
		  				.attr("src", function(d, i) {return db.stuff[i].incidents[x].img} )
		  				.attr("alt", "");
		  			d3.select("#nmplt")
		  				.data(db.stuff[i].incidents)
		  				.text(function(d, i) {return db.stuff[i].incidents[x].name});
		  			d3.select("#ageplt")
		  				.data(db.stuff[i].incidents)
		  				.text(function(d, i) {return db.stuff[i].incidents[x].age});
		  			d3.select("#dateplt")
		  				.data(db.stuff[i].incidents)
		  				.text(function(d, i) {return db.stuff[i].incidents[x].date});
		  			d3.select("#stplt")
		  				.data(db.stuff[i].incidents)
		  				.text(function(d, i) {return db.stuff[i].incidents[x].status});
		  			d3.select("#infplt")
		  				.data(db.stuff[i].incidents)
		  				.text(function(d, i) {return db.stuff[i].incidents[x].info});
		  		})
		  		.on("mouseout", function() {
		  			d3.select(this).style("fill", "red").attr("r", 3);
		  		})
		  		.attr("transform", function(d) {
		  			return "translate(" + projection([d.lat, d.lon]) + ")";})
		  		.transition().duration(1500).attr("r", 3);
			}
		} else {
			d3.select("svg").selectAll("circle.point")
		  		.data(db.stuff[y].incidents)
		  		.enter()
		  		.append("circle")
		  		.attr("class", "point")
		  		.attr("r", 1)
		  		.html(function(d) {return d.id} )
		  		.on("mouseover", function() {
		  			d3.select(this).style("fill", "black").attr("r", 5)
		  		})
		  		.on("click", function() {
		  			d3.select(this).style("fill", "black").attr("r", 5)
		  			modal();
		  			var x = this.innerHTML;
		  			d3.select("#biobox").selectAll("img").remove();
		  			d3.select("#biobox")
		  				.style("opacity", 0)
		  				.transition().duration(1500).style("opacity", 10);
		  			d3.select("#biobox").insert("img", "#nam")
		  				.data(db.stuff[y].incidents)
		  				.attr("src", function(d, i) {return db.stuff[y].incidents[x].img} )
		  				.attr("alt", "");
		  			d3.select("#nmplt")
		  				.data(db.stuff[y].incidents)
		  				.text(function(d, i) {return db.stuff[y].incidents[x].name});
		  			d3.select("#ageplt")
		  				.data(db.stuff[y].incidents)
		  				.text(function(d, i) {return db.stuff[y].incidents[x].age});
		  			d3.select("#dateplt")
		  				.data(db.stuff[y].incidents)
		  				.text(function(d, i) {return db.stuff[y].incidents[x].date});
		  			d3.select("#stplt")
		  				.data(db.stuff[y].incidents)
		  				.text(function(d, i) {return db.stuff[y].incidents[x].status});
		  			d3.select("#infplt")
		  				.data(db.stuff[y].incidents)
		  				.text(function(d, i) {return db.stuff[y].incidents[x].info});
		  		})
		  		.on("mouseout", function() {
		  			d3.select(this).style("fill", "red").attr("r", 3);
		  		})
		  		.attr("transform", function(d) {
		  			return "translate(" + projection([d.lat, d.lon]) + ")";})
		  		.transition().duration(1500).attr("r", 3);
		  	}
	})
}

