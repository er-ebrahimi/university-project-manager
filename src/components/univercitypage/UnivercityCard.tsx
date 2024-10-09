import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { TiTick, TiCancel } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UnivercityCardProps {
  data: {
    name: string;
    nickname?: string;
    major?: string;
    BirthDate?: string;
    EmploymentDate?: string;
  };
}

interface FormData {
  name: string;
  nickname: string;
  major: string;
  BirthDate: string;
  EmploymentDate: string;
}

interface AddFormData {
  name: string;
  nickname: string;
  start_date: string;
  end_date: string;
  real_start_date: string;
  real_end_date: string;
  external_members: string;
  owner: string;
  budget: string;
}

const UnivercityCard: React.FC<UnivercityCardProps> = ({ data }) => {
  console.log("🚀 ~ data:", data)
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for the professor details form
  const [formData, setFormData] = useState<FormData>({
    name: data.name,
    nickname: data.nickname || "",
    major: data.major || "",
    BirthDate: data.BirthDate || "",
    EmploymentDate: data.EmploymentDate || "",
  });

  // State for the project form inside the modal
  const [addFormData, setAddFormData] = useState<AddFormData>({
    name: "",
    nickname: "",
    start_date: "",
    end_date: "",
    real_start_date: "",
    real_end_date: "",
    external_members: "",
    owner: "",
    budget: "",
  });

  useEffect(() => {
    setFormData({
      name: data.name,
      nickname: data.nickname || "",
      major: data.major || "",
      BirthDate: data.BirthDate || "",
      EmploymentDate: data.EmploymentDate || "",
    });
  }, [data]);

  if (!data) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true); // Open the dialog when clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-11/12 mt-14 mx-auto">
      {isEditing ? (
        <>
          <input
            className="mb-2 p-1 border"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="mb-2">
            <strong className="text-primary-dark">نام مستعار:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark">رشته تحصیلی:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">
              تاریخ تولد:
            </strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="BirthDate"
              value={formData.BirthDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">
              تاریخ استخدام:
            </strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="EmploymentDate"
              value={formData.EmploymentDate}
              onChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{formData.name}</h2>
          <div className="mb-2">
            <strong className="text-primary-dark">نام مستعار:</strong> <span>{formData.nickname || "N/A"}</span>
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark">رشته تحصیلی:</strong> <span>{formData.major || "N/A"}</span>
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">تاریخ تولد:</strong> <span>{formData.BirthDate || "N/A"}</span>
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">تاریخ استخدام:</strong> <span>{formData.EmploymentDate || "N/A"}</span>
          </div>
        </>
      )}
      <div className="flex flex-row flex-wrap justify-start gap-3">
        {isEditing ? (
          <button
            onClick={handleEditClick}
            className="mt-4 w-9 h-9 bg-white text-sm p-1 text-green-500 border-2 border-green-500 rounded hover:bg-green-500 hover:text-white"
          >
            <TiTick className="w-full h-full" />
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="mt-4 w-9 h-9 bg-white text-sm p-1 text-primary border-2 border-primary rounded hover:bg-primary hover:text-white"
          >
            <MdModeEdit className="w-full h-full" />
          </button>
        )}

        {!isEditing && (
          <button className="mt-4 w-9 h-9 text-sm p-1 bg-white text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white">
            <MdDelete className="w-full h-full" />
          </button>
        )}

        {!isEditing && (
          <button
            onClick={handleOpenDialog} // Open the dialog when clicked
            className="mt-4 w-9 h-9 text-sm p-1 bg-white text-orange-500 border-2 border-orange-500 rounded hover:bg-orange-500 hover:text-white"
          >
            <FaPlus className="w-full h-full" />
          </button>
        )}

        {isEditing && (
          <button
            onClick={handleEditClick}
            className="mt-4 w-9 h-9 text-sm p-1 bg-white text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
          >
            <TiCancel className="w-full h-full" />
          </button>
        )}
      </div>

      {/* Dialog for adding new project */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
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
          />
        </div>
        {/* <div className="mb-4 col-span-2">
          <label className="block text-lg font-medium text-primary-dark mb-2">
            بودجه:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            name="budget"
            value={addFormData.budget}
            onChange={handleAddFormChange}
          />
        </div> */}
      </div>
    </div>

    <DialogFooter className="flex justify-end mt-6">
      <button
        onClick={handleCloseDialog}
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out"
      >
        افزودن پروژه
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default UnivercityCard;
