import React from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import "./ProfessorProfile.css";
// import CurrentDateComponent from "./CurrentDateComponent";
import { useNavigate } from "react-router-dom";
import { Professor } from "@/types/university";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProfessorInfo({ professors }: { professors: Professor[] }) {
  const navigate = useNavigate();
  const { name } = useParams();
  const decodedName = decodeURIComponent(name ? name : "");
  const professor = professors.find(
    (p) => `${p.ProfessorFN} ${p.ProfessorLN}` === decodedName
  );

  // Helper function to calculate year difference
  const calculateYearDifference = (from: Date, to = new Date()) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return toDate.getFullYear() - fromDate.getFullYear();
  };

  // Aggregate durations
  let totalTA = 0,
    totalAssociate = 0,
    totalEmployed = 0;
  professors.forEach((prof: Professor) => {
    totalTA += calculateYearDifference(
      prof.TeacherAssistant,
      prof.AssociateProfessor
    );
    totalAssociate += calculateYearDifference(
      prof.AssociateProfessor,
      prof.EmploymentDate
    );
    totalEmployed += calculateYearDifference(prof.EmploymentDate);
  });

  // Assuming the total time is the sum of all durations
  const totalTime = totalTA + totalAssociate + totalEmployed;

  // Calculate percentages
  const data = [
    { name: "Teacher Assistant", value: (totalTA / totalTime) * 100 },
    { name: "Associate Professor", value: (totalAssociate / totalTime) * 100 },
    { name: "Employed", value: (totalEmployed / totalTime) * 100 },
  ];

  return (
    <>
      {/* <h1 className="top-center-container">
        {professor?.ProfessorFN} {professor?.ProfessorLN} Information
      </h1> */}

      <div
        className="profile-container"
        style={{ display: "flex", gap: "20px" }}
      >
        <Card dir="ltr">
          <CardContent>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                className="text-black"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    // fill={["primary", "#00C49F", "#FFBB28"][index % 3]}
                    className={
                      index % 3 === 0
                        ? "fill-primary"
                        : index % 3 === 1
                        ? "fill-primary-dark"
                        : "fill-primary-light" + " text-black"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>

        {/* Professor's information rendering remains the same */}
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <CardTitle>اطلاعات</CardTitle>
          </CardHeader>

          <CardContent>
            {professor ? (
              <div>
                <div>
                  <p>
                    <strong>اسم:</strong>
                  </p>
                </div>
                <div className="professor-info">
                  <p>{professor.ProfessorFN}</p>
                </div>
                <div>
                  <p>
                    <strong>فامیل: </strong>
                  </p>
                </div>
                <div className="professor-info">
                  <p>{professor.ProfessorLN}</p>
                </div>
                <div>
                  <p>
                    <strong>تولد:</strong>{" "}
                  </p>
                </div>
                <div className="professor-info">
                  <p>{`${professor.BirthDate}`}</p>
                </div>
                <div>
                  <p>
                    <strong>استخدام:</strong>{" "}
                  </p>
                </div>
                <div className="professor-info">
                  <p>{`${professor.EmploymentDate}`}</p>
                </div>
                {/* Add more professor info as needed */}
                {/* <div>
                  <p>
                    <strong>Current Date:</strong>{" "}
                  </p>
                  <div className="professor-info">
                  </div>
                </div> */}
              </div>
            ) : (
              <p>استاد پیدا نشد</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="mx-1"
              onClick={() =>
                navigate(
                  `/more-info/${encodeURIComponent(
                    `${professor?.ProfessorFN} ${professor?.ProfessorLN}`
                  )}`
                )
              }
            >
              اطلاعات بیشتر
            </Button>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button type="button">برو به google</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default ProfessorInfo;
