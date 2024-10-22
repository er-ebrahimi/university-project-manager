import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  CulChart,
  getRealScalesByProj,
  getTimeScalesByProj,
} from "@/functions/services/charts";
import { LineChart } from "./line-chart";
import React, { useState } from "react";

import ModalObj from "./modal";
function MoreInfoCards() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(-1);
  const { data, isPending } = useQuery({
    queryKey: [`getTimeScalesByProj${id}`],
    queryFn: () => getTimeScalesByProj(id),
  });
  const { data: realStateData, isPending: RealStatePending } = useQuery({
    queryKey: [`getRealScalesByProj${id}`],
    queryFn: () => getRealScalesByProj(id),
  });

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
  const transformData2 = (rawData: any[] | undefined) => {
    if (!rawData) {
      // Return an empty array if rawData is undefined
      return [];
    }

    // Map through the rawData and transform it
    const transformedData = rawData.map((item) => ({
      year: new Date(item.date).getFullYear(),
      count: parseFloat(item.program_progress_percentage) || 0, // handle default for NaN
      cumulativeCount: parseFloat(item.time_program_progress_percentage) || 0, // handle default for NaN
    }));
    transformedData.sort((a, b) => a.year - b.year);

    return transformedData;
  };
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <>
      <div className="flex w-[650px] flex-row flex-wrap justify-around">
        <Card className="chart-container w-[630px] mt-1">
          <CardHeader className="flex flex-row justify-between items-start pt-3 pb-0 px-6">
            <CardTitle className="my-auto text-lg">آمار زمانی </CardTitle>

            <ModalObj id={id} data={data} isLoading={isPending} />
          </CardHeader>
          <CardContent dir="ltr" className="p-2">
            {/* <CumulativeLineChart data={transformData(data)} /> */}
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
            <ModalObj
              id={id}
              data={realStateData}
              isLoading={RealStatePending}
            ></ModalObj>
          </CardHeader>
          <CardContent dir="ltr" className="p-2">
            {/* <CumulativeLineChart data={transformData(realStateData)} /> */}
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
