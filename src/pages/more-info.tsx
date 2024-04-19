import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import MoreInfoCards from "@/share/more-info/more-info-cards";
export default function MoreInfo() {
  const [professors, setProfessors] = useState<Professor[]>(
    professorsData.professors as Professor[]
  );

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">More Info</h1>
      </div>
      <div
        className=" flex-1 items-center justify-center rounded-lg  border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <MoreInfoCards professors={professors}></MoreInfoCards>
      </div>
    </>
  );
}
