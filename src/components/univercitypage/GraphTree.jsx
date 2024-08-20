import { X } from "lucide-react";
import React from "react";
import Tree from "react-d3-tree";
import "./GraphTree.css";

// This is a simplified example of an org chart with a depth of 2.
const teachers = {
  name: "کامپیوتر",
  children: [
    {
      name: "مینایی",
      children: [
        { name: "project A" },
        { name: "project B" },
        { name: "project C" },
      ],
    },
    {
      name: "آشتیانی",
      children: [
        { name: "project A" },
        { name: "project B" },
        { name: "project C" },
      ],
    },
    {
      name: "کشوری",
      children: [
        { name: "project A" },
        { name: "project B" },
        { name: "project C" },
      ],
    },
  ],
};

export default function GraphTree() {
  const containerStyles = {
    width: "100%",
    height: "100vh", // Full viewport height to accommodate tree display
  };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" className="w-96 h-96 flex justify-center items-center" style={containerStyles}>
      <Tree

        data={teachers}
        collapsible={true}
        initialDepth={1}
        nodeSize={{ x: 300, y: 80 }}  
        separation={{ siblings: 1, nonSiblings: 1 }}       rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        translate={{x:50,y:200}} // Add translation to adjust tree position

       
      />
    </div>
  );
}
