import React from "react";
import { useParams } from "react-router-dom";
import processData from "./ProcessDataForLineChart";
import CumulativeLineChart from "./CumulativeLineChart";
import { Professor } from "@/types/university";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function MoreInfoCards({ professors }: { professors: Professor[] }) {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const professor = professors.find(
    (p) => `${p.ProfessorFN} ${p.ProfessorLN}` === decodedName
  );
  const processedData = processData(professor);

  return (
    <>
      {/* <div>
        <h1 className="top-center-container">
          {professor?.ProfessorFN} {professor?.ProfessorLN}
        </h1>
      </div> */}
      <div className="flex flex-row flex-wrap justify-around">
        <Card className="chart-container w-[550px] mt-10" >
          <CardHeader>
            <CardTitle>آمار مقاله‌ها</CardTitle>
          </CardHeader>
          <CardContent dir="ltr">
            <CumulativeLineChart data={processedData} />
          </CardContent>
        </Card>
        <Card className="chart-container w-[550px] mt-10">
          <CardHeader>
            <CardTitle>آمار مقاله‌ها</CardTitle>
          </CardHeader>
          <CardContent dir="ltr">
            <CumulativeLineChart data={processedData} />
          </CardContent>
        </Card>
        <Card className="info-container mt-10" style={{ width: "50%" }}>  
          <CardHeader className="top-center-container">
            <CardTitle>زمینه‌های تحقیق</CardTitle>
          </CardHeader>
          <CardContent>
            {professor?.fields.map((field, index) => (
              <div key={index}>
                <div className="my-2">
                  <p>
                    <strong>رشته {index + 1}:</strong> {field}
                  </p>
                </div>
              </div>
            ))}
            <div>
              <div className="my-2">
                <p>
                  <strong>رشته ۳:</strong> کامپیوتر
                </p>
              </div>
            </div>
            <div>
              <div className="my-2">
                <p>
                  <strong>رشته ۴:</strong> معماری
                </p>
              </div>
            </div>
            <div>
              <div className="my-2">
                <p>
                  <strong>رشته ۵:</strong> ریاضی
                </p>
              </div>
            </div>
            <div>
              <div className="my-2">
                <p>
                  <strong>رشته ۶:</strong> فیزیک
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoreInfoCards;
