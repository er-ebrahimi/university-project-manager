import { useState } from "react";
import { useParams } from "react-router-dom";
import processData from "./ProcessDataForLineChart";
import CumulativeLineChart from "./CumulativeLineChart";
import { Professor } from "@/types/university";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa"; // Importing FaPlus icon
import { HiOutlinePencil } from "react-icons/hi";

function MoreInfoCards({ professors }: { professors: Professor[] }) {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || ""); // Ensure it's always a string

  // Find professor by name
  const professor = professors.find(
    (p) => `${p.ProfessorFN} ${p.ProfessorLN}` === decodedName
  );

  // If professor is undefined, show a fallback message or handle it gracefully
  if (!professor) {
    return <div>استاد پیدا نشد</div>;
  }

  // Separate state for each chart data
  const [chart1Data, setChart1Data] = useState(processData(professor));
  const [chart2Data, setChart2Data] = useState(processData(professor));

  // State for the modal input
  const [newYear, setNewYear] = useState<number | null>(null);
  const [newData1, setNewData1] = useState<number | null>(null);
  const [newData2, setNewData2] = useState<number | null>(null);
  const [currentChart, setCurrentChart] = useState<number | null>(null); // which chart is being edited

  const handleAddData = () => {
    if (newYear && newData1 && newData2) {
      // Prepare new data entry
      const newData = {
        year: newYear,
        cumulativeCount: newData1,
        count: newData2,
      };

      const updateChartData = (chartData: any[], setChartData: any) => {
        const existingDataIndex = chartData.findIndex(
          (data) => data.year === newYear
        );

        if (existingDataIndex !== -1) {
          // If year exists, update its values
          const updatedData = [...chartData];
          updatedData[existingDataIndex] = {
            ...updatedData[existingDataIndex],
            cumulativeCount: newData1,
            count: newData2,
          };
          setChartData(updatedData);
        } else {
          // If year doesn't exist, add the new data
          setChartData([...chartData, newData]);
        }
      };

      // Update the appropriate chart data
      if (currentChart === 1) {
        updateChartData(chart1Data, setChart1Data);
      } else if (currentChart === 2) {
        updateChartData(chart2Data, setChart2Data);
      }

      // Reset the input after adding/updating the data
      setNewYear(null);
      setNewData1(null);
      setNewData2(null);
    }
  };

  return (
    <>
      <div className="flex w-[750px] flex-row flex-wrap justify-around">
        <Card className="chart-container w-[700px] mt-10">
          <CardHeader className="flex flex-row justify-between items-start">
            <CardTitle className="my-auto">آمار مقاله‌ها </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {/* Make sure there's only a single child here */}
                {/* <Button> */}
                  <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-10 h-10 px-1 py-2 rounded-full bg-primary text-white shadow-md" />
                {/* </Button> */}
              </DialogTrigger>
              <DialogContent dir="rtl">
                {" "}
                {/* Set Dialog content to RTL */}
                <DialogHeader>
                  <DialogTitle className="text-right">
                    اضافه یا تغییر داده در نمودار 1
                  </DialogTitle>
                  <DialogDescription>
                    برای اضافه کردن یا ویرایش داده‌ها ابتدا سال و سپس مقادیر
                    مورد نظر را وارد کنید
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="سال"
                    value={newYear || ""}
                    // onChange={(e) => setNewYear(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="اولین مقدار"
                    value={newData1 || ""}
                    // onChange={(e) => setNewData1(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="دومین مقدار"
                    value={newData2 || ""}
                    // onChange={(e) => setNewData2(parseInt(e.target.value))}
                  />
                </div>
                <DialogFooter>
                  <Button
                  //  onClick={handleAddData}
                  >
                    اضافه یا ویرایش
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent dir="ltr" className="p-2">
            <CumulativeLineChart data={chart1Data} />
          </CardContent>
        </Card>

        <Card className="chart-container w-[700px] mt-10">
          <CardHeader className="flex flex-row justify-between items-start">
            <CardTitle>آمار مقاله‌ها </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {/* Make sure there's only a single child here */}
                {/* <Button> */}
                <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-10 h-10 px-1 py-2 rounded-full bg-primary text-white shadow-md" />
                {/* </Button> */}
              </DialogTrigger>
              <DialogContent dir="rtl">
                {" "}
                {/* Set Dialog content to RTL */}
                <DialogHeader>
                  <DialogTitle className="text-right">
                    اضافه یا تغییر داده در نمودار 2
                  </DialogTitle>
                  <DialogDescription>
                    برای اضافه کردن یا ویرایش داده‌ها ابتدا سال و سپس مقادیر
                    مورد نظر را وارد کنید
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="سال"
                    value={newYear || ""}
                    // onChange={(e) => setNewYear(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="اولین مقدار"
                    value={newData1 || ""}
                    className="py-0 h-10"
                    // onChange={(e) => setNewData1(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="دومین مقدار"
                    value={newData2 || ""}
                    // onChange={(e) => setNewData2(parseInt(e.target.value))}
                  />
                </div>
                <DialogFooter>
                  <Button>اضافه ویرایش</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent dir="ltr">
            <CumulativeLineChart  data={chart2Data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoreInfoCards;
