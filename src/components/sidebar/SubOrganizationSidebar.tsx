import queryClient from "@/functions/QueryClient";
import {
  DataItem,
  updatesuborhanization,
} from "@/functions/services/organization";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface SubOrganizationSidebarProps {
  data: any | undefined;
  loading: boolean;
}

const SubOrganizationSidebar: React.FC<SubOrganizationSidebarProps> = ({
  data,
  loading,
}) => {
  // Define state for managing field values and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [universityData, setUniversityData] = useState({
    universityName: "نام دانشکده را وارد کنید",
    phoneNumber: "021-۷۷۴۹۱۰۲۵",
    postalCode: "۱۳۱۱۴-۱۶۸۴۶",
    Nickname: "یونی",
    address: "تهران، نارمک، دانشگاه علم و صنعت ایران",
    owner: "دکتر داود یونسیان",
  });

  // Update university data based on props when data changes
  useEffect(() => {
    if (data) {
      setUniversityData((prevState) => ({
        ...prevState,
        universityName: data.name || "نام دانشکده را وارد کنید",
        Nickname: data.Nickname || "یونی",
        address: data.address,
        owner: data.owner.username,
        postalCode: data.postalcode || "کد پستی را وارد کنید",
        phoneNumber: data.phonenumber || "شماره تلفن را وارد کنید",
      }));
    }
  }, [data]);
  const mutation = useMutation({
    mutationFn: (updatedData: DataItem) =>
      updatesuborhanization(1, updatedData), // Hardcoded ID (1)
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizationData"],
      });
      setIsEditing(false);
      // alert("Organization updated successfully!");
      toast.success("با موفقیت ویرایش شد");
      // setUniversityData(data)
    },
    onError: (error: any) => {
      console.error(
        "Failed to update organization",
        error.response?.data || error
      );
      toast.error("ویرایش با خطا مواجه شد");
    },
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUniversityData({ ...universityData, [field]: e.target.value });
  };

  return (
    <>
      {!loading && <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
        <div className="flex-grow">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">نام دانشکده</h3>
            {isEditing ? (
              <input
                type="text"
                value={universityData.universityName}
                onChange={(e) => handleInputChange(e, "universityName")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">
                {universityData.universityName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">شماره تلفن</h3>
            {isEditing ? (
              <input
                type="text"
                value={universityData.phoneNumber}
                onChange={(e) => handleInputChange(e, "phoneNumber")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">{universityData.phoneNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">کد پستی</h3>
            {isEditing ? (
              <input
                type="text"
                value={universityData.postalCode}
                onChange={(e) => handleInputChange(e, "postalCode")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">{universityData.postalCode}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">نام خلاصه</h3>
            {isEditing ? (
              <input
                type="text"
                value={universityData.Nickname}
                onChange={(e) => handleInputChange(e, "Nickname")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">{universityData.Nickname}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">آدرس</h3>
            {isEditing ? (
              <input
                type="text"
                value={universityData.address}
                onChange={(e) => handleInputChange(e, "address")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1 text-sm">
                {universityData.address}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-primary-dark">
              رئیس دانشگاه
            </h3>
            {isEditing ? (
              <input
                type="number"
                value={data.owner.id}
                onChange={(e) => handleInputChange(e, "owner")}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">{universityData.owner}</p>
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
          <button
            disabled
            className="bg-red-500 text-white py-1 px-3 rounded disabled:opacity-50 cursor-not-allowed"
          >
            حذف
          </button>
        </div>
      </div>}
      {
        loading && <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col items-center pt-32 ">
        <ClipLoader />
      </div>
      }
      
    </>
  );
};

export default SubOrganizationSidebar;
