import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";
import { Major } from "@/types/university";
import routes from "@/global/routes";

function ForceGraph({ majors }: { majors: Major[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const widthMain: number = 928;
  const heightMain: number = 680;
  const navigate = useNavigate();

  useEffect(() => {
    // Nodes: one for the university and one for each major
    const nodes = [{ id: "دانشگاه", group: 0 }].concat(
      majors.map((major) => ({ id: major.name, group: 1 }))
    );
    console.log("nodes: ",nodes)

    // Links: between the university and each major
    const links = majors.map((major) => ({
      source: "دانشگاه",
      target: major.name,
    }));

    drawForceGraph(nodes, links);
  }, [majors]); // Redraw graph when majors data changes

  function drawForceGraph(nodes, links) {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .selectAll("line")
      .data(links, (d) => [d.source, d.target])
      .attr("stroke-opacity", 0.6)
      .join("line");

    // Important: Group for nodes to hold both circles and texts for smoother dragging
    const nodeGroup = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("g")
      .call(dragBehavior(simulation));

    // Append circles to the group
    nodeGroup
      .append("circle")
      .attr("r", 10)
      .on("click", (event, d) => {
        if (d.group === 1) {
          navigate(routes.Colleges(d.id)); // Use the correct path here
        }
      })
      .classed("hover:cursor-pointer fill-current", true)
      .classed("stroke-primary hover:stroke-primary/90", true)
      .classed("text-primary hover:text-primary/90", (d) => d.group !== 0)
      .classed("text-secondary hover:text-secondary/90", (d) => d.group === 0);

    // Append text labels to the group
    nodeGroup
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("dy", "1.5em")
      .attr("fill", "primary")
      .style("font-size", "12px")
      .style("font-weight", "700");

    simulation.on("tick", () => {
      nodeGroup.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }

  // Drag behavior
  const dragBehavior = (simulation) => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  return (
    <svg ref={svgRef} width={1000} height={450}></svg>
  );
}

export default ForceGraph;
