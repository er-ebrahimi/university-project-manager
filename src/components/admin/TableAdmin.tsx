import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/reset.css"; // Reset Ant Design styles
import "./TableAdmin.css"; // Include your Tailwind styles here
import { data, DataType } from "../../data/data"; // Assuming this is your data source
import { FaUserPlus } from "react-icons/fa";

// ShadCN UI Imports
import { Button } from "@/components/ui/button"; // Button from ShadCN
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Modal/Dialog from ShadCN
import { Input } from "@/components/ui/input"; // Input from ShadCN
import { Label } from "@/components/ui/label"; // Label from ShadCN
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import AddUser from "./AddUser";

const AdminTableWithModal: React.FC = () => {
  // const [isModalVisible, setIsModalVisible] = useState(false); // State for add modal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal visibility
  const [currentUser, setCurrentUser] = useState<DataType | null>(null); // State for selected user
  const [searchText, setSearchText] = useState<string>(""); // State for search text
  const [filteredData, setFilteredData] = useState<DataType[]>(data); // State for filtered data

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const handleEditCancel = () => {
  //   setIsEditModalVisible(false);
  // };

  // Function to handle form submission (when user is added)
  

  // Function to handle editing of a user
  const handleEdit = (record: DataType) => {
    setCurrentUser(record); // Set current user to be edited
    setIsEditModalVisible(true); // Show edit modal
  };

  const onEditFinish = (values: any) => {
    const updatedData = filteredData.map((user) =>
      user.id === currentUser?.id ? { ...user, ...values } : user
    );
    setFilteredData(updatedData); // Update the user in the table
    setIsEditModalVisible(false); // Close edit modal
  };

  // Search functionality: filter table based on user input
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns: ColumnsType<DataType> = [
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
      dataIndex: "id_number",
      key: "id_number",
      className: "text-right",
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "personal_number",
      key: "personal_number",
      className: "text-right",
    },
    {
      title: "سطح تحصیلات",
      dataIndex: "educational_level",
      key: "educational_level",
      className: "text-right",
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone_number",
      key: "phone_number",
      className: "text-right",
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile_number",
      key: "mobile_number",
      className: "text-right",
    },
    {
      title: "عملیات",
      key: "operation",
      render: (_, record) => (
        <div className="flex flex-row-reverse space-x-2">
          <Button className="bg-red-500 text-white w-10 h-10 p-0 px-2">
            {/* حذف  */}
            <MdDeleteOutline className="text-center  w-full h-full" />
          </Button>
          <Button
            className="bg-yellow-500 text-white p-2 w-10 h-10"
            onClick={() => handleEdit(record)}
          >
            {/* ویرایش */}
            <MdModeEdit className="text-center  w-full h-full" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg w-[75vw] h-[80vh]">
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
            <DialogContent className="my-4 h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
              <DialogHeader>
                <DialogTitle className="text-right">
                  افزودن کاربر جدید
                </DialogTitle>
              </DialogHeader>
              <AddUser/>
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
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          position: ["bottomLeft"],
          style: {
            direction: "ltr",
            // transform:"revert",
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
          <DialogContent className="my-4 h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
            <DialogHeader>
              <DialogTitle className="text-right">ویرایش کاربر</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const values = Object.fromEntries(formData.entries());
                onEditFinish(values); // Handle form submission
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Pre-filled form fields for editing */}
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
                  defaultValue={currentUser.id_number}
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
                  defaultValue={currentUser.personal_number}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="educational_level">
                  سطح تحصیلات
                </Label>
                <Input
                  name="educational_level"
                  id="educational_level"
                  required
                  defaultValue={currentUser.educational_level}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="phone_number">
                  شماره تلفن
                </Label>
                <Input
                  name="phone_number"
                  id="phone_number"
                  required
                  defaultValue={currentUser.phone_number}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <Label className="mr-2" htmlFor="mobile_number">
                  شماره موبایل
                </Label>
                <Input
                  name="mobile_number"
                  id="mobile_number"
                  required
                  defaultValue={currentUser.mobile_number}
                  className="mt-2 w-full"
                />
              </div>
              {/* Submit button in full row */}
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
