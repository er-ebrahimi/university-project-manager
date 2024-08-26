import React, { useState } from "react";
import { Table, Button, Radio, Input, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/reset.css"; // Reset Ant Design styles
import "./TableAdmin.css"; // Include your Tailwind styles here
import { data } from "../../data/data"; // Assuming this is your data source

interface DataType {
  key: React.Key;
  name: string;
  role: string;
  email: string;
  department: string;
  date: string;
}

const AdminTable: React.FC = () => {
  const [searchText, setSearchText] = useState<string>(""); // State for the search text
  const [filteredData, setFilteredData] = useState<DataType[]>(data); // State for filtered data

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
      title: "نام",
      dataIndex: "name",
      key: "name",
      className: "text-right",
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
      className: "text-right",
    },
    {
      title: "دانشکده",
      dataIndex: "department",
      key: "department",
      className: "text-right",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      className: "text-right",
    },
    {
      title: "نقش",
      key: "role",
      render: (_, record) => (
        <Radio.Group
          defaultValue={record.role}
          disabled
          className="flex justify-start flex-row"
        >
          <Radio  value="دیدن" className="text-black flex flex-row-reverse">
            دیدن
          </Radio>
          <Radio value="ویرایش" className="text-black flex flex-row-reverse">
            ویرایش
          </Radio>
          <Radio value="ادمین" className="text-black flex flex-row-reverse">
            ادمین
          </Radio>
        </Radio.Group>
      ),
    },
    {
      title: "عملیات",
      key: "operation",
      render: (_, record) => (
        <>
          <Button type="primary" danger className="!bg-primary text-white">
            حذف
          </Button>
        </>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7C3AED",
        },
      }}
      direction="rtl"
    >
      <div className="p-6 bg-white rounded-lg w-[75vw] h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">ادمین</h1>
          <Input.Search
            placeholder="جستجوی کاربران"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-52"
          />
        </div>
        <Table
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            position: ["bottomLeft"],
            style: {
              direction: "rtl",
              textAlign: "right",
            },
          }}
          columns={columns}
          dataSource={filteredData}
          className="rtl-table"
        />
      </div>
    </ConfigProvider>
  );
};

export default AdminTable;
