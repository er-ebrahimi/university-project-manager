import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ProjectpageSidebar: React.FC = () => {
  // Define state for managing field values and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "پروژه 1",
    nickname: "پروژه 1",
    startDate: new Date(),
    endDate: new Date(),
    realStartDate: new Date(),
    realEndDate: new Date(),
    externalMembers: "عضو 1, عضو 2",
    owner: "دکتر داود یونسیان",
    budget: "100,000 USD",
  });

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setProjectData({ ...projectData, [field]: value });
  };

  return (
    <div className="h-[550px] w-[250px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
      <div className="flex-grow">
        <div className="mb-2">
          <h3 className="text-sm font-bold  text-primary-dark">نام</h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{projectData.name}</p>
          )}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-bold text-primary-dark">نام مستعار</h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{projectData.nickname}</p>
          )}
        </div>

        <div className="mb-4 flex justify-between gap-2">
          <div className="w-1/2">
            <h3 className="text-sm font-bold text-primary-dark">تاریخ شروع</h3>
            {isEditing ? (
              <DatePicker
                value={projectData.startDate}
                onChange={(date) => handleInputChange("startDate", date)}
                calendar={persian}
                locale={persian_fa}
                inputClass="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">1403/06/23</p>
            )}
          </div>

          <div className="w-1/2">
            <h3 className="text-sm font-bold text-primary-dark text-center">تاریخ پایان</h3>
            {isEditing ? (
              <DatePicker
                value={projectData.endDate}
                onChange={(date) => handleInputChange("endDate", date)}
                calendar={persian}
                locale={persian_fa}
                inputClass="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1 text-center">1403/06/23</p>
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-between gap-2">
          <div className="w-1/2">
            <h3 className="text-sm font-bold text-primary-dark ">تاریخ واقعی شروع</h3>
            {isEditing ? (
              <DatePicker
                value={projectData.realStartDate}
                onChange={(date) => handleInputChange("realStartDate", date)}
                calendar={persian}
                locale={persian_fa}
                inputClass="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">1403/06/23</p>
            )}
          </div>

          <div className="w-1/2">
            <h3 className="text-sm font-bold text-primary-dark text-center">تاریخ واقعی پایان</h3>
            {isEditing ? (
              <DatePicker
                value={projectData.realEndDate}
                onChange={(date) => handleInputChange("realEndDate", date)}
                calendar={persian}
                locale={persian_fa}
                inputClass="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1 text-center">1403/06/23</p>
            )}
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-bold text-primary-dark">اعضای خارجی</h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.externalMembers}
              onChange={(e) => handleInputChange("externalMembers", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{projectData.externalMembers}</p>
          )}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-bold text-primary-dark">صاحب پروژه</h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.owner}
              onChange={(e) => handleInputChange("owner", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{projectData.owner}</p>
          )}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-bold text-primary-dark">بودجه</h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{projectData.budget}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-auto">
        {isEditing ? (
          <button
            className="bg-green-500 text-white py-1 px-3 rounded"
            onClick={() => setIsEditing(false)}
          >
            ذخیره
          </button>
        ) : (
          <button
            className="bg-purple-500 text-white py-1 px-3 rounded"
            onClick={() => setIsEditing(true)}
          >
            ویرایش
          </button>
        )}
        <button disabled className="bg-red-500 text-white py-1 px-3 rounded disabled:opacity-50 cursor-not-allowed">
          حذف
        </button>
      </div>
    </div>
  );
};

export default ProjectpageSidebar;
