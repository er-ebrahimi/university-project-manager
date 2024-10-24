import React, { useState } from "react";
import { File } from "@/functions/services/uploadFiles";
import moment from "moment-jalaali";
import { FiDownload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteProjectFile } from "@/functions/services/project";
import queryClient from "@/functions/QueryClient";
import toast from "react-hot-toast";
import { Router, useNavigate, useParams } from "react-router-dom";
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const FileItem = ({ data }: { data: File }) => {
  const { id } = useParams();
  const handleDownload = () => {
    const fileUrl = data.file; // Replace this with your image link
    const fileName = data.name; // Desired file name
    // console.log("🚀 ~ handleDownload ~ id:", id);
    // Create an anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const deleteMutation = useMutation({
    mutationFn: () => deleteProjectFile(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", id] });
      toast.success("فایل با موفقیت حذف شد");
    },
    onError: (error: any) => {
      // console.log(error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    },
  });
  const [opennalert, setOpenalert] = useState(false);

  return (
    <div className="flex justify-between items-center  p-3 rounded-md shadow">
      {/* File Info */}
      <div className="flex items-center">
        <p className="text-gray-700 ml-3 font-semibold">{data.name}</p>
        <span className="text-gray-500 text-sm">
          {moment(data.create_date).format("jYYYY/jMM/jDD")}
        </span>
      </div>

      {/* Download Button */}
      <div className="flex flex-row gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center text-white bg-green-500 gap-2 px-3 py-1 rounded-lg"
        >
          <FiDownload className=" h-5 w-5" />
          دانلود
        </button>
        <button
          onClick={() => {
            console.log("delete");
            setOpenalert(true);
          }}
          className="flex items-center text-white bg-red-500 p-2 rounded-lg"
        >
          <MdDelete className=" h-5 w-5" />
          {/* دانلود */}
        </button>
      </div>
      <AlertDialog open={opennalert} onOpenChange={setOpenalert}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle dir="rtl" className="text-right">
              برای حذف این فایل اطمینان دارید
            </AlertDialogTitle>
            <AlertDialogDescription dir="rtl" className="text-right">
              در صورت اطمینان بر روی دکمه حذف کلیک کنید
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-start gap-2 items-end flex-row-reverse">
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-white hover:text-red-500 border-2 hover:border-2 border-red-500"
              onClick={() => {
                deleteMutation.mutate();
                setOpenalert(false);
              }}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FileItem;
