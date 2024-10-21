// import { useState } from "react";
import { useParams } from "react-router-dom";
// import processData from "./ProcessDataForLineChart";
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
import { HiOutlinePencil } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import {
  CulChart,
  getRealScalesByProj,
  getTimeScalesByProj,
} from "@/functions/services/charts";

function MoreInfoCards() {
  const { id } = useParams();
  // const decodedName = decodeURIComponent(name || ""); // Ensure it's always a string

  // Find professor by name
  // const professor = professors.find(
  //   (p) => `${p.ProfessorFN} ${p.ProfessorLN}` === decodedName
  // );

  // // If professor is undefined, show a fallback message or handle it gracefully
  // if (!professor) {
  //   return <div>استاد پیدا نشد</div>;
  // }

  const { data, isPending } = useQuery({
    queryKey: [`getTimeScalesByProj${id}`],
    queryFn: () => getTimeScalesByProj(id),
  });
  const { data: realStateData, isPending: RealStatePending } = useQuery({
    queryKey: [`getRealScalesByProj${id}`],
    queryFn: () => getRealScalesByProj(id),
  });
  // console.log("🚀 ~ MoreInfoCards ~ realStateData:", realStateData)
  // console.log("🚀 ~ MoreInfoCards ~ data:", data)
  // const rawData = [
  //   {
  //     id: 2,
  //     program_progress_percentage: "20.00",
  //     time_program_progress_percentage: "10.00",
  //     date: "2022-08-09T15:56:56+03:30",
  //     create_date: "2022-10-20T15:31:09.104725+03:30",
  //     project: 1,
  //   },
  //   {
  //     id: 2,
  //     program_progress_percentage: "20.00",
  //     time_program_progress_percentage: "10.00",
  //     date: "2023-08-09T15:56:56+03:30",
  //     create_date: "2023-10-20T15:31:09.104725+03:30",
  //     project: 1,
  //   },
  //   {
  //     id: 1,
  //     program_progress_percentage: "100.00",
  //     time_program_progress_percentage: "95.00",
  //     date: "2024-08-09T15:56:56+03:30",
  //     create_date: "2024-10-20T15:29:26.765125+03:30",
  //     project: 1,
  //   },
  // ];
  const transformData = (rawData: CulChart[] | undefined) => {
    if (!rawData) {
      // Return an empty array if rawData is undefined
      return [];
    }

    // Map through the rawData and transform it
    const transformedData = rawData.map((item) => ({
      year: new Date(item.date).getFullYear(),
      count: parseFloat(item.program_progress_percentage) || 0, // handle default for NaN
      cumulativeCount: parseFloat(item.real_program_progress_percentage) || 0, // handle default for NaN
    }));
    transformedData.sort((a, b) => a.year - b.year);

    return transformedData;
  };

  // console.log(transformData(data));
  // Separate state for each chart data
  // const [chart1Data, setChart1Data] = useState(processData(professor));
  // const chart1Data = processData(professor);
  // const [chart2Data, setChart2Data] = useState(processData(professor));

  // State for the modal input
  // const [newYear, setNewYear] = useState<number | null>(null);
  // const [newData1, setNewData1] = useState<number | null>(null);
  // const [newData2, setNewData2] = useState<number | null>(null);
  // const [currentChart, setCurrentChart] = useState<number | null>(null); // which chart is being edited

  // const handleAddData = () => {
  //   if (newYear && newData1 && newData2) {
  //     // Prepare new data entry
  //     const newData = {
  //       year: newYear,
  //       cumulativeCount: newData1,
  //       count: newData2,
  //     };

  //     const updateChartData = (chartData: any[], setChartData: any) => {
  //       const existingDataIndex = chartData.findIndex(
  //         (data) => data.year === newYear
  //       );

  //       if (existingDataIndex !== -1) {
  //         // If year exists, update its values
  //         const updatedData = [...chartData];
  //         updatedData[existingDataIndex] = {
  //           ...updatedData[existingDataIndex],
  //           cumulativeCount: newData1,
  //           count: newData2,
  //         };
  //         setChartData(updatedData);
  //       } else {
  //         // If year doesn't exist, add the new data
  //         setChartData([...chartData, newData]);
  //       }
  //     };

  //     // Update the appropriate chart data
  //     if (currentChart === 1) {
  //       updateChartData(chart1Data, setChart1Data);
  //     } else if (currentChart === 2) {
  //       updateChartData(chart2Data, setChart2Data);
  //     }

  //     // Reset the input after adding/updating the data
  //     setNewYear(null);
  //     setNewData1(null);
  //     setNewData2(null);
  //   }
  // };
  // console.log("data",chart1Data)
  return (
    <>
      <div className="flex w-[650px] flex-row flex-wrap justify-around">
        <Card className="chart-container w-[630px] mt-1">
          <CardHeader className="flex flex-row justify-between items-start pt-3 pb-0 px-6">
            <CardTitle className="my-auto text-lg">آمار زمانی </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {/* Make sure there's only a single child here */}
                {/* <Button> */}
                <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-6 h-6 px-0 py-1 rounded-full bg-primary text-white shadow-md" />
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
                    // value={newYear || ""}
                    // onChange={(e) => setNewYear(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="اولین مقدار"
                    // value={newData1 || ""}
                    // onChange={(e) => setNewData1(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="دومین مقدار"
                    // value={newData2 || ""}
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
            <CumulativeLineChart data={transformData(data)} />
          </CardContent>
        </Card>

        <Card className="chart-container w-[630px] mt-4">
          <CardHeader className="flex flex-row justify-between items-start pt-3 pb-0 px-6">
            <CardTitle className="my-auto text-lg">آمار واقعی</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {/* Make sure there's only a single child here */}
                {/* <Button> */}
                <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-6 h-6 px-0 py-1 rounded-full bg-primary text-white shadow-md" />
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
                    // value={newYear || ""}
                    // onChange={(e) => setNewYear(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="اولین مقدار"
                    // value={newData1 || ""}
                    // onChange={(e) => setNewData1(parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="دومین مقدار"
                    // value={newData2 || ""}
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
            <CumulativeLineChart data={transformData(realStateData)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoreInfoCards;
