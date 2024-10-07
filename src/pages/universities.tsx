// pages/Universities.tsx

import ForceGraph from "@/components/tree/Majors";
import AddFieldDialog from "@/components/fieldspage/AddFieldDialog";
import UnivercitySidebar from "@/components/sidebar/firstpageSidebar";
import { useUserPermissionsName } from "@/functions/Usercontext";
import { useQuery } from "@tanstack/react-query";
import { getSuborganizationData } from "@/functions/services/organization";
// import { DataItem } from "@/functions/services/organization"; // Ensure this import path is correct
import toast from "react-hot-toast";

export default function Universities() {
  const userPermissionsName = useUserPermissionsName();

  // Use useQuery to fetch the suborganization data
  // const {
  //   data: suborganizations,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery(
  //   ["suborganizations"], // queryKey
  //   getSuborganizationData // queryFn
  // );

  const {
    data: suborganizations,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["suborganizations"],
    queryFn: getSuborganizationData,
  });
  // Handle loading and error states
  if (isPending) {
    // return <div>در حال بارگذاری سازمان‌ها...</div>;
    return toast.loading("در حال بارگذاری سازمان‌ها...",{duration:2000});
  }

  if (isError) {
    // return <div>خطا در بارگذاری سازمان‌ها: {error.message}</div>;
    return toast.error(`خطا در بارگذاری سازمان‌ها: ${error.message}`,{duration:2000});
  }

  // Map suborganizations to the format expected by ForceGraph
  // const majors = suborganizations?.map((suborg: DataItem) => ({
  //   id: suborg.id,
  //   name: suborg.name,
  //   nickname: suborg.nickname,
  //   address: suborg.address,
  //   phone_number: suborg.phone_number,
  //   postal_code: suborg.postal_code,
  //   create_date: suborg.create_date,
  //   people: suborg.people,
  //   organization: suborg.organization,
  //   // Include any other properties needed by ForceGraph
  // }));

  return (
    <>
      <UnivercitySidebar />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">سازمان ها</h1>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm">
        {/* Pass the majors data to the ForceGraph component */}
        <ForceGraph majors={suborganizations!} />
        <div className="flex flex-row-reverse justify-start gap-4 w-[75vw] ml-1">
          {userPermissionsName === "SuperAdmin" && <AddFieldDialog />}
        </div>
      </div>
    </>
  );
}
