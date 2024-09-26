import { useEffect, useState } from "react";
import { Major } from "@/types/university";
import { majors as majorsData } from "@/data/major"; // Updated import to match the correct data file
import ForceGraph from "@/components/tree/Majors";
//
import AddFieldDialog from "@/components/fieldspage/AddFieldDialog";
import UnivercitySidebar from "@/components/sidebar/firstpageSidebar";
import { useUserPermissionsName } from "@/functions/Usercontext";

export default function Universities() {
  const [majors, setMajors] = useState<Major[]>([]);
  const userPermissionsName = useUserPermissionsName();

  useEffect(() => {
    // Set the majors state with the data imported from the majorsData file
    setMajors(majorsData as Major[]);
    console.log(majors); // Ensure that the majors are being set correctly
  }, []);

  return (
    <>
      <UnivercitySidebar />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">سازمان ها</h1>
      </div>
      <div
        className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {/* Pass the majors state to the ForceGraph component */}
        <ForceGraph majors={majors} />
        <div className="flex flex-row-reverse justify-start gap-4 w-[75vw] ml-1">
          {userPermissionsName === "SuperAdmin" && (
            <AddFieldDialog majors={majors} setMajors={setMajors} />
          )}
          {/* Pass the majors state and the setMajors function to EditFieldDialog */}
          {/* <EditFieldDialog majors={majors} setMajors={setMajors} /> */}
        </div>
      </div>
    </>
  );
}
