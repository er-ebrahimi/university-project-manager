import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/reset.css";
import "./TableAdmin.css";
import { FaUserPlus } from "react-icons/fa";

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
// import { render } from "react-dom";
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

  // Handle editing a user
  const handleEdit = (record: User) => {
    setCurrentUser(record);
    setIsEditModalVisible(true);
  };

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
    const updatedUser = { ...currentUser, ...values };
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
    // ... (same columns as before)
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
        <div className="flex flex-row gap-4">
          <h1 className="text-lg font-semibold">مدیریت کاربران</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-500 text-white">
                افزودن کاربر جدید
                <FaUserPlus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="my-4 h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
              <DialogHeader>
                <DialogTitle className="text-right">
                  افزودن کاربر جدید
                </DialogTitle>
              </DialogHeader>
              <AddUser />
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
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Pre-filled form fields for editing */}
              {/* ... (same form fields as before) */}
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
                  // required
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
                  name="personal_number"
                  id="personal_number"
                  required
                  defaultValue={currentUser.personal_id_number}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="user_permissions">
                  نقش
                </Label>
                <select
                  name="user_permissions"
                  id="user_permissions"
                  required
                  defaultValue={currentUser.user_permissions.id}
                  className="mt-2 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="1">سوپرادمین</option>
                  <option value="2">کاربر</option>
                </select>
              </div>
              <div>
                <Label className="mr-2" htmlFor="education_level">
                  سطح تحصیلات
                </Label>
                <select
                  name="education_level"
                  id="education_level"
                  required
                  defaultValue={currentUser.education_level}
                  className="mt-2 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="BSc">کارشناسی</option>
                  <option value="Ms">کارشناسی ارشد</option>
                  <option value="PhD">دکترا</option>
                  <option value="Prof">پروفسور</option>
                </select>
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
                  name="mobile_number"
                  id="mobile_number"
                  required
                  defaultValue={currentUser.mobile_phone_number}
                  className="mt-2 w-full text-right"
                />
              </div>
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
