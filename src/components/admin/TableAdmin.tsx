import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/reset.css";
import "./TableAdmin.css";
import { FaUserPlus } from "react-icons/fa";
import Select from "react-select";

// ShadCN UI Imports
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import AddUser from "./AddUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUser, deleteUser } from "@/functions/services/users";
import toast from "react-hot-toast";
import { User } from "@/types/userType";
import { degreeToPersian, Degree } from "@/types/userType";
import { Checkbox } from "../ui/checkbox";
import { getselectsuborganization } from "@/functions/services/organization";
import { getprojectList } from "@/functions/services/project";

const AdminTableWithModal: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["UserData"],
    queryFn: getUsers,
  });

  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [crudProject, setCrudProject] = useState<boolean>(false);
  const [userSuborganizations, setUserSuborganizations] = useState<
    number | null
  >(null);

  // Handle editing a user
  const handleEdit = (record: User) => {
    setCurrentUser(record);
    setIsEditModalVisible(true);
  };
  useEffect(() => {
    if (currentUser?.crud_project) {
      setCrudProject(currentUser?.crud_project);
    }
  }, [currentUser]);

  const { data: select, isPending } = useQuery({
    queryKey: ["selectListsubOrganization"],
    queryFn: getselectsuborganization,
  });
  // console.log("🚀 ~ select:", select)

  const { data: ProjectList, isPending: pPending } = useQuery({
    queryKey: ["projectList"],
    queryFn: getprojectList,
  });
  // console.log(first)
  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) => updateUser(updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserData"] });
      toast.success("کاربر با موفقیت به‌روز شد");
      setIsEditModalVisible(false);
    },
    onError: () => {
      toast.error("خطا در به‌روزرسانی کاربر");
    },
  });

  const onEditFinish = (values: any) => {
    const updatedUser = {
      ...currentUser,
      ...values,
      education_level: currentUser?.education_level,
      subOrganizations: userSuborganizations,
      projects: userProjects,
      crud_project: crudProject,
      admin: isAdmin,
    };
    updateUserMutation.mutate(updatedUser as User);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserData"] });
      toast.success("کاربر با موفقیت حذف شد");
    },
    onError: () => {
      toast.error("خطا در حذف کاربر");
    },
  });

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  // Search functionality
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data?.filter((item) =>
      Object.values(item).some(
        (field) =>
          field && field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered!);
  };
  const columns: ColumnsType<User> = [
    {
      title: "نام کاربری",
      dataIndex: "username",
      key: "username",
      className: "text-right",
    },
    {
      title: "نام",
      dataIndex: "first_name",
      key: "first_name",
      className: "text-right",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "last_name",
      key: "last_name",
      className: "text-right",
    },
    {
      title: "نام مستعار",
      dataIndex: "nickname",
      key: "nickname",
      className: "text-right",
    },
    {
      title: "کد ملی",
      dataIndex: "social_id_number",
      key: "social_id_number",
      className: "text-right",
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "personal_id_number",
      key: "personal_id_number",
      className: "text-right",
    },
    {
      title: "سطح تحصیلات",
      dataIndex: "education_level",
      key: "education_level",
      className: "text-right",
      render: (inp: Degree) => degreeToPersian(inp),
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone_number",
      key: "phone_number",
      className: "text-right",
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile_phone_number",
      key: "mobile_phone_number",
      render: (inp: string) => {
        return (
          <div dir="ltr" className="text-left">
            {inp}
          </div>
        );
      },
    },
    {
      title: "عملیات",
      key: "operation",
      render: (_, record) => (
        <div className="flex flex-row-reverse space-x-2">
          <Button
            className="bg-red-500 text-white w-10 h-10 p-0 px-2"
            onClick={() => handleDelete(record.id)}
          >
            <MdDeleteOutline className="text-center  w-full h-full" />
          </Button>
          <Button
            className="bg-yellow-500 text-white p-2 w-10 h-10"
            onClick={() => handleEdit(record)}
          >
            <MdModeEdit className="text-center  w-full h-full" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return toast.loading("در حال بارگذاری...", { id: "1", duration: 1000 });
  }

  if (isError) {
    return toast.error("لطفا از اتصال اینترنت خود اطمینان حاصل کنید");
  }
  return (
    <div className="p-6 pt-1 bg-white rounded-lg w-[75vw] h-[80vh]">
      {/* Add User Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-4 ">
          <h1 className="text-lg font-semibold">مدیریت کاربران</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-500 text-white">
                افزودن کاربر جدید
                <FaUserPlus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className=" h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
              <DialogHeader>
                <DialogTitle className="text-right">
                  افزودن کاربر جدید
                </DialogTitle>
              </DialogHeader>
              <AddUser setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 ">
          <Input
            placeholder="جستجوی کاربران"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-52"
          />
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        loading={isLoading}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          position: ["bottomLeft"],
          style: {
            direction: "ltr",
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            margin: "2 auto",
          },
        }}
        columns={columns}
        dataSource={filteredData}
        className="rtl-table"
      />

      {/* Edit User Modal */}
      {currentUser && (
        <Dialog open={isEditModalVisible} onOpenChange={setIsEditModalVisible}>
          <DialogContent className="my-4 h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
            <DialogHeader>
              <DialogTitle className="text-right">ویرایش کاربر</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const values = Object.fromEntries(formData.entries());
                onEditFinish(values);
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-1"
            >
              <div>
                <Label className=" mr-2" htmlFor="username">
                  نام کاربری
                </Label>
                <Input
                  className="mt-2 w-full"
                  name="username"
                  id="username"
                  required
                  defaultValue={currentUser.username}
                />
              </div>
              <div>
                <Label className=" mr-2" htmlFor="username">
                  رمز عبور جدید
                </Label>
                <Input
                  className="mt-2 w-full"
                  name="password"
                  id="password"
                  type="password"
                  defaultValue={undefined}
                />
              </div>
              <div>
                <Label className=" mr-2" htmlFor="first_name">
                  نام
                </Label>
                <Input
                  className="mt-2 w-full"
                  name="first_name"
                  id="first_name"
                  required
                  defaultValue={currentUser.first_name}
                />
              </div>
              <div>
                <Label className=" mr-2" htmlFor="last_name">
                  نام خانوادگی
                </Label>
                <Input
                  className="mt-2 w-full"
                  name="last_name"
                  id="last_name"
                  required
                  defaultValue={currentUser.last_name}
                />
              </div>
              <div>
                <Label className=" mr-2" htmlFor="nickname">
                  نام مستعار
                </Label>
                <Input
                  className="mt-2 w-full"
                  name="nickname"
                  id="nickname"
                  required
                  defaultValue={currentUser.nickname}
                />
              </div>
              <div>
                <Label className=" mr-2" htmlFor="id_number">
                  کد ملی
                </Label>
                <Input
                  name="id_number"
                  id="id_number"
                  maxLength={10}
                  required
                  defaultValue={currentUser.social_id_number}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="personal_number">
                  شماره پرسنلی
                </Label>
                <Input
                  name="personal_id_number"
                  id="personal_id_number"
                  required
                  defaultValue={currentUser.personal_id_number}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="education_level">
                  سطح تحصیلات
                </Label>
                <Select
                  options={[
                    { value: "BSc", label: "کارشناسی" },
                    { value: "Ms", label: "کارشناسی ارشد" },
                    { value: "PhD", label: "دکترا" },
                    { value: "Prof", label: "پروفسور" },
                  ]}
                  menuPlacement="top"
                  defaultValue={{
                    value: currentUser.education_level,
                    label: degreeToPersian(currentUser.education_level),
                  }}
                  placeholder="سطح تحصیلات"
                  onChange={(option) =>
                    setCurrentUser((prev) => ({
                      ...prev!,
                      education_level: option?.value,
                    }))
                  }
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="phone_number">
                  شماره تلفن
                </Label>
                <Input
                  dir="ltr"
                  name="phone_number"
                  id="phone_number"
                  required
                  defaultValue={currentUser.phone_number}
                  className="mt-2 w-full text-right"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="mobile_number">
                  شماره موبایل
                </Label>
                <Input
                  dir="ltr"
                  name="mobile_phone_number"
                  id="mobile_phone_number"
                  required
                  prefix="+98"
                  defaultValue={currentUser.mobile_phone_number}
                  className="mt-2 w-full text-right"
                />
              </div>
              <div className="flex justify-end mr-2 items-center  flex-row-reverse gap-4 mt-6">
                <div className="flex flex-row-reverse gap-2">
                  <Checkbox
                    id="admin"
                    checked={currentUser.admin}
                    onCheckedChange={(checked) => setIsAdmin(checked === true)}
                  />
                  <label
                    htmlFor="admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ادمین
                  </label>
                </div>
                <div className="flex flex-row-reverse gap-2">
                  <Checkbox
                    id="crud_project"
                    checked={currentUser.crud_project}
                    onCheckedChange={(checked) =>
                      setCrudProject(checked === true)
                    }
                  />
                  <label
                    htmlFor="crud_project"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    کراد پروژه
                  </label>
                </div>
              </div>
              <div>
                <Label className="mr-2" htmlFor="subOrganizations">
                  مرکز‌ها
                </Label>
                <Select
                  options={
                    select?.map((item) => ({
                      value: item.id,
                      label: item.nickname,
                    })) || []
                  }
                  defaultValue={{
                    value: currentUser?.subOrganizations?.id,
                    label:
                      select?.find(
                        (item) => item.id === currentUser?.subOrganizations?.id
                      )?.nickname || "",
                  }}
                  menuPlacement="top"
                  isLoading={isPending}
                  placeholder="انتخاب مرکز"
                  noOptionsMessage={() => "مرکزی موجود نیست"}
                  onChange={(option) =>
                    setUserSuborganizations(option?.value || null)
                  }
                  className="mt-2 w-full"
                />
              </div>
              {crudProject && (
                <div>
                  <Label className="mr-2" htmlFor="projects">
                    پروژه‌ها
                  </Label>
                  <Select
                    options={
                      ProjectList?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    // defaultValue={currentUser.project}
                    menuPlacement="top"
                    isLoading={pPending}
                    isMulti
                    defaultValue={
                      currentUser.projects?.map((project) => ({
                        value: project.id,
                        label:
                          ProjectList?.find((item) => item.id == project.id)
                            ?.name || "",
                      })) || []
                    }
                    placeholder="انتخاب پروژه"
                    noOptionsMessage={() => "پروژه‌ای موجود نیست"}
                    onChange={(options) =>
                      setUserProjects(options?.map((opt) => opt.value) || [])
                    }
                    className="mt-2 w-full"
                  />
                </div>
              )}
              <div className="md:col-span-2 flex justify-end">
                <Button
                  dir="ltr"
                  type="submit"
                  className="w-1/5 bg-yellow-500 text-white"
                >
                  ویرایش
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminTableWithModal;
