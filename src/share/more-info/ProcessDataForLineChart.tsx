interface Professor {
  AssociateProfessor: string; // Assuming this is a date string
  publishedAsseyDate: number[]; // Array of years
}

interface ProcessedData {
  year: number;
  count: number;
  cumulativeCount: number;
}
interface ProcessedData1 {
  year: number;
  count: number;
  // cumulativeCount: number;
}

function processData(professor: Professor): ProcessedData[] {
  // console.log("🚀 ~ processData ~ professor:", professor);
  
  const dataByYear: Record<number, number> = {};
  const startYear = new Date(professor.AssociateProfessor).getFullYear();
  
  professor.publishedAsseyDate.forEach((year) => {
    if (year >= startYear && year <= 2024) {
      dataByYear[year] = (dataByYear[year] || 0) + 1;
    }
  });

  const processedData: ProcessedData1[] = Object.keys(dataByYear)
    .sort()
    .map((year) => ({
      year: parseInt(year),
      count: dataByYear[parseInt(year)],
    }));

  // Calculate cumulative sums
  let cumulativeSum = 0;
  const cumulativeData: ProcessedData[] = processedData.map((d) => {
    cumulativeSum += d.count;
    return { ...d, cumulativeCount: cumulativeSum };
  });

  return cumulativeData;
}

export default processData;
