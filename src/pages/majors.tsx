import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import ProfessorNames from "@/components/tree/ProfessorNames";
export default function Majors() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    setProfessors(professorsData.professors as Professor[]);
  }, []);
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Professor Names</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <ProfessorNames professors={professors}></ProfessorNames>
      </div>
    </>
  );
}
