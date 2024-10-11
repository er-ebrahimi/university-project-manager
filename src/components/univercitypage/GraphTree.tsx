import { useState } from "react";
import Tree from "react-d3-tree";
import "./GraphTree.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import DefaultImage from "@/assets/default.png";
import ClipLoader from "react-spinners/ClipLoader";
import UnivercityCard from "./UnivercityCard";
import { DataItem } from "@/functions/services/organization";
import { Degree } from "@/types/userType";

const transformPeopleToTreeData = (
  organizationData: DataItem
): TeachersData => {
  const people = organizationData.people || [];

  const transformedData: TeachersData = {
    name: organizationData.nickname || "Unknown Organization",
    children: people.map((person) => ({
      name: person.username,
      nickname: person.username,
      education_level: person.education_level, // Replace with actual major data if available
      phone_number: person.mobile_phone_number, // Replace with actual BirthDate if available
      // EmploymentDate: "Unknown", // Replace with actual EmploymentDate if available
      children: (person.projects || []).map((project: any) => ({
        name: project.name,
        Nickname: project.nickname,
        Start_date: project.start_date,
        End_date: project.end_date,
        Real_start_date: project.real_start_date,
        Real_end_date: project.real_end_date,
        External_members: project.external_members,
        Owner: person.username,
        Budget: "Unknown", // Replace with actual Budget if available
        description: "No description provided", // Add description if available
      })),
    })),
  };

  return transformedData;
};

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
  education_level:Degree;
  mobile_phone_number:number;
  children: Project[];
}

interface TeachersData {
  name: string;
  children: any[];
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
  parentName?: string;
}

export default function GraphTree({
  data,
  loading,
  id,
}: {
  data: DataItem | undefined;
  loading: boolean;
  id: string | undefined;
}) {
  console.log("🚀 ~ GraphTree ~ data:", data);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedProfessorNode, setSelectedProfessorNode] =
    useState<Professor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  const treeData = data ? transformPeopleToTreeData(data) : null;

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
      {!loading && treeData && (
        <Tree
          data={treeData}
          collapsible={true}
          initialDepth={1}
          nodeSize={{ x: 300, y: 80 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          translate={{ x: 80, y: 250 }}
          onNodeClick={(nodeData: any) =>
            handleNodeClick(nodeData, nodeData.parent?.data)
          }
        />
      )}
      {loading && (
        <div className="w-full h-full flex justify-center pt-40">
          <ClipLoader className="text-center" size={"50px"} />
        </div>
      )}

      {selectedNode && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="pl-6 pb-8 bg-gradient-to-r from-gray-100 to-gray-400 rounded-xl shadow-2xl h-[680px] w-[800px] ">
          <div className="p-6 bg-white rounded-lg">
            <div className="grid grid-cols-2 gap-8 text-right">
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">نام پروژه</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.name}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">نام مستعار</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.Nickname}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">تاریخ شروع</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.Start_date}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">تاریخ پایان</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.End_date}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">تاریخ واقعی شروع</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.Real_start_date}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">تاریخ واقعی پایان</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.Real_end_date}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">اعضای خارجی</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.External_members}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-primary-dark">صاحب پروژه</h3>
                <p className="text-gray-900 mt-1 bg-gray-100 p-3 rounded-lg shadow-inner">
                  {selectedNode.Owner}
                </p>
              </div>
            </div>
          <DialogFooter className="flex justify-end mt-6">
            <button
              onClick={handleProfessorClick}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out shadow-lg"
            >
              صفحه پروژه
            </button>
          </DialogFooter>
          </div>
      
        </DialogContent>
      </Dialog>
      
      )}
    </div>
  );
}
