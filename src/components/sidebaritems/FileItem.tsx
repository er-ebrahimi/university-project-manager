import React from 'react'
import { FiDownload } from 'react-icons/fi'

const FileItem = () => {
  return (
    <div className="flex justify-between items-center  p-3 rounded-md shadow">
    {/* File Info */}
    <div className="flex items-center">
      <p className="text-gray-700 ml-3 font-semibold">نام فایل</p>
      <span className="text-gray-500 text-sm">۱۴۰۲/۰۶/۲۵</span>
    </div>

    {/* Download Button */}
    <button className="flex items-center text-white bg-green-500 px-3 py-1 rounded-lg">
      <FiDownload className="ml-2 h-5 w-5" />
      دانلود
    </button>
  </div>
  )
}

export default FileItem