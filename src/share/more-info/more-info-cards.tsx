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
      <div style={{ display: "flex", gap: "20px" }}>
        <Card className="chart-container" style={{ width: "50%" }}>
          <CardHeader>
            <CardTitle>Article Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <CumulativeLineChart data={processedData} />
          </CardContent>
        </Card>
        <Card className="info-container" style={{ width: "50%" }}>
          <CardHeader className="top-center-container">
            <CardTitle>Researching Fields</CardTitle>
          </CardHeader>
          <CardContent>
            {professor?.fields.map((field, index) => (
              <>
                <div key={index}>
                  <p>
                    <strong>Field {index + 1}:</strong>
                  </p>
                </div>
                <div key={index + "sec"} className="professor-info">
                  <p>{field}</p>
                </div>
              </>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoreInfoCards;
