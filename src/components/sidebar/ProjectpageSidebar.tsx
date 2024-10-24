import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoDocumentAttach } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectSidebarAttachment from "../sidebaritems/ProjectSidebarAttachment";
import {
  Project,
  deleteProject,
  putproject,
} from "@/functions/services/project";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsersSelect, userSelect } from "@/functions/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import queryClient from "@/functions/QueryClient";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import routes from "@/global/routes";
import { UserContext } from "@/functions/Usercontext";

type ProjectpageSidebarProps = {
  data: Project | undefined;
  sideBarLoading?: boolean;
};

export interface AddProjectData {
  name: string;
  nickname: string;
  start_date: string;
  end_date: string;
  real_start_date: string;
  real_end_date: string;
  external_members: string;
  owner: number;
  subOrganization: number;
}

const ProjectpageSidebar = ({
  data,
  sideBarLoading,
}: ProjectpageSidebarProps) => {
  const { id } = useParams();
  // Define state for managing field values and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState<AddProjectData>(
    data
      ? {
          name: data.name,
          nickname: data.nickname,
          start_date: data.start_date,
          end_date: data.end_date,
          real_start_date: data.real_start_date,
          real_end_date: data.real_end_date,
          external_members: data.external_members,
          owner: data.owner.id,
          subOrganization: data.subOrganization.id,
        }
      : {
          name: "",
          nickname: "",
          start_date: "",
          end_date: "",
          real_start_date: "",
          real_end_date: "",
          external_members: "",
          owner: 0, // or any default number value
          subOrganization: 0,
        }
  );

  useEffect(() => {
    setProjectData(
      data
        ? {
            name: data.name,
            nickname: data.nickname,
            start_date: data.start_date,
            end_date: data.end_date,
            real_start_date: data.real_start_date,
            real_end_date: data.real_end_date,
            external_members: data.external_members,
            owner: data.owner.id,
            subOrganization: data.subOrganization.id,
          }
        : {
            name: "",
            nickname: "",
            start_date: "",
            end_date: "",
            real_start_date: "",
            real_end_date: "",
            external_members: "",
            owner: 0,
            subOrganization: 0, // or any default number value
          }
    );
  }, [data]);
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suborganizations"],
      });
      toast.success("پروژه با موفقیت حذف شد");
      navigate(routes.dashboard);
    },
    onError: (error: any) => {
      // console.log(error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    },
  });
  // Updated handleDateChange function
  const handleDateChange = (name: keyof AddProjectData, date: any) => {
    if (date && date.isValid) {
      // Convert Jalali date to Gregorian and then format to ISO string
      const gregorianDate = date.toDate(); // convert to regular JavaScript date
      setProjectData({
        ...projectData,
        [name]: gregorianDate.toISOString().split("T")[0], // Only keep YYYY-MM-DD
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: "",
      });
    }
  };
  const [canEdit, setCanEdit] = useState(false);
  const user = useContext(UserContext);
  useEffect(() => {
    if (user && user.user?.projects && user.user?.crud_project) {
      user.user?.projects.map((obj) => {
        if (obj.id === Number(id)) {
          setCanEdit(true);
        }
      });
    }
    if (data?.owner.id && user?.user?.id) {
      if (data?.owner.id === user?.user?.id) {
        setCanEdit(true);
      }
    }

    // setCanEdit(true)
  }, [user]);
  // Handle input changes

  const handleInputChange = (field: keyof AddProjectData, value: any) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const [users, setUsers] = useState<userSelect[]>();

  const { data: userlist, isFetching: userLoading } = useQuery({
    queryKey: ["UserSelect"],
    queryFn: getUsersSelect,
    enabled: isEditing, // Only fetch when editing mode is enabled
  });

  const UpdateMutation = useMutation({
    mutationFn: (updatedData: any) => putproject(updatedData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Project${id}`],
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
      toast.error(error.response?.data?.detail);
    },
  });

  useEffect(() => {
    if (userlist) {
      setUsers(userlist);
    }
  }, [userlist]);

  if (sideBarLoading) {
    return <ClipLoader />;
  }

  return (
    <>
      {sideBarLoading && (
        <div className="h-[550px] w-[250px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col">
          <ClipLoader />
        </div>
      )}
      {!sideBarLoading && (
        <div className="h-[550px] w-[250px] rounded-sm border border-dashed absolute right-0 bg-white mt-14 mr-6 p-4 flex flex-col ">
          <div className="flex-grow">
            <Dialog>
              <DialogTrigger>
                <IoDocumentAttach className="absolute left-0 top-0 ml-4 mt-4 w-8 h-8 rounded cursor-pointer text-primary-dark border p-1 border-primary" />
              </DialogTrigger>
              <DialogContent className="my-4 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
                {/* <DialogHeader dir="rtl" className="text-right! mb-0">فایل های ضمیمه</DialogHeader> */}
                <ProjectSidebarAttachment canEdit={canEdit} />
              </DialogContent>
            </Dialog>
            <div className="mb-2">
              <h3 className="text-sm font-bold text-primary-dark">نام</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600 mt-1">
                  {projectData.name
                    ? projectData.name
                    : "نام پروژه وارد نشده است"}
                </p>
              )}
            </div>

            <div className="mb-2">
              <h3 className="text-sm font-bold text-primary-dark">
                نام مستعار
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  value={projectData.nickname}
                  onChange={(e) =>
                    handleInputChange("nickname", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600 mt-1">{projectData.nickname}</p>
              )}
            </div>

            <div className="mb-4 flex justify-between gap-2">
              <div className="w-1/2">
                <h3 className="text-sm font-bold text-primary-dark">
                  تاریخ شروع
                </h3>
                {isEditing ? (
                  <DatePicker
                    value={
                      projectData.start_date
                        ? new Date(projectData.start_date)
                        : null
                    }
                    onChange={(date) => handleDateChange("start_date", date)}
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">
                    {projectData.start_date
                      ? new Date(projectData.start_date).toLocaleDateString(
                          "fa-IR"
                        )
                      : ""}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <h3 className="text-sm font-bold text-primary-dark text-center">
                  تاریخ پایان
                </h3>
                {isEditing ? (
                  <DatePicker
                    value={
                      projectData.end_date
                        ? new Date(projectData.end_date)
                        : null
                    }
                    onChange={(date) => handleDateChange("end_date", date)}
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-600 mt-1 text-center">
                    {projectData.end_date
                      ? new Date(projectData.end_date).toLocaleDateString(
                          "fa-IR"
                        )
                      : ""}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 flex justify-between gap-2">
              <div className="w-1/2">
                <h3 className="text-sm font-bold text-primary-dark">
                  تاریخ واقعی شروع
                </h3>
                {isEditing ? (
                  <DatePicker
                    value={
                      projectData.real_start_date
                        ? new Date(projectData.real_start_date)
                        : null
                    }
                    onChange={(date) =>
                      handleDateChange("real_start_date", date)
                    }
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">
                    {projectData.real_start_date
                      ? new Date(
                          projectData.real_start_date
                        ).toLocaleDateString("fa-IR")
                      : ""}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <h3 className="text-sm font-bold text-primary-dark text-center">
                  تاریخ واقعی پایان
                </h3>
                {isEditing ? (
                  <DatePicker
                    value={
                      projectData.real_end_date
                        ? new Date(projectData.real_end_date)
                        : null
                    }
                    onChange={(date) => handleDateChange("real_end_date", date)}
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-600 mt-1 text-center">
                    {projectData.real_end_date
                      ? new Date(projectData.real_end_date).toLocaleDateString(
                          "fa-IR"
                        )
                      : ""}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-sm font-bold text-primary-dark">
                اعضای پروژه
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  value={projectData.external_members}
                  onChange={(e) =>
                    handleInputChange("external_members", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600 mt-1">
                  {projectData.external_members
                    ? projectData.external_members
                    : " ..."}
                </p>
              )}
            </div>

            <div className="mb-2">
              <h3 className="text-sm font-bold text-primary-dark">
                رئیس پروژه
              </h3>
              {isEditing ? (
                <Select
                  dir="rtl"
                  onValueChange={(value) =>
                    setProjectData({ ...projectData, owner: Number(value) })
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
                          {item.nickname}
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
                <p className="text-gray-600 mt-1">{data?.owner?.nickname}</p>
              )}
            </div>
          </div>

          {(user?.user?.is_superuser || user?.user?.admin || canEdit) && (
            <div className="flex justify-between mt-auto">
              {isEditing ? (
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded"
                  onClick={() => {
                    setIsEditing(false);
                    console.log("Updated Project Data:", projectData);
                    // Add your save logic here
                    UpdateMutation.mutate(projectData);
                  }}
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
                className="bg-red-500 text-white py-1 px-3 rounded disabled:opacity-50"
                onClick={() => {
                  deleteMutation.mutate();
                }}
              >
                حذف
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectpageSidebar;
