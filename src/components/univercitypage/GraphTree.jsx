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
        name: "قاسم اصغری",
        children: [
          {
            name: "پروژه 1",
            Nickname: "پروژه 1",
            Start_date: "12 خرداد ۱۴۰۳",
            End_date: "25 بهمن ۱۴۰۳",
            Real_start_date: "15 تیر ۱۴۰۳",
            Real_end_date: "28 اسفند ۱۴۰۳",
            External_members: "عضو ۱, عضو ۲",
            Owner: "قاسم اصغری",
            Budget: "۱۰۰,۰۰۰ دلار",
            description: "توضیحات پروژه 1",
          },
          {
            name: "پروژه 2",
            Nickname: "پروژه 2",
            Start_date: "۲۲ خرداد ۱۴۰۳",
            End_date: "۱ شهریور ۱۴۰۳",
            Real_start_date: "10 مرداد ۱۴۰۳",
            Real_end_date: "۳۰ آذر ۱۴۰۳",
            External_members: "عضو ۳, عضو ۴",
            Owner: "قاسم اصغری",
            Budget: "۱۵۰,۰۰۰ دلار",
            description: "توضیحات پروژه 2",
          },
        ],
      },
      {
        name: "امیر اکبری",
        children: [
          {
            name: "پروژه 3",
            Nickname: "پروژه 3",
            Start_date: "12 خرداد ۱۴۰۳",
            End_date: "۲۲ خرداد ۱۴۰۳",
            Real_start_date: "25 تیر ۱۴۰۳",
            Real_end_date: "15 دی ۱۴۰۳",
            External_members: "عضو ۵, عضو ۶",
            Owner: "امیر اکبری",
            Budget: "۱۲۰,۰۰۰ دلار",
            description: "توضیحات پروژه 3",
          },
          {
            name: "پروژه 4",
            Nickname: "پروژه 4",
            Start_date: "15 شهریور ۱۴۰۳",
            End_date: "25 مهر ۱۴۰۳",
            Real_start_date: "1 مهر ۱۴۰۳",
            Real_end_date: "30 دی ۱۴۰۳",
            External_members: "عضو ۷, عضو ۸",
            Owner: "امیر اکبری",
            Budget: "۱۸۰,۰۰۰ دلار",
            description: "توضیحات پروژه 4",
          },
        ],
      },
      {
        name: "سهیله اتمدی",
        children: [
          {
            name: "پروژه 5",
            Nickname: "پروژه 5",
            Start_date: "10 مهر ۱۴۰۳",
            End_date: "1 آبان ۱۴۰۳",
            Real_start_date: "15 آبان ۱۴۰۳",
            Real_end_date: "30 بهمن ۱۴۰۳",
            External_members: "عضو ۹, عضو ۱۰",
            Owner: "سهیله اتمدی",
            Budget: "۱۳۰,۰۰۰ دلار",
            description: "توضیحات پروژه 5",
          },
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

  return (
    <div
      id="treeWrapper"
      className="w-full flex justify-center overflow-auto items-center border rounded-lg border-dashed shadow-sm h-[79vh]"
    >
      <div className="w-60">hi</div>

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
        onNodeClick={(nodeData) =>
          handleNodeClick(nodeData.data, nodeData.parent.data)
        }
      />

      {selectedNode && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="p-6 bg-white rounded-lg shadow-lg h-5/6  overflow-y-auto scroll-smooth w-[400px] ">
            <div className="text-right">
              <div className="mb-4">
                <h3 className="font-bold text-lg">صاحب پروژه</h3>
                <p
                  onClick={handleprofesserClick}
                  className="text-gray-600 cursor-pointer"
                >
                  {selectedNode.parentName}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">نام پروژه</h3>
                <p className="text-gray-600">{selectedNode.name}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">نام مستعار</h3>
                <p className="text-gray-600">{selectedNode.Nickname}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">تاریخ شروع</h3>
                <p className="text-gray-600">{selectedNode.Start_date}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">تاریخ پایان</h3>
                <p className="text-gray-600">{selectedNode.End_date}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">تاریخ واقعی شروع</h3>
                <p className="text-gray-600">{selectedNode.Real_start_date}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">تاریخ واقعی پایان</h3>
                <p className="text-gray-600">{selectedNode.Real_end_date}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">اعضای خارجی</h3>
                <p className="text-gray-600">{selectedNode.External_members}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">صاحب</h3>
                <p className="text-gray-600">{selectedNode.Owner}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg">بودجه</h3>
                <p className="text-gray-600">{selectedNode.Budget}</p>
              </div>
            </div>
            <DialogFooter className="gap-3">
              <button
                onClick={handleprofesserClick}
                className="mt-4 bg-primary text-white py-2 px-4 rounded "
              >
                صفحه استاد
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
