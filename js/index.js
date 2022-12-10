const data = [
  {
    "Entity": "Afghanistan",
    "Code": "AFG",
    "Year": 2010,
    "Alcohol": 3.7,
    "Continent": "Asia",
    "Male": 4.9,
    "Female": 2.4
  },
  {
    "Entity": "India",
    "Code": "IND",
    "Year": 2010,
    "Alcohol": 15.1,
    "Continent": "Asia",
    "Male": 24.8,
    "Female": 4.8
  },
  {
    "Entity": "Australia",
    "Code": "AUS",
    "Year": 2010,
    "Alcohol": 84,
    "Continent": "Australia",
    "Male": 88,
    "Female": 80.1
  },
  {
    "Entity": "Brazil",
    "Code": "BRA",
    "Year": 2010,
    "Alcohol": 57.7,
    "Continent": "South America",
    "Male": 63.3,
    "Female": 46.8
  },
  {
    "Entity": "Canada",
    "Code": "CAN",
    "Year": 2010,
    "Alcohol": 77.1,
    "Continent": "North America",
    "Male": 80.3,
    "Female": 73.9
  },
  {
    "Entity": "China",
    "Code": "CHN",
    "Year": 2010,
    "Alcohol": 44.1,
    "Continent": "Asia",
    "Male": 58.4,
    "Female": 28.9
  },
  {
    "Entity": "Dominican Republic",
    "Code": "DOM",
    "Year": 2010,
    "Alcohol": 55.2,
    "Continent": "South America",
    "Male": 66.8,
    "Female": 43.8
  },
  {
    "Entity": "Egypt",
    "Code": "EGY",
    "Year": 2010,
    "Alcohol": 6.5,
    "Continent": "Africa",
    "Male": 8.6,
    "Female": 4.3
  },
  {
    "Entity": "Finland",
    "Code": "FIN",
    "Year": 2010,
    "Alcohol": 68,
    "Continent": "Europe",
    "Male": 74.1,
    "Female": 62.2
  },
  {
    "Entity": "France",
    "Code": "FRA",
    "Year": 2010,
    "Alcohol": 94.8,
    "Continent": "Europe",
    "Male": 96.5,
    "Female": 93.3
  },
  {
    "Entity": "Iceland",
    "Code": "ISL",
    "Year": 2010,
    "Alcohol": 67.9,
    "Continent": "Europe",
    "Male": 73.8,
    "Female": 61.9
  },
  {
    "Entity": "Japan",
    "Code": "JPN",
    "Year": 2010,
    "Alcohol": 68.9,
    "Continent": "Asia",
    "Male": 76.4,
    "Female": 61.9
  },
  {
    "Entity": "United Kingdom",
    "Code": "GBR",
    "Year": 2010,
    "Alcohol": 83.9,
    "Continent": "Europe",
    "Male": 87,
    "Female": 81
  },
  {
    "Entity": "United States",
    "Code": "USA",
    "Year": 2010,
    "Alcohol": 68.9,
    "Continent": "North America",
    "Male": 75.2,
    "Female": 63
  },
];

const width = 1000;
const height = 450;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.6)

const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", '#00ABB3')
  .selectAll("rect")
  .on('mouseover', OnMouseOver)//Add listener
  // .on("mouseout",OnMouseOut)//Add listener
  .data(data.sort((a, b) => d3.descending(a.Alcohol, b.Alcohol)))
  .join("rect")
  .attr("x", (d, i) => x(i))
  .attr("y", d => y(d.Alcohol))
  .attr('title', (d) => d.Alcohol)
  .attr("class", "rect")

  .attr("width", x.bandwidth() + 20)
  .transition()
  .ease(d3.easeLinear)
  .duration(500)
  .delay(function (d, i) { return i * 50 })
  .attr("height", d => y(0) - y(d.Alcohol));

// Mouse Over Event Handler

function OnMouseOver(d, i) {
  var xpos = parseFloat(d3.select(this).attr('x')) + x.bandwidth() / 2;
  var ypos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2;
  //update tooltip
  d3.select('#tooltip')
    .style('left',xpos+'px')
    .style('right',ypos+'px')
    .select('#value').text(i.Alcohol)
  d3.select('#tooltip').classed('hidden',false);
    
  d3.select(this).attr('class', 'highlight')
  d3.select(this)
    .transition()
    .duration(500)
    .attr("width", x.bandwidth() + 20)
    .attr("y", d => y(d.Alcohol) - 10)
    .attr("height", d => height - y(d.Alcohol))

}

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("dy", '-5em')
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .text('Percentage of Alcohol Consumption')


}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].Entity))
    .attr("font-size", '10px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
