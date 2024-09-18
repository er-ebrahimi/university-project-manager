import { useState } from "react";
import Tree from "react-d3-tree";
import "./GraphTree.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import DefaultImage from "@/assets/default.png"; // Assuming you have the image stored

import UnivercityCard from "./UnivercityCard";

// Define the types for the nodes and the teachers data
interface Project {
  name: string;
  Nickname: string;
  Start_date: string;
  End_date: string;
  Real_start_date: string;
  Real_end_date: string;
  External_members: string;
  Owner: string;
  Budget: string;
  description: string;
}

interface Professor {
  name: string;
  nickname: string;
  major: string;
  BirthDate: string;
  EmploymentDate: string;
  children: Project[];
}

interface TeachersData {
  name: string;
  children: Professor[];
}

interface NodeData {
  name: string;
  Nickname?: string;
  Start_date?: string;
  End_date?: string;
  Real_start_date?: string;
  Real_end_date?: string;
  External_members?: string;
  Owner?: string;
  Budget?: string;
  children?: NodeData[];
  parentName?:string
}

export default function GraphTree() {
  const { major } = useParams<{ major: string }>(); // Type the major parameter
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedProfessorNode, setSelectedProfessorNode] = useState<Professor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const teachers: TeachersData = {
    name: major || "Unknown Major",
    children: [
      {
        name: "قاسم اصغری",
        nickname: "قاسم",
        major: "شیمی",
        BirthDate: "1985-12-12",
        EmploymentDate: "2020-01-30",
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
        nickname: "امیر",
        major: "شیمی",
        BirthDate: "1985-12-12",
        EmploymentDate: "2020-01-30",
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
        nickname: "سهیله",
        major: "شیمی",
        BirthDate: "1985-12-12",
        EmploymentDate: "2020-01-30",
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

  const BoxData = (node: Professor) => {
    if (selectedProfessorNode?.name !== node.name) {
      setSelectedProfessorNode(node);
    }
  };

  const handleNodeClick = (nodeData: any, parentData: any) => {
    const data = nodeData.data as NodeData;

    if (nodeData.depth === 1) {
      BoxData(data as Professor);
      return;
    }

    if (!nodeData.data.children || nodeData.data.children.length === 0) {
      setSelectedNode({ ...data, parentName: parentData?.name });
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNode(null);
  };

  const handleProfessorClick = () => {
    if (selectedNode?.parentName) {
      navigate(`/app/more-info/${selectedNode.parentName}`);
    }
  };

  return (
    <div
      id="treeWrapper"
      className="w-full flex justify-center overflow-auto items-center border rounded-lg border-dashed shadow-sm h-[79vh]"
    >
      <div className="w-80 h-full border-l border border-dashed">
        {!selectedProfessorNode ? (
          <img
            src={DefaultImage}
            alt="Default"
            className="mt-14 mx-auto w-11/12 "
          />
        ) : (
          <UnivercityCard data={selectedProfessorNode} />
        )}
      </div>
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
        onNodeClick={(nodeData: any) =>
          handleNodeClick(nodeData, nodeData.parent?.data)
        }
      />

      {selectedNode && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="p-6 pb-8 bg-white rounded-lg shadow-lg h-[500px] w-[700px]">
            <div className="text-right">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">نام پروژه</h3>
                  <p className="text-gray-600">{selectedNode.name}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">نام مستعار</h3>
                  <p className="text-gray-600">{selectedNode.Nickname}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">تاریخ شروع</h3>
                  <p className="text-gray-600">{selectedNode.Start_date}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">تاریخ پایان</h3>
                  <p className="text-gray-600">{selectedNode.End_date}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">تاریخ واقعی شروع</h3>
                  <p className="text-gray-600">{selectedNode.Real_start_date}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">تاریخ واقعی پایان</h3>
                  <p className="text-gray-600">{selectedNode.Real_end_date}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">اعضای خارجی</h3>
                  <p className="text-gray-600">{selectedNode.External_members}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">صاحب پروژه</h3>
                  <p className="text-gray-600">{selectedNode.Owner}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-dark">بودجه</h3>
                  <p className="text-gray-600">{selectedNode.Budget}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={handleProfessorClick}
                className="ml-3 bg-primary text-white py-2 px-4 rounded-md"
              >
                صفحه پروژه
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}