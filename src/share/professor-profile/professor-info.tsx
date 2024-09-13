import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Professor } from "@/types/university";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
// import MoreInfoCards from "./MoreInfoCards";
import "./professor-info.css";
import MoreInfoCards from "../more-info/more-info-cards";

// Professor Info Component with PieChart and Modal to adjust percentages
function ProfessorInfo({ professors }: { professors: Professor[] }) {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");
  const professor = professors.find((p) => `${p.ProfessorFN} ${p.ProfessorLN}` === decodedName);

  const [data, setData] = useState([
    { name: "دستیار استاد", value: 33.33 },
    { name: "استادیار", value: 33.33 },
    { name: "کارمند", value: 33.33 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    ta: 33.33,
    associate: 33.33,
    employed: 33.33,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    const sum = inputValues.ta + inputValues.associate + inputValues.employed;
    if (sum === 100) {
      setData([
        { name: "دستیار استاد", value: inputValues.ta },
        { name: "استادیار", value: inputValues.associate },
        { name: "کارمند", value: inputValues.employed },
      ]);
      setIsModalOpen(false);
      setError("");
    } else {
      setError("مجموع اعداد باید برابر با ۱۰۰ باشد.");
    }
  };

  return (
    <>
      <div className="profile-container" style={{ width:"37%",marginTop:"4px" ,display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* PieChart Section */}
        <Card dir="rtl" className="relative">
          <FaPlus
            className="absolute cursor-pointer z-50 top-2 w-8 h-8 p-2 left-2 rounded-full bg-primary text-white shadow-md"
            onClick={() => setIsModalOpen(true)}
          />
          <CardContent className="flex justify-start items-center h-[525px] ">
            <PieChart width={500} height={500}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    className={
                      index % 3 === 0
                        ? "fill-success"
                        : index % 3 === 1
                        ? "fill-danger"
                        : "fill-warning"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>

        {/* Render MoreInfoCards for additional charts and information */}
        {/* <MoreInfoCards professors={professors} /> */}

        {/* Modal for inputting new percentages */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent dir="rtl" className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-right">ورود درصدها</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label htmlFor="ta" className="block text-right mb-1 text-gray-700">
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
                <label htmlFor="associate" className="block text-right mb-1 text-gray-700">
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
                <label htmlFor="employed" className="block text-right mb-1 text-gray-700">
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
              {error && <p className="text-red-500 text-sm text-right">{error}</p>}
            </div>
            <DialogFooter className="flex justify-between">
              <Button onClick={handleSubmit} className="bg-primary text-white">
                ثبت
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="outline">
                لغو
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ProfessorInfo;
