import dummyData from './data.js'

const t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);


const data = dummyData
const filteredData = data.filter((d, i) => i % 20 === 0);
const width = 1300
const height = 600
const margin = {
    bottom: 20,
    top: 20,
    left: 30,
    right: 30
}
const dataFirst = data.map(datap => Number(datap[0].slice(0, 4)))
console.log(dataFirst)
const filtered = dataFirst.filter(data => data % 5 === 0 || data != data)
console.log(filtered)
const innerHeight = height - (margin.bottom + margin.top)
const innerWidth = width - (margin.left + margin.right)




const xScale = d3.scaleBand()
    .domain(data.map((dataPoint) => dataPoint[0]))
    .rangeRound([0, innerWidth])
    .padding(0.1);
const xScaleAxis = d3.scaleBand()
    .domain(filtered)
    .rangeRound([0, innerWidth])
    .padding(0.5);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map((dataPoint) => dataPoint[1]))])
    .range([innerHeight, 0]);

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)


const g = d3.select('svg')
    .append('g')
    .attr('width', innerWidth)
    .attr('height', innerHeight)

const title = svg.append("text")
    .attr("x", (innerWidth / 2))
    .attr("y", 0 + 50)
    .attr('id', 'title')
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("GDP");

const rect = d3.select('g')
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('fill', "teal")
    .attr("data-date", ((data) => data[0]))
    .attr('data-gdp', ((data) => data[1]))
    .attr('width', xScale.bandwidth() - 2)
    .attr('height', (data) => innerHeight - yScale(data[1]))
    .attr('x', data => xScale(data[0]))
    .attr('y', (data => yScale(data[1])))

    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.45')
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1')
    })
    .append("title")
    .text((d) => d)



const yAxis = d3.axisRight(yScale)
const gy = svg.append("g")
    .attr("transform", `translate(${innerWidth},0 )`)
    .attr('height', innerHeight)
    .call(yAxis)
    .attr('id', 'y-axis')
console.log(yAxis)




const xAxis = d3.axisBottom(xScaleAxis)
const gx = svg.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .attr('width', innerWidth)
    .attr('id', 'x-axis')

    .call(xAxis)

