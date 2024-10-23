import queryClient from "@/functions/QueryClient";
import {
  // DataItem,
  deleteSubOrganization,
  updatesuborhanization,
} from "@/functions/services/organization";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import routes from "@/global/routes";
import { MdCancel, MdDelete } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getUsersSelect, userSelect } from "@/functions/services/users";
import AddProfessor from "./AddProfessor";
import { UserContext } from "@/functions/Usercontext";

interface SubOrganizationSidebarProps {
  data: any | undefined;
  id: string | undefined;
  loading: boolean;
}

const SubOrganizationSidebar: React.FC<SubOrganizationSidebarProps> = ({
  data,
  loading,
  id,
}) => {
  // Define state for managing field values and edit mode
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [universityData, setUniversityData] = useState<{
    name: string;
    phone_number: string;
    postal_code: string;
    nickname: string;
    address: string;
    owner: string | null; // Allow both string and null
    organization: string; // Also adjust organization field if needed
  }>({
    name: "نام دانشکده را وارد کنید",
    phone_number: "021-۷۷۴۹۱۰۲۵",
    postal_code: "۱۳۱۱۴-۱۶۸۴۶",
    nickname: "یونی",
    address: "تهران، نارمک، دانشگاه علم و صنعت ایران",
    owner: null, // or owner ID when fetched
    organization: "", // or organization ID when fetched
  });
  const [opennalert, setOpenalert] = useState(false);
  // Update university data based on props when data changes
  useEffect(() => {
    if (data) {
      setUniversityData((prevState) => ({
        ...prevState,
        name: data.name,
        nickname: data.nickname,
        address: data.address,
        owner: data.owner.id,
        postal_code: data.postal_code,
        phone_number: data.phone_number,
        organization: data.organization,
      }));
    }
  }, [data]);
  const UpdateMutation = useMutation({
    mutationFn: (updatedData: any) => updatesuborhanization(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`suboorganization${id}`],
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
  const userData = useContext(UserContext);

  const deleteMutation = useMutation({
    mutationFn: () => deleteSubOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`suboorganization${id}`],
      });
      toast.success("سازمان با موفقیت حذف شد");
      navigate(routes.dashboard);
    },
    onError: (error: any) => {
      // console.log(error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    },
  });
  const [users, setUsers] = useState<userSelect[]>();

  const { data: userlist, isPending: userLoading } = useQuery({
    queryKey: ["UserSelect"],
    queryFn: getUsersSelect,
    enabled: isEditing, // Only fetch when editing mode is enabled
    // onSuccess: (data:userSelect[]) => {
    //   setUsers(data);
    // },
  });
  useEffect(() => {
    if (userlist) {
      setUsers(userlist);
    }
  }, [userlist]);
  const handleDelete = () => {
    // if (id) {
    //   deleteMutation.mutate(); // Trigger delete mutation
    // }
    setOpenalert(true);
  };
  const handleDeleteconfirm = () => {
    if (id) {
      deleteMutation.mutate(); // Trigger delete mutation
    }
  };
  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUniversityData({ ...universityData, [field]: e.target.value });
  };

  return (
    <>
      {!loading && (
        <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
          <div className="flex-grow">
            {(userData?.user?.is_superuser || userData?.user?.admin) && (
              <div className="absolute left-0">
                {/* <button className="text-sm flex justify-center">
                <FaPlus className="w-5 h-5" />
                افزودن استاد
              </button> */}
                {!isEditing && (
                  <button
                    disabled={id === undefined}
                    className="bg-white hover:bg-red-500 hover:text-white border-2 border-red-500 text-red-500 rounded-sm py-1 px-1 ml-4 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <MdDelete className="h-6 w-6" />
                  </button>
                )}
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-primary-dark">
                نام دانشکده
              </h3>
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

            <div className="mb-4">
              <h3 className="text-sm font-bold text-primary-dark">
                شماره تلفن
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  value={universityData.phone_number}
                  onChange={(e) => handleInputChange(e, "phone_number")}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600 mt-1">
                  {universityData.phone_number
                    ? universityData.phone_number
                    : "شماره تلفن را وارد کنید"}
                </p>
              )}
            </div>

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
                <p className="text-gray-600 mt-1">
                  {universityData.postal_code
                    ? universityData.postal_code
                    : "کدپستی را وارد کنید"}
                </p>
              )}
            </div>

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
            <div className="hidden mb-4">
              <h3 className="text-sm font-bold text-primary-dark">نام خلاصه</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={universityData.organization}
                  // defaultValue={universityData.organization}
                  onChange={(e) => handleInputChange(e, "organization")}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600 mt-1">{universityData.nickname}</p>
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
              <h3 className="text-sm font-bold text-primary-dark">رئیس مرکز</h3>
              {isEditing ? (
                // <input
                //   type="number"
                //   value={universityData.owner}
                //   onChange={(e) => handleInputChange(e, "owner")}
                //   className="border p-1 rounded w-full"
                // />
                <Select
                  dir="rtl"
                  onValueChange={(value) =>
                    setUniversityData({ ...universityData, owner: value })
                  }
                  defaultValue={String(data.owner.id)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="انتخاب رئیس سازمان" />
                  </SelectTrigger>
                  <SelectContent>
                    {!userLoading &&
                      users?.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.username}
                        </SelectItem>
                      ))}
                    {userLoading && (
                      <div className="flex justify-center py-2">
                        <ClipLoader />
                      </div>
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-600 mt-1">{data.owner.username}</p>
              )}
            </div>
          </div>

          {(userData?.user?.is_superuser || userData?.user?.admin) && (
            <div className="flex justify-between mt-auto">
              {isEditing ? (
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded-sm"
                  onClick={() => {
                    UpdateMutation.mutate(universityData);
                  }}
                >
                  ذخیره
                </button>
              ) : (
                <button
                  className="bg-primary border-2 hover:border-primary text-white py-1 px-3 rounded-sm hover:bg-white hover:text-primary"
                  onClick={() => setIsEditing(true)}
                >
                  ویرایش
                </button>
              )}
              {isEditing && (
                <button
                  className="bg-red-500 px-2 text-white  rounded-sm"
                  onClick={() => {
                    // UpdateMutation.mutate(universityData);
                    setIsEditing(false);
                  }}
                >
                  <MdCancel />
                </button>
              )}
              <AddProfessor />
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="h-[530px] w-[230px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col items-center pt-32 ">
          <ClipLoader />
        </div>
      )}
      <AlertDialog open={opennalert} onOpenChange={setOpenalert}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle dir="rtl" className="text-right">
              برای حذف این مرکز اطمینان دارید
            </AlertDialogTitle>
            <AlertDialogDescription dir="rtl" className="text-right">
              در صورت اطمینان بر روی دکمه حذف کلیک کنید
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-start gap-2 items-end flex-row-reverse">
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-white hover:text-red-500 border-2 hover:border-2 border-red-500"
              onClick={handleDeleteconfirm}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubOrganizationSidebar;
