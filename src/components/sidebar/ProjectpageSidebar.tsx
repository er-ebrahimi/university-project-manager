import React, { useState } from "react";

const ProjectpageSidebar: React.FC = () => {
  // Define state for managing field values and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [universityData, setUniversityData] = useState({
    universityName: "دانشگاه علم و صنعت ایران",
    phoneNumber: "021-۷۷۴۹۱۰۲۵",
    postalCode: "۱۳۱۱۴-۱۶۸۴۶",
    Nickname: "علم و صنعت",
    address: "تهران، نارمک، دانشگاه علم و صنعت ایران ، معاونت دانشجوئی",
    owner: "دکتر داود یونسیان",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUniversityData({ ...universityData, [field]: e.target.value });
  };

  return (
    <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
      <div className="flex-grow">
        <div className="mb-4">
          <h3 className="text-sm font-bold">نام دانشگاه</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.universityName}
              onChange={(e) => handleInputChange(e, "universityName")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1">{universityData.universityName}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold">شماره تلفن</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.phoneNumber}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1">{universityData.phoneNumber}</p> 
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold">کد پستی</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.postalCode}
              onChange={(e) => handleInputChange(e, "postalCode")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1">{universityData.postalCode}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold">نام خلاصه</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.Nickname}
              onChange={(e) => handleInputChange(e, "Nickname")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1">{universityData.Nickname}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold">آدرس</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.address}
              onChange={(e) => handleInputChange(e, "address")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1 text-sm">{universityData.address}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold">رئیس دانشگاه</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.owner}
              onChange={(e) => handleInputChange(e, "owner")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600  mt-1">{universityData.owner}</p>
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
