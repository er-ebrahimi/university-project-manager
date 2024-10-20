import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Cumulative.css";

interface DataPoint {
  year: number;
  count: number;
  cumulativeCount: number;
}

interface CumulativeLineChartProps {
  data: DataPoint[];
}

const CumulativeLineChart: React.FC<CumulativeLineChartProps> = ({ data }) => {
  console.log("🚀 ~ dataaaaa:", data)
  const ref = useRef<SVGSVGElement | null>(null);
  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const width = 1500 - margin.left - margin.right;
  const height = 480 - margin.top - margin.bottom;

  useEffect(() => {
    if (data && data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    if (!ref.current) return;

    // Clear any existing chart before drawing a new one
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const uniqueYears = Array.from(new Set(data.map((d) => d.year)));
    // console.log("🚀 ~ drawChart ~ uniqueYears:", uniqueYears)
    const x = d3
      .scaleLinear()
      .domain(d3.extent(uniqueYears) as [number, number])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(20,${height+2})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(uniqueYears.length - 1));

    // Single Y axis for both cumulative count and count (left axis)
    const y = d3
      .scaleLinear()
      .domain([
        0,
        Math.max(
          d3.max(data, (d) => d.cumulativeCount) || 0,
          d3.max(data, (d) => d.count) || 0
        ),
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Add cumulative count line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 5)
      .attr(
        "d",
        d3
          .line<DataPoint>()
          .x((d) => {
            // console.log(x)
            return x(d.year)})
          .y((d) => y(d.cumulativeCount))
      );

    // Add count line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-width", 5)
      .attr(
        "d",
        d3
          .line<DataPoint>()
          .x((d) => x(d.year))
          .y((d) => y(d.count))
      );

    // Legends
    const legends = svg
      .append("g")
      .attr("font-size", 16)
      .selectAll("g")
      .data([
        { color: "steelblue", text: "مقاله اساتید" },
        { color: "purple", text: "مقاله بهینه" },
      ])
      .enter()
      .append("g")
      .attr("transform", (_, i) => `translate(0,${i * 20})`);

    legends
      .append("rect")
      .attr("x", 5)
      .attr("y", 5)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => d.color);

    legends
      .append("text")
      .attr("x", 20)
      .attr("y", 15)
      .text((d) => d.text);
  };

  return <svg ref={ref}></svg>;
};

export default CumulativeLineChart;
