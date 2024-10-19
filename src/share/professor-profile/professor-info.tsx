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
import { useQuery } from "@tanstack/react-query";
import { getPieScales } from "@/functions/services/charts";
import toast from "react-hot-toast";
import "./professor-info.css";
// Professor Info Component with PieChart and Modal to adjust percentages
function ProfessorInfo() {
  const { id } = useParams();

  const { data: pieData, isPending } = useQuery({
    queryKey: ["pieData"],
    queryFn: () => getPieScales(id),
  });

  // Set the default data, will be updated once pieData is available
  const [data, setData] = useState([
    { name: "داده‌ای  برای نمایش وجود ندارد", value: 100 },
    // { name: "استادیار", value: 33 },
    // { name: "کارمند", value: 34 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    ta: 33,
    associate: 33,
    employed: 34,
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

  const handleInputChange = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    const sum = inputValues.ta + inputValues.associate + inputValues.employed;
    if (sum === 100) {
      setData([
        { name: "باقیمانده", value: inputValues.ta },
        { name: "در حال انجام", value: inputValues.associate },
        { name: "خاتمه یافته", value: inputValues.employed },
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
                cx="56%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                //labelLine=
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
          <DialogContent dir="rtl" className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-right">
                درصد های مورد نظر را وارد کنید
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="ta"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد دستیار استاد
                </label>
                <Input
                  name="ta"
                  type="number"
                  placeholder="درصد دستیار استاد"
                  value={inputValues.ta}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="associate"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد استادیار
                </label>
                <Input
                  name="associate"
                  type="number"
                  placeholder="درصد استادیار"
                  value={inputValues.associate}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="employed"
                  className="block text-right mb-1 text-gray-700"
                >
                  درصد کارمند
                </label>
                <Input
                  name="employed"
                  type="number"
                  placeholder="درصد کارمند"
                  value={inputValues.employed}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-primary"
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
