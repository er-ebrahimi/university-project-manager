import React, { useContext, useEffect, useState } from "react";
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
import { Degree, degreeToPersian } from "@/types/userType";
import AddProject from "./AddProject";
import { UserContext } from "@/functions/Usercontext";

interface UnivercityCardProps {
  data: {
    id: string;
    name: string;
    nickname: string;
    mobile_phone_number: number;
    education_level: Degree;
    phone_number: number;
  };
}

interface FormData {
  name: string;
  nickname: string;
  mobile_phone_number: number;
  education_level: Degree;
  phone_number: number;
}

const UnivercityCard: React.FC<UnivercityCardProps> = ({ data }) => {
  // const [isEditing, setIsEditing] = useState(false);
  const isEditing = false;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for the professor details form
  const [formData, setFormData] = useState<FormData>({
    name: data.name,
    nickname: data.nickname || "",
    // major: data.major || "",
    education_level: data.education_level,
    mobile_phone_number: data.mobile_phone_number,
    phone_number: data.phone_number,
  });

  // State for the project form inside the modal
  const userData = useContext(UserContext);

  useEffect(() => {
    setFormData({
      name: data.name,
      nickname: data.nickname || "",
      education_level: data.education_level,
      mobile_phone_number: data.mobile_phone_number,
      phone_number: data.phone_number,

      // education_level: data.education_level\ || "",
      // mobile: data.BirthDate || "",
      // EmploymentDate: data.EmploymentDate || "",
    });
  }, [data]);

  if (!data) {
    return null;
  }

  const handleEditClick = () => {
    // setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
            <strong className="text-primary-dark">تحصیلات:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="education_level"
              value={formData.education_level}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-2">
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
          </div> */}
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">
              شماره موبایل:
            </strong>
            <input
              className="ml-2 p-1 border"
              type="number"
              name="mobile_phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{formData.name}</h2>
          <div className="mb-2">
            <strong className="text-primary-dark">نام مستعار:</strong>{" "}
            <span>{formData.nickname || "تعریف نشده"}</span>
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark">تحصیلات:</strong>{" "}
            <span>
              {degreeToPersian(formData.education_level) || "تعریف نشده"}
            </span>
          </div>
          <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">
              شماره موبایل:
            </strong>{" "}
            <span dir="ltr" className="text-right">
              {formData.phone_number || "تعریف نشده"}
            </span>
          </div>
          {/* <div className="mb-2">
            <strong className="text-primary-dark" dir="rtl">تاریخ استخدام:</strong> <span>{formData.EmploymentDate || "N/A"}</span>
          </div> */}
        </>
      )}
      <div className="flex flex-row flex-wrap justify-start gap-3">
        {/* {isEditing ? (
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
        )} */}

        {/* {!isEditing && (
          <button  className="mt-4 w-9 h-9 text-sm p-1 bg-white text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white">
            <MdDelete className="w-full h-full" />
          </button>
        )} */}

        {!isEditing &&
          (userData?.user?.is_superuser || userData?.user?.admin) && (
            <button
              onClick={handleOpenDialog} // Open the dialog when clicked
              className="mt-4 flex flex-row items-center gap-2 h-9 text-sm p-1 bg-white text-orange-500 border-2 border-orange-500 rounded hover:bg-orange-500 hover:text-white"
            >
              <FaPlus className="w-6 h-6" />
              <p className="w-full mt-1">افزودن پروژه</p>
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
        <AddProject
          ownerId={data.id}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      </Dialog>
    </div>
  );
};

export default UnivercityCard;
