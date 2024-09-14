import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import ProfessorInfo from "@/share/professor-profile/professor-info";
import GraphTree from "@/components/univercitypage/GraphTree.jsx";
import SubOrganizationSidebar from "@/components/sidebar/SubOrganizationSidebar";
import { useParams } from "react-router-dom";

export default function Colleges() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    setProfessors(professorsData.professors as Professor[]);
  }, []);
  const { major } = useParams();

  return (
    <>
    <div className="overflow-hidden">
      
      <SubOrganizationSidebar data={major} />

      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl ">استاد</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg  border-dashed shadow-sm overflow-auto "
        x-chunk="dashboard-02-chunk-1"
        >
        {/* <ProfessorInfo professors={professors}></ProfessorInfo> */}
        <GraphTree/>
      </div>
        </div>
    </>
  );
}
