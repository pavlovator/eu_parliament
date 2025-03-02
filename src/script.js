// Map in the geoJsonEurope object
let geoJsonEurope;
let jsonEu2024;

// Create a tooltip div (hidden by default)
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "white")
    .style("padding", "5px")
    .style("border", "1px solid black")
    .style("border-radius", "5px")
    .style("visibility", "hidden");

d3.json("../data/europe.geojson")
  .then(data => {
    geoJsonEurope = data;
    console.log("GeoJSON Loaded:", geoJsonEurope);

    // Create Svg to draw Map on
    var width = 800, height = 800;
    let projection = d3.geoMercator();
    projection.fitSize([width, height], geoJsonEurope);
    let geoGenerator = d3.geoPath().projection(projection);

    let svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);
    
    svg.selectAll('path')  // Select all path elements inside the svg
      .data(geoJsonEurope.features)      // Bind your geojson features to the paths
      .join('path')                // Join the new data to new <path> elements
      .attr('d', geoGenerator)     // Set the path data using the geoGenerator
      .attr('fill', 'lightblue')   // Optional: Set a fill color for the paths
      .attr('stroke', 'black')     // Optional: Set a stroke color for the paths
      .attr('stroke-width', 1)    // Optional: Set a stroke width for the paths
      .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "blue");
        tooltip.style("visibility", "visible")
               .text(d.properties.NAME);
      })
      .on("mousemove", function(event) {
          tooltip.style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
          d3.select(this).attr("fill", "lightblue");
          tooltip.style("visibility", "hidden");
      });
    console.log(geoJsonEurope.ISO2)

  }).catch(error => console.error("Error loading ../data/europe.geojson:", error));