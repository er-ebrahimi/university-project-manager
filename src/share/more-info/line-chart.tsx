import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import { ChartOptions, ChartData } from "chart.js";
import { colors } from "@/colors";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Set default font for the chart
ChartJS.defaults.font.family = "Ubuntu";

// Sample data formatting function
const formatTimeWithDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  return (
    date.getHours() +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds() +
    " " +
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) + // Month is zero-indexed in JS
    "/" +
    date.getDate()
  );
};

// Chart options
export const options: () => ChartOptions<"line"> = () => {
  return {
    onClick: (data, value) => {
      // setOpen((x) => !x);
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: true },
        ticks: {
          font: {
            size: 8,
          },
          // color: "rgb(255,255,255)",
        },
        border: { display: true },
      },
      y: {
        grid: { display: true },
        ticks: {
          font: {
            size: 10,
          },
          // color: "rgb(255,255,255)",
        },
        border: { display: true },
      },
    },
    plugins: {
      legend: {
        labels: {
          boxHeight: 2,
          boxWidth: 15,
          font: {
            size: 10,
          },
          // color: "rgb(255,255,255)",
        },
      },
      title: {
        display: false,
        text: "زمان پروژه ها",
        font: {
          size: 10,
        },
        // color: "rgb(255,255,255)",
      },
      tooltip: {
        callbacks: {},
      },
    },
  };
};

// Define prop types
interface LineChartProps {
  did: string;
}

// Sample data structure for the chart

// LineChart component
export function LineChart({
  chartData,
  // setValue,
  label,
  isLoading,
}: {
  // setValue: any;
  chartData: { year: string; count: number; cumulativeCount: number }[];
  isLoading: boolean;
  label: string[];
}) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Simulate data loading

  if (isLoading) {
    return (
      <div className="flex justify-center h-32 content-center items-center">
        <ClipLoader loading={loading} size={30} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }
  const transformData: ChartData<"line"> = {
    labels: chartData.map((x) => x.year),
    datasets: [
      {
        label: label[0],
        data: chartData.map((x) => x.count),
        borderColor: colors.primary,
        backgroundColor: "purple",
      },
      {
        label: label[1],
        data: chartData.map((x) => x.cumulativeCount),
        borderColor: colors.primary,
        backgroundColor: "purple",
      },
    ],
  };
  return (
    <div className="h-52">
      <Line
        options={options()}
        data={transformData}
        style={{ padding: "1%" }}
      />
    </div>
  );
}
