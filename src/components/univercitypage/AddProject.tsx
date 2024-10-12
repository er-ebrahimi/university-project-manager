import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { postAddProject } from "@/functions/services/project";
import { useParams } from "react-router-dom";
import queryClient from "@/functions/QueryClient";

export interface AddProjectData {
  name: string;
  nickname: string;
  start_date: string;
  end_date: string;
  real_start_date: string;
  real_end_date: string;
  external_members: string;
  owner: string;
  subOrganization: string;
}

const AddProject = ({ ownerId ,open,setOpen}: { ownerId: string ,open:boolean,setOpen:Dispatch<SetStateAction<boolean>>}) => {
  const { id: organizationId } = useParams(); // Extract organizationId from URL
  const [addFormData, setAddFormData] = useState<AddProjectData>({
    name: "",
    nickname: "",
    start_date: "",
    end_date: "",
    real_start_date: "",
    real_end_date: "",
    external_members: "",
    owner: ownerId, // Pre-fill with provided ownerId
    subOrganization: organizationId!, // Assign subOrganization from URL
  });

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });
  };

  // Mutation for adding a new project
  const mutation = useMutation({
    mutationFn:(addFormData:AddProjectData)=>
        postAddProject(addFormData),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:[`suboorganization${organizationId}`]
      }); // Ensure organization data is refreshed
      console.log("Project added successfully");
      setOpen(false)
      // Optionally handle success (e.g., close dialog, show notification)
    },
    onError: (error: any) => {
      console.error("Error adding project:", error);
      // Optionally handle error (e.g., show error message)
    },
  });

  const handleSubmit = () => {
    mutation.mutate(addFormData); // Call the mutation with form data
  };

  return (
    <DialogContent className="p-8 bg-white rounded-lg shadow-lg h-[670px] w-[750px]">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-right text-2xl font-semibold text-primary-dark">
          افزودن پروژه جدید
        </DialogTitle>
      </DialogHeader>

      <div className="text-right">
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              نام پروژه:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="name"
              value={addFormData.name}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              نام مستعار:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="nickname"
              value={addFormData.nickname}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ شروع:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="date"
              name="start_date"
              value={addFormData.start_date}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ پایان:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="date"
              name="end_date"
              value={addFormData.end_date}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ واقعی شروع:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="date"
              name="real_start_date"
              value={addFormData.real_start_date}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ واقعی پایان:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="date"
              name="real_end_date"
              value={addFormData.real_end_date}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              اعضای خارجی:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="external_members"
              value={addFormData.external_members}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              صاحب پروژه:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="owner"
              value={addFormData.owner}
              onChange={handleAddFormChange}
              disabled // Disabling this field since it's provided via props
            />
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end mt-6">
        <button
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out"
          onClick={handleSubmit}
          disabled={mutation.isPending} // Disable button while loading
        >
          {mutation.isPending ? "در حال افزودن..." : "افزودن پروژه"}
        </button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProject;
