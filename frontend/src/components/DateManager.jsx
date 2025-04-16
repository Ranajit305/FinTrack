import React, { useContext } from "react";
import { Calendar } from "lucide-react";
import { DateContext } from "../context/DateContext";

const DateManager = () => {

  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, months, years } = useContext(DateContext);

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center sm:justify-between bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-start items-center gap-2">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateManager
