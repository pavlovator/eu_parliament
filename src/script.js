// Map in the geoJsonEurope object
let geoJsonEurope;
let jsonEu2024;

d3.json("../data/europe.geojson")
  .then(data => {
    geoJsonEurope = data;
    console.log("GeoJSON Loaded:", geoJsonEurope);

    // Create Svg to draw Map on
    var width = 500, height = 500;
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
      .attr('stroke-width', 1);    // Optional: Set a stroke width for the paths

  }).catch(error => console.error("Error loading ../data/europe.geojson:", error));

d3.json("../data/2024/eu.json")
  .then(data => {
    jsonEu2024 = data;
    console.log("Eu json Loaded:", jsonEu2024);
  }).catch(error => console.error("Error loading ../data/2024/eu.json:", error));