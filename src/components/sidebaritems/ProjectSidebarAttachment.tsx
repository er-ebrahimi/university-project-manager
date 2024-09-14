// FileUploadDisplay.tsx
import React from 'react';
import { FiUpload } from 'react-icons/fi';
import FileItem from './FileItem';

const ProjectSidebarAttachment: React.FC = () => {
  return (
    <div className="py-6 px-3 w-full h-fit">
      {/* File Upload Section */}
      <div className="flex  justify-between mb-4">
        <h1 className='font-bold mr-2'>فایل های ضمیمه</h1>
        <label htmlFor="fileUpload" className="flex items-center cursor-pointer bg-purple-500 text-white px-3 py-2 rounded-lg">
          <FiUpload className="ml-2 h-5 w-5" />
          آپلود فایل
        </label>
        <input id="fileUpload" type="file" className="hidden" />
      </div>

      {/* File List Section */}
      <div className="space-y-3 border-primary-dark w-full border p-3 scrollbar-thin rounded-md overflow-auto h-[430px] scroll-">
        {/* File Item */}
        
        
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>
        <FileItem/>

        {/* You can repeat this block for multiple files */}
      </div>
    </div>
  );
};

export default ProjectSidebarAttachment;
