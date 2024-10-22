import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  AddPieChart,
  getPieScales,
  postPieScales,
} from "@/functions/services/charts";
import toast from "react-hot-toast";
import "./professor-info.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"; // Jalali calendar support
import persian_fa from "react-date-object/locales/persian_fa";
import queryClient from "@/functions/QueryClient";

// Professor Info Component with PieChart and Modal to adjust percentages
function ProfessorInfo() {
  const { id } = useParams();

  const { data: pieData, isPending } = useQuery({
    queryKey: ["pieData"],
    queryFn: () => getPieScales(id),
  });

  // const mutation = useMutation(postPieScales, {
  //   onSuccess: () => {
  //     toast.success("Data successfully submitted.");
  //   },
  //   onError: () => {
  //     toast.error("Failed to submit data. Please try again.");
  //   },
  // });
  const mutation = useMutation({
    mutationFn: (data: AddPieChart) => postPieScales(data),
    onSuccess: () => {
      toast.success("با موفقیت اضافه شد");
      queryClient.invalidateQueries({
        queryKey: ["pieData"],
      });
    },
    onError: (error: any) => {
      toast.error("درخواست با خطا مواجه شد", error);
    },
  });
  // const mutation = useMutation({
  //   mutationFn: (addFormData: AddProjectData) =>
  //     postAddProject(addFormData),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [`suboorganization${organizationId}`]
  //     }); // Ensure organization data is refreshed
  //     console.log("Project added successfully");
  //     setOpen(false);
  //   },
  //   onError: (error: any) => {
  //     console.error("Error adding project:", error);
  //   },
  // });

  // Set the default data, will be updated once pieData is available
  const [data, setData] = useState([
    { name: "داده‌ای  برای نمایش وجود ندارد", value: 100 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    pending_percentage: pieData ? Number(pieData[0]?.pending_percentage) : 0,
    doing_percentage: pieData ? Number(pieData[0]?.doing_percentage) : 0,
    finished_percentage: pieData ? Number(pieData[0]?.finished_percentage) : 0,
  });
  const [error, setError] = useState("");

  // Update the pie chart data when pieData is available
  useEffect(() => {
    if (pieData && pieData[0]) {
      setData([
        { name: "انجام نشده", value: Number(pieData[0].pending_percentage) },
        { name: "در حال انجام", value: Number(pieData[0].doing_percentage) },
        { name: "خاتمه یافته", value: Number(pieData[0].finished_percentage) },
      ]);
    }
  }, [pieData]);

  const [addFormData, setAddFormData] = useState<AddPieChart>({
    project: id,
    doing_percentage: 0,
    finished_percentage: 0,
    pending_percentage: 0,
    date: "",
  });

  const handleInputChange = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleDateChange = (name: any, date: any) => {
    if (date && date.isValid) {
      // Convert Jalali date to Gregorian and then format to ISO string
      const gregorianDate = date.toDate(); // convert to regular JavaScript date
      setAddFormData({
        ...addFormData,
        [name]: gregorianDate.toISOString().split("T")[0], // Only keep YYYY-MM-DD
      });
    } else {
      setAddFormData({
        ...addFormData,
        [name]: "",
      });
    }
  };

  const handleSubmit = () => {
    const sum =
      inputValues.pending_percentage +
      inputValues.doing_percentage +
      inputValues.finished_percentage;
    if (sum === 100) {
      const payload = {
        ...addFormData,
        pending_percentage: inputValues.pending_percentage,
        doing_percentage: inputValues.doing_percentage,
        finished_percentage: inputValues.finished_percentage,
      };
      mutation.mutate(payload);
      setData([
        { name: "باقیمانده", value: inputValues.pending_percentage },
        { name: "در حال انجام", value: inputValues.doing_percentage },
        { name: "خاتمه یافته", value: inputValues.finished_percentage },
      ]);
      setIsModalOpen(false);
      setError("");
    } else {
      toast.error("مجموع اعداد باید برابر با ۱۰۰ باشد.");
    }
  };

  return (
    <>
      <div
        className="profile-container"
        style={{
          width: "37%",
          marginTop: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Card dir="rtl" className="relative">
          <FaPlus
            className="absolute cursor-pointer z-50 top-2 w-8 h-8 p-2 left-2 rounded-full bg-primary text-white shadow-md"
            onClick={() => setIsModalOpen(true)}
          />
          <CardContent className="flex justify-start items-center h-[525px]">
            <PieChart width={500} height={500}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                display={"flex"}
                outerRadius={120}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}${
                    !(data[0].name == "داده‌ای  برای نمایش وجود ندارد")
                      ? `:  ${"  %" + (percent * 100).toFixed(0)}`
                      : ``
                  }`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    direction={
                      data[0].name == "داده‌ای  برای نمایش وجود ندارد"
                        ? "rtl"
                        : "ltr"
                    }
                    key={`cell-${index}`}
                    className={
                      data.length > 2
                        ? index % 3 === 2
                          ? "fill-success "
                          : index % 3 === 1
                          ? "fill-danger"
                          : "fill-red-600"
                        : "fill-gray-300"
                    }
                  />
                ))}
              </Pie>
              {!(data[0].name == "داده‌ای  برای نمایش وجود ندارد") ? (
                <Tooltip />
              ) : null}
            </PieChart>
          </CardContent>
        </Card>

        {/* Modal for inputting new percentages */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            dir="rtl"
            className="space-y-4 font-IranSans w-[400px]"
          >
            <DialogHeader>
              <DialogTitle className="text-right">
                درصد های مورد نظر را وارد کنید
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="pending_percentage"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد انجام نشده
                </label>
                <Input
                  name="pending_percentage"
                  type="number"
                  placeholder="درصد دستیار استاد"
                  value={inputValues.pending_percentage}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="doing_percentage"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد در حال انجام
                </label>
                <Input
                  name="doing_percentage"
                  type="number"
                  placeholder="درصد استادیار"
                  value={inputValues.doing_percentage}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="finished_percentage"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد خاتمه یافته
                </label>
                <Input
                  name="finished_percentage"
                  type="number"
                  placeholder="درصد کارمند"
                  value={inputValues.finished_percentage}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="finished_percentage"
                  className="block text-right mb-1 text-gray-700"
                >
                  تاریخ{" "}
                </label>
                <DatePicker
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(date) => handleDateChange("date", date)}
                  inputClass="w-[348px] p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-right">{error}</p>
              )}
            </div>
            <DialogFooter className="!flex !flex-row-reverse !justify-start">
              <Button onClick={handleSubmit} className="bg-primary text-white">
                ثبت
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="destructive"
              >
                پاک کردن داده‌ها
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ProfessorInfo;
