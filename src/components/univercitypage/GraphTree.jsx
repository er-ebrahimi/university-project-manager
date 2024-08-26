import React, { useState } from "react";
import Tree from "react-d3-tree";
import "./GraphTree.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function GraphTree() {
  const { major } = useParams();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const teachers = {
    name: major,
    children: [
      {
        name: "مینایی",
        children: [
          { name: "پروژه 1", description: "توضیحات پروژه 1" },
          { name: "پروژه 2", description: "توضیحات پروژه 2" },
          { name: "پروژه 3", description: "توضیحات پروژه 3" },
          { name: "پروژه 4", description: "توضیحات پروژه 4" },
          { name: "پروژه 5", description: "توضیحات پروژه 5" },
        ],
      },
      {
        name: "آشتیانی",
        children: [
          { name: "پروژه 1", description: "توضیحات پروژه 1" },
          { name: "پروژه 2", description: "توضیحات پروژه 2" },
          { name: "پروژه 3", description: "توضیحات پروژه 3" },
          { name: "پروژه 4", description: "توضیحات پروژه 4" },
        ],
      },
      {
        name: "کشوری",
        children: [
          { name: "پروژه 1", description: "توضیحات پروژه 1" },
          { name: "پروژه 2", description: "توضیحات پروژه 2" },
          { name: "پروژه 3", description: "توضیحات پروژه 3" },
        ],
      },
    ],
  };

  const handleNodeClick = (nodeData, parentData) => {
    if (!nodeData.children || nodeData.children.length === 0) {
      setSelectedNode({ ...nodeData, parentName: parentData.name });
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNode(null);
  };

  const handleprofesserClick = () => {
    navigate(`/app/professor/${selectedNode.parentName}`);
  };
  const handleEditClick = () => {
    // Add your edit logic here
    alert(`Editing ${selectedNode.name}`);
  };

  return (
    <div
      id="treeWrapper"
      className="w-full flex justify-center items-center border rounded-lg border-dashed shadow-sm h-[77vh]"
    >
      <Tree
        data={teachers}
        collapsible={true}
        initialDepth={1}
        nodeSize={{ x: 300, y: 80 }}
        separation={{ siblings: 1, nonSiblings: 1 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        translate={{ x: 50, y: 250 }}
        onNodeClick={(nodeData) => handleNodeClick(nodeData.data, nodeData.parent.data)}
      />

      {selectedNode && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
            <div className="text-right">
              <div className="mb-4">
                <h3 className="font-bold text-lg">صاحب پروژه</h3>
                <p onClick={()=>handleprofesserClick()} className="text-gray-600">{selectedNode.parentName}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">نام پروژه</h3>
                <p className="text-gray-600">{selectedNode.name}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">توضیحات</h3>
                <p className="text-gray-600">{selectedNode.description}</p>
              </div>
            </div>
            <DialogFooter className="gap-3">
              <button
                onClick={handleEditClick}
                className="mt-4 bg-primary text-white py-2 px-4 rounded"
              >
                ویرایش
              </button>
              <button
                onClick={handleCloseDialog}
                className="mt-4 ml-2 bg-primary text-white py-2 px-4 rounded"
              >
                بستن
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
