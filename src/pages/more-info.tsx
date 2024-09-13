import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import MoreInfoCards from "@/share/more-info/more-info-cards";
import ProfessorInfo from "@/share/professor-profile/professor-info";
export default function MoreInfo() {
  const [professors, setProfessors] = useState<Professor[]>(
    professorsData.professors as Professor[]
  );

  return (
    <>
    <div className="overflow-auto">
    <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl mb-4">پروژه</h1>
      </div>
      <div
        className=" flex-1 flex  flex-row-reverse items-start justify-around overflow-y-auto h-[78vh] rounded-lg   border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <ProfessorInfo professors={professors}></ProfessorInfo>

        <MoreInfoCards professors={professors}></MoreInfoCards>
      </div>
    </div>
     
    </>
  );
}
