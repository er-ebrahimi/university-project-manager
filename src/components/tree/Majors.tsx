import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";
// import { Major } from "@/types/university";
// import { DataItem } from "@/functions/services/organization";
import routes from "@/global/routes";
import { DataItem } from "@/functions/services/organization";

interface Node {
  id: string;
  group: number;
  RealId:number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

function ForceGraph({ majors }: { majors: DataItem[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nodes: Node[] = [{ id: majors[0]?.organization?.name, group: 0,RealId:0 }].concat(
      majors.map((major) => ({ id: major.name, group: 1,RealId:major.id }))
    );
    console.log("nodes: ", nodes);

    const links: Link[] = majors.map((major) => ({
      source: majors[0]?.organization?.name,
      target: major.name,
    }));

    drawForceGraph(nodes, links);
  }, [majors]);

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
      .on("click", (event, d) => {
        if(!event){
          console.log("")
        }
        if (d.group === 1) {
          navigate(routes.Colleges(d.RealId));
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

  return <svg ref={svgRef} width={1000} height={450}></svg>;
}

export default ForceGraph;
