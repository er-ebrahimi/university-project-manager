import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import ProfessorInfo from "@/share/professor-profile/professor-info";
import GraphTree from "@/components/univercitypage/GraphTree.jsx";
import MoreInfoCards from "@/share/more-info/more-info-cards";
export default function ProfessorProfile() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    setProfessors(professorsData.professors as Professor[]);
  }, []);
  return (
    <>
      <div className="flex items-center ">
        <h1 className="text-lg font-semibold md:text-2xl ">پروژه</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg  border-dashed shadow-sm "
        x-chunk="dashboard-02-chunk-1"
      >
         <MoreInfoCards professors={professors} />

        {/* <GraphTree/> */}
      </div>
    </>
  );
}
