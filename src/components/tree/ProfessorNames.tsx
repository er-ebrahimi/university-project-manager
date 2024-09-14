import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useNavigate, useParams } from "react-router-dom";
import { Professor } from "@/types/university";

interface Node {
  id: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

function ForceGraph({ professors }: { professors: Professor[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null); // Specify the correct type for the ref
  const { major } = useParams<{ major: string }>(); // Extract major from URL and type it
  const filteredProfessors = professors.filter((p) => p.major === major);
  const navigate = useNavigate();

  useEffect(() => {
    const nodes: Node[] = [{ id: "استادها", group: 0 }].concat(
      filteredProfessors.map((prof) => ({
        id: `${prof.ProfessorFN} ${prof.ProfessorLN}`,
        group: 1,
      }))
    );

    const links: Link[] = filteredProfessors.map((prof) => ({
      source: `${prof.ProfessorFN} ${prof.ProfessorLN}`,
      target: "استادها",
    }));

    drawForceGraph(nodes, links);
  }, [professors, major]); // Ensure that the graph redraws when professors or major change

  function drawForceGraph(nodes: Node[], links: Link[]) {
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current!);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-opacity", 0.6);

    const nodeGroup = svg
      .append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(nodes)
      .join("g")
      .call(dragBehavior(simulation));

    nodeGroup
      .append("circle")
      .attr("r", 10)
      .style("stroke-width", "2px")
      .on("click", (event, d) => {
        if(!event){
          console.log("f")
        }
        if (d.group === 1) {
          navigate(`/professor/${encodeURIComponent(d.id)}`);
        }
      })
      .classed("hover:cursor-pointer fill-current", true)
      .classed("stroke-primary hover:stroke-primary/90", true)
      .classed("text-primary hover:text-primary/90", (d) => d.group !== 0)
      .classed("text-secondary hover:text-secondary/90", (d) => d.group === 0);

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
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }

  const dragBehavior = (simulation: d3.Simulation<Node, Link>) => {
    return d3
      .drag<SVGGElement, Node>()
      .on("start", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });
  };

  return <svg ref={svgRef} width={800} height={500}></svg>;
}

export default ForceGraph;
