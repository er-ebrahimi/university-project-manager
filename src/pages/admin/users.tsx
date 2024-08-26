import React from "react";

import AdminTable from "@/components/admin/TableAdmin";

export default function AdminUsers() {

  return (
    <>
      <div className="flex  items-center ">
        <h1 className="text-lg font-semibold md:text-2xl">کاربران   </h1>
      </div>
      <div
        className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <AdminTable/>
        
      </div>
    </>
  );
}
