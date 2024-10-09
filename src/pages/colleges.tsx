// import { useEffect, useState } from "react";
// import professorsData from "@/data/data.json";
// import { Professor } from "@/types/university";
// import ProfessorInfo from "@/share/professor-profile/professor-info";
import GraphTree from "@/components/univercitypage/GraphTree.js";
// import GraphTreee
import SubOrganizationSidebar from "@/components/sidebar/SubOrganizationSidebar";
import { useParams } from "react-router-dom";
import { getSubOrganization } from "@/functions/services/organization";
import { useQuery } from "@tanstack/react-query";

export default function Colleges() {
  // const [professors, setProfessors] = useState<Professor[]>([]);

  // useEffect(() => {
  //   setProfessors(professorsData.professors as Professor[]);
  // }, []);
  const { id } = useParams();
  const {
    data,
    isPending,
    // isError,
    // error,
  } = useQuery({
    queryKey: [`suboorganization${id}`],
    queryFn: () => getSubOrganization(id),  });
  
  // useEffect(()=>{
  //   setTimeout(()=>{

  //     console.log(data)
  //   },[10000])
  // },[data])
  return (
    <>
    <div className="overflow-hidden">
      
      <SubOrganizationSidebar data={data} loading={isPending} id={id} />

      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl ">زیرسازمان</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg  border-dashed shadow-sm overflow-auto "
        x-chunk="dashboard-02-chunk-1"
        >
        {/* <ProfessorInfo professors={professors}></ProfessorInfo> */}
        <GraphTree data={data} loading={isPending} id={id}/>
      </div>
        </div>
    </>
  );
}
