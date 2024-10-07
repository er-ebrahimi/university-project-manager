import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getOrganizationData,
  updateOrganizationData,
} from "@/functions/services/organization";
import toast from "react-hot-toast";
import queryClient from "@/functions/QueryClient";

interface UniversityData {
  name: string;
  phone_number: string;
  postal_code: string;
  nickname: string;
  address: string;
  owner: string; // Adjust this field based on API requirements
}

const UniversitySidebar: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [universityData, setUniversityData] = useState<UniversityData>({
    name: "",
    phone_number: "",
    postal_code: "",
    nickname: "",
    address: "",
    owner: "", // or owner_id: 0
  });

  // Fetch organization data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organizationData"],
    queryFn: getOrganizationData,
  });

  // Mutation for updating organization data
  const mutation = useMutation({
    mutationFn: (updatedData: UniversityData) =>
      updateOrganizationData(1, updatedData), // Hardcoded ID (1)
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey:["organizationData"]
        }
      )
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

  // Update the state when data is fetched
  useEffect(() => {
    if (data && !isLoading && !isError) {
      setUniversityData({
        name: data.name || "Unknown",
        phone_number: data.phone_number || "Unknown",
        postal_code: data.postal_code || "Unknown",
        nickname: data.nickname || "Unknown",
        address: data.address || "Unknown",
        owner: data.owner?.id || "1", // or owner_id: data.owner?.id || 0
      });
    }
  }, [data, isLoading, isError]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UniversityData
  ) => {
    setUniversityData({ ...universityData, [field]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    mutation.mutate(universityData);
  };

  if (isLoading) {
    return toast.loading("لطفا صبر کنید",{id:"1",duration:1000})

  }

  if (isError) {
    return toast.error("لطفا از اتصال اینترنت خود اطمینان حاصل کنید");
  }

  return (
    <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
      <div className="flex-grow">
        {/* University Name */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-primary-dark">نام سازمان</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{universityData.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-primary-dark">شماره تلفن</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.phone_number}
              onChange={(e) => handleInputChange(e, "phone_number")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{universityData.phone_number}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-primary-dark">کد پستی</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.postal_code}
              onChange={(e) => handleInputChange(e, "postal_code")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{universityData.postal_code}</p>
          )}
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-primary-dark">نام خلاصه</h3>
          {isEditing ? (
            <input
              type="text"
              value={universityData.nickname}
              onChange={(e) => handleInputChange(e, "nickname")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{universityData.nickname}</p>
          )}
        </div>

        {/* Address */}
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
            <p className="text-gray-600 mt-1">{universityData.address}</p>
          )}
        </div>

        {/* Owner */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-primary-dark">رئیس سازمان</h3>
          {isEditing ? (
            <input
              type="number"
              value={universityData.owner}
              onChange={(e) => handleInputChange(e, "owner")}
              className="border p-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-600 mt-1">{data.owner?.username}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-auto">
        {isEditing ? (
          <button
            className="bg-green-500 text-white py-1 px-3 rounded"
            onClick={handleSubmit}
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
    </div>
  );
};

export default UniversitySidebar;
