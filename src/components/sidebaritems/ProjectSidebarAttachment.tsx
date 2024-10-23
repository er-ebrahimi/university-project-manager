import React from "react";
import { FiUpload } from "react-icons/fi";
import FileItem from "./FileItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  File,
  getFilesByproj,
  postFile,
} from "@/functions/services/uploadFiles";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject } from "@/functions/services/project";
import toast from "react-hot-toast";
import routes from "@/global/routes";
import { ClipLoader } from "react-spinners";

const ProjectSidebarAttachment = ({canEdit}:{canEdit:boolean}) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { id } = useParams();
  // console.log("🚀 ~ id:", id)
  // const navigate = useNavigate();
  // Fetching files by project ID
  const {
    data: files,
    isPending,
    error,
  } = useQuery<File[]>({
    queryKey: ["files", id],
    queryFn: () => getFilesByproj(id),
  });

  // Mutation for uploading file
  const mutation = useMutation<File, Error, FormData>({
    mutationFn: (formData: FormData) => postFile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", id] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files?.[0];
      // const imageUrl = URL.createObjectURL(selectedFile);
      setFile({
        name: selectedFile.name,
        file: selectedFile,
        description: "",
        create_date: new Date(),
        project: id,
      });
    }
  };

  const handleSubmit = () => {
    if (!file || !name || !description) {
      alert("Please fill all fields and select a file");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file.file);
    formData.append("create_date", file.create_date.toISOString());
    formData.append("project", id ?? "");
    mutation.mutate(formData);
  };

  return (
    <div className="py-3 px-3 w-full h-fit">
      {/* File Upload Section */}
      <h1 className="font-bold mb-2 mr-2">فایل های ضمیمه</h1>
      {canEdit && <div className="flex flex-col justify-between mb-4 border-2 rounded-sm p-4">
        {/* Name Input */}
        <div className="mb-4 flex flex-row-reverse justify-between items-end">
          <div className="flex items-center">
            <label
              htmlFor="fileUpload"
              className="flex items-center cursor-pointer bg-purple-500 text-white px-3 py-2 rounded-lg"
            >
              <FiUpload className="ml-2 h-5 w-5" />
              آپلود فایل
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-64">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              نام:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام را وارد کنید"
              className="w-full p-2 border rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            توضیحات:
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات را وارد کنید"
            className="w-full p-2 border rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ارسال
        </button>
      </div>
}
      {/* File List Section */}
      <div className="space-y-3 border-primary-dark w-full border p-3 scrollbar-thin rounded-md overflow-auto h-[280px]">
        {isPending ? (
          <div className="flex justify-center items-center"> <ClipLoader/></div>
        ) : error ? (
          <p>Error fetching files</p>
        ) : (
          files?.map((file) => <FileItem data={file} />)
        )}
      </div>
    </div>
  );
};

export default ProjectSidebarAttachment;
