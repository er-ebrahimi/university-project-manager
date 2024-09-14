import { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import ProfessorNames from "@/components/tree/ProfessorNames";

function convertProfessorData(data: any[]): Professor[] {
  return data.map(professor => ({
    ...professor,
    BirthDate: new Date(professor.BirthDate), // Convert string to Date
    AssociateProfessor: new Date(professor.AssociateProfessor), // If this field is a date too
    EmploymentDate: new Date(professor.EmploymentDate) // If this field is a date too
  }));
}

export default function Majors() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    const convertedData = convertProfessorData(professorsData.professors);
    setProfessors(convertedData);
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">نام اساتید</h1>
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
