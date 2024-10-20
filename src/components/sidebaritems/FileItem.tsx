import React from 'react'
import { File } from "@/functions/services/uploadFiles";
import moment from "moment-jalaali";
import { FiDownload } from "react-icons/fi";

const FileItem = ({ data }: { data: File }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = data.file; // Assuming data.file is the URL of the file
    link.setAttribute('download', data.name);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <button
        onClick={handleDownload}
        className="flex items-center text-white bg-green-500 px-3 py-1 rounded-lg"
      >
        <FiDownload className="ml-2 h-5 w-5" />
        دانلود
      </button>
    </div>
  );
};

export default FileItem;