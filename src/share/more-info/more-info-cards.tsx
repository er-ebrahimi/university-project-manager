import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addRealCulchart,
  addtimeCulchart,
  CulChart,
  deleterealscaleData,
  deletetimescaleData,
  getRealScalesByProj,
  getTimeScalesByProj,
  postRealScales,
  postTimeScales,
} from "@/functions/services/charts";
import { LineChart } from "./line-chart";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import persian from "react-date-object/calendars/persian"; // Jalali calendar support
import persian_fa from "react-date-object/locales/persian_fa";
import { Input } from "@/components/ui/input";
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import toast from "react-hot-toast";
import queryClient from "@/functions/QueryClient";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment-jalaali";
import { UserContext } from "@/functions/Usercontext";
import { Project } from "@/functions/services/project";

function MoreInfoCards({ProjectData}:{ProjectData:Project|undefined}) {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: [`getTimeScalesByProj${id}`],
    queryFn: () => getTimeScalesByProj(id),
  });
  const { data: realStateData, isPending: RealStatePending } = useQuery({
    queryKey: [`getRealScalesByProj${id}`],
    queryFn: () => getRealScalesByProj(id),
  });
  const user = useContext(UserContext);

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (user && user.user?.projects && user.user?.crud_project) {
      user.user?.projects.map((obj) => {
        if (obj.id === Number(id)) {
          setCanEdit(true);
        }
      });
    }
    if (ProjectData?.owner.id && user?.user?.id) {
      if (ProjectData?.owner.id === user?.user?.id) {
        setCanEdit(true);
      }
    }

    // setCanEdit(true)
  }, [user]);
  const [addFormData, setAddFormData] = useState<addtimeCulchart>({
    project: id,
    program_progress_percentage: 0,
    time_program_progress_percentage: 0,
    date: "",
  });
  const [RealaddFormData, setRealAddFormData] = useState<addRealCulchart>({
    project: id,
    program_progress_percentage: 0,
    Real_program_progress_percentage: 0,
    date: "",
  });
  const [timeOpen,setTimeOpen]=useState(false)
  const [RealOpen,setRealOpen]=useState(false)

  const timeMutation = useMutation({
    mutationFn: (data: addtimeCulchart) => postTimeScales(data),
    onSuccess: () => {
      toast.success("با موفقیت اضافه شد");
      setTimeOpen(false)
      queryClient.invalidateQueries({
        queryKey: [`getTimeScalesByProj${id}`],
      });
    },
  });
  const RealMutation = useMutation({
    mutationFn: (data: addRealCulchart) => postRealScales(data),
    onSuccess: () => {
      toast.success("با موفقیت اضافه شد");
      setRealOpen(false)
      queryClient.invalidateQueries({
        queryKey: [`getRealScalesByProj${id}`],
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: parseFloat(value),
    });
  };
  const handleRealInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRealAddFormData({
      ...RealaddFormData,
      [name]: parseFloat(value),
    });
  };

  const handleDateChange = (name: string, date: any) => {
    if (date && date.isValid) {
      const gregorianDate = date.toDate();
      setAddFormData({
        ...addFormData,
        [name]: gregorianDate.toISOString().split("T")[0],
      });
    } else {
      setAddFormData({
        ...addFormData,
        [name]: "",
      });
    }
  };
  const handleRealDateChange = (name: string, date: any) => {
    if (date && date.isValid) {
      const gregorianDate = date.toDate();
      setRealAddFormData({
        ...RealaddFormData,
        [name]: gregorianDate.toISOString().split("T")[0],
      });
    } else {
      setAddFormData({
        ...addFormData,
        [name]: "",
      });
    }
  };

  const handleAddData = () => {
    timeMutation.mutate(addFormData);
  };
  const handleRealAddData = () => {
    RealMutation.mutate(RealaddFormData);
  };

  const transformData = (rawData: CulChart[] | undefined) => {
    if (!rawData) {
      return [];
    }
    const transformedData = rawData.map((item) => ({
      // year: new Date(item.date).getFullYear(),
      year: moment(item.date).format("jYYYY"),

      count: parseFloat(item.program_progress_percentage) || 0,
      cumulativeCount: parseFloat(item.real_program_progress_percentage) || 0,
    }));
    transformedData.sort((a:any, b:any) => a.year - b.year);
    return transformedData;
  };

  const transformData2 = (rawData: any[] | undefined) => {
    if (!rawData) {
      return [];
    }
    // rawData.sort((a:any,b:any)=>b.date - a.year)
    const transformedData = rawData.map((item) => ({
      // year: moment(new Date(item.date).getFullYear()).format("jyyyy"),
      year: moment(item.date).format("jYYYY"),
      count: parseFloat(item.program_progress_percentage) || 0,
      cumulativeCount: parseFloat(item.time_program_progress_percentage) || 0,
    }));
    transformedData.sort((a:any, b:any) => a.year - b.year);
    return transformedData;
  };
  const deleteTimeMutation = useMutation({
    mutationFn: (timeid:number) => deletetimescaleData(timeid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`getTimeScalesByProj${id}`],
      });
      toast.success("داده با موفقیت حذف شد");
      // navigate(routes.dashboard);
    },
    onError: (error: any) => {
      // console.log(error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    },
  });
  const deleteRealMutation = useMutation({
    mutationFn: (Realid:number) => deleterealscaleData(Realid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`getRealScalesByProj${id}`],
      });
      toast.success("داده با موفقیت حذف شد");
      // navigate(routes.dashboard);
    },
    onError: (error: any) => {
      // console.log(error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    },
  });

  return (
    <>
      <div className="flex w-[650px] flex-row flex-wrap justify-around">
        <Card className="chart-container w-[630px] mt-1">
          <CardHeader className="flex flex-row justify-between items-start pt-3 pb-0 px-6">
            <CardTitle className="my-auto text-lg">آمار زمانی </CardTitle>
            <Dialog open={timeOpen} onOpenChange={setTimeOpen}>
              <DialogTrigger asChild>
              {(user?.user?.is_superuser || user?.user?.admin || canEdit) && (
                  <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-6 h-6 px-0 py-1 rounded-full bg-primary text-white shadow-md" />
                )}
              </DialogTrigger>
              <DialogContent dir="rtl" className="font-IranSans w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    اضافه یا تغییر داده در آمار زمانی
                  </DialogTitle>
                  <DialogDescription>
                    برای اضافه کردن یا ویرایش داده‌ها ابتدا سال و سپس مقادیر
                    مورد نظر را وارد کنید
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="number"
                    name="program_progress_percentage"
                    placeholder="اولین مقدار"
                    value={addFormData.program_progress_percentage}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="number"
                    name="time_program_progress_percentage"
                    placeholder="دومین مقدار"
                    value={addFormData.time_program_progress_percentage}
                    onChange={handleInputChange}
                  />
                  <DatePicker
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(date) => handleDateChange("date", date)}
                    inputClass="w-[348px] p-2 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleAddData}>اضافه یا ویرایش</Button>
                </DialogFooter>
                <div className=" h-60 overflow-auto border border-gray-200 rounded-md p-2 ">
                  {data?.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((ele) => {
                    const date = new Date(ele.date);
                    return (
                      <div className=" p-2 border-b flex justify-between content-center items-center">
                        <div>
                          {/* {`${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDay()}`} */}
                          {moment(date.toISOString()).format("jYYYY/jMM/jDD")}

                        </div>
                        <div>
                          <Button onClick={()=>{deleteTimeMutation.mutate(Number(ele.id))}} className="  rounded-full">
                            <MdDeleteOutline  size={20}></MdDeleteOutline>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent dir="ltr" className="p-2">
            <LineChart
              chartData={transformData2(data)}
              isLoading={isPending}
              label={["درصد پیشرفت کار", "پیشرفت اصلی کار"]}
            ></LineChart>
          </CardContent>
        </Card>

        <Card className="chart-container w-[630px] mt-4">
          <CardHeader className="flex flex-row justify-between items-start pt-3 pb-0 px-6">
            <CardTitle className="my-auto text-lg">آمار واقعی</CardTitle>
            <Dialog open={RealOpen} onOpenChange={setRealOpen}>
              <DialogTrigger asChild>
              {(user?.user?.is_superuser || user?.user?.admin || canEdit) && (
                  <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-6 h-6 px-0 py-1 rounded-full bg-primary text-white shadow-md" />
                )}              </DialogTrigger>
              <DialogContent dir="rtl" className="font-IranSans w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    اضافه یا تغییر داده در آمار واقعی
                  </DialogTitle>
                  <DialogDescription>
                    برای اضافه کردن یا ویرایش داده‌ها ابتدا سال و سپس مقادیر
                    مورد نظر را وارد کنید
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="number"
                    name="program_progress_percentage"
                    placeholder="اولین مقدار"
                    value={RealaddFormData.program_progress_percentage}
                    onChange={handleRealInputChange}
                  />
                  <Input
                    type="number"
                    name="Real_program_progress_percentage"
                    placeholder="دومین مقدار"
                    value={RealaddFormData.Real_program_progress_percentage}
                    onChange={handleRealInputChange}
                  />
                  <DatePicker
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(date) => handleRealDateChange("date", date)}
                    inputClass="w-[348px] p-2 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleRealAddData}>اضافه یا ویرایش</Button>
                </DialogFooter>
                <div className=" h-60 overflow-auto border border-gray-200 rounded-md p-2 ">
                  {realStateData?.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((ele) => {
                    const date = new Date(ele.date);
                    return (
                      <div className=" p-2 border-b flex justify-between content-center items-center">
                        <div>
                          {/* {`${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDay()}`} */}
                          {moment(date.toISOString()).format("jYYYY/jMM/jDD")}
                        </div>
                        <div>
                          <Button onClick={()=>{deleteRealMutation.mutate(Number(ele.id))}} className="  rounded-full">
                            <MdDeleteOutline  size={20}></MdDeleteOutline>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent dir="ltr" className="p-2">
            <LineChart
              chartData={transformData(realStateData)}
              isLoading={RealStatePending}
              label={["درصد پیشرفت کار", "پیشرفت اصلی کار"]}
            ></LineChart>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoreInfoCards;
