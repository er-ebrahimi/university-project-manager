import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import MoreInfoCards from "@/share/more-info/more-info-cards";
import ProfessorInfo from "@/share/professor-profile/professor-info";
import ProjectpageSidebar from "@/components/sidebar/ProjectpageSidebar";
import { getProject } from "@/functions/services/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function MoreInfo() {
  // const [professors, setProfessors] = useState<Professor[]>(
  //   professorsData.professors as Professor[]
  // );
  function convertProfessorData(professors: any[]): Professor[] {
    return professors.map((professor) => ({
      ...professor,
      BirthDate: new Date(professor.BirthDate), // Convert BirthDate from string to Date
    }));
  }
  const professors: Professor[] = convertProfessorData(
    professorsData.professors
  );
  const {id}=useParams()
  console.log("🚀 ~ MoreInfo ~ id:", id)

  const {
    data,
    isPending,
    // isError,
    // error,
  } = useQuery({
    queryKey: [`Project${id}`],
    queryFn: () => getProject(id),  });
  return (
    <>
      <ProjectpageSidebar data={data} sideBarLoading={isPending} />
      <div className="overflow-auto">
        <div className="flex items-center">
          <h1 className=" font-semibold  mr-20 mb-2 text-lg">پروژه</h1>
        </div>
        <div
          className=" flex-1 flex  flex-row-reverse items-start justify-start gap-10 flex-wrap overflow-y-auto h-[78vh] rounded-lg   border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <ProfessorInfo></ProfessorInfo>

          <MoreInfoCards professors={professors}></MoreInfoCards>
        </div>
      </div>
    </>
  );
}
