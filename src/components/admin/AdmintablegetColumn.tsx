// import { User } from "@/types/userType"
// import { ColumnsType } from "antd/es/table"
// import { Button } from "../ui/button";
// import { MdDeleteOutline, MdModeEdit } from "react-icons/md";

// export const columns: ColumnsType<User> = [
//     {
//       title: "نام کاربری",
//       dataIndex: "username",
//       key: "username",
//       className: "text-right",
//     },
//     {
//       title: "نام",
//       dataIndex: "first_name",
//       key: "first_name",
//       className: "text-right",
//     },
//     {
//       title: "نام خانوادگی",
//       dataIndex: "last_name",
//       key: "last_name",
//       className: "text-right",
//     },
//     {
//       title: "نام مستعار",
//       dataIndex: "nickname",
//       key: "nickname",
//       className: "text-right",
//     },

//     {
//       title: "کد ملی",
//       dataIndex: "id_number",
//       key: "id_number",
//       className: "text-right",
//     },
//     {
//       title: "شماره پرسنلی",
//       dataIndex: "personal_number",
//       key: "personal_number",
//       className: "text-right",
//     },
//     {
//       title: "سطح تحصیلات",
//       dataIndex: "educational_level",
//       key: "educational_level",
//       className: "text-right",
//     },
//     {
//       title: "شماره تلفن",
//       dataIndex: "phone_number",
//       key: "phone_number",
//       className: "text-right",
//     },
//     {
//       title: "شماره موبایل",
//       dataIndex: "mobile_number",
//       key: "mobile_number",
//       className: "text-right",
//     },
//     {
//       title: "عملیات",
//       key: "operation",
//       render: (_, record) => (
//         <div className="flex flex-row-reverse space-x-2">
//           <Button className="bg-red-500 text-white w-10 h-10 p-0 px-2">
//             {/* حذف  */}
//             <MdDeleteOutline className="text-center  w-full h-full" />
//           </Button>
//           <Button
//             className="bg-yellow-500 text-white p-2 w-10 h-10"
//             onClick={() => handleEdit(record)}
//           >
//             {/* ویرایش */}
//             <MdModeEdit className="text-center  w-full h-full" />
//           </Button>
//         </div>
//       ),
//     },
//   ];