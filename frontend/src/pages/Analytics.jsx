import { Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext";
import DateManager from "../components/DateManager";

const Analytics = () => {
  const { transactions } = useTransactionStore();
  const { selectedMonth, selectedYear, months } = useContext(DateContext);

  const [isMobile, setIsMobile] = useState(false);

  // Set up responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    );
  });

  const categories = [...new Set(filteredTransactions.map((t) => t.category))];

  const categoryChartData = categories.map((category) => {
    const total = filteredTransactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      category,
      total,
    };
  });

  const pieChartData = categories
    .map((category) => {
      const total = filteredTransactions
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      return {
        name: category,
        value: total,
      };
    })
    .filter((item) => item.value > 0);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FF6B6B",
    "#A05195",
    "#D45087",
    "#F95D6A",
    "#FF7C43",
    "#665191",
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-80">
              Analytics
            </h1>
          </div>
        </div>

        <DateManager />

        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grouped Bar Chart - Daily Spending by Category */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Total Spending by Category (
              {months.find((m) => m.value === selectedMonth)?.name}{" "}
              {selectedYear})
            </h2>
            <div className="min-h-[300px] sm:min-h-[320px] h-[40vh] sm:h-80 pl-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryChartData}
                  margin={{
                    top: 20,
                    right: isMobile ? 15 : 30,
                    left: isMobile ? 10 : 20,
                    bottom: isMobile ? 60 : 40,
                  }}
                  barSize={isMobile ? 15 : 40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 40}
                    interval={0}
                  />
                  <YAxis
                    label={{
                      value: "Amount ($)",
                      angle: -90,
                      position: "insideLeft",
                      offset: -5,
                    }}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    width={isMobile ? 35 : 50} // ← Small width for enough tick text room
                  />

                  <Tooltip
                    formatter={(value) => [`$${value}`, "Total"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      fontSize: isMobile ? "12px" : "14px",
                      padding: isMobile ? "4px" : "8px",
                    }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    wrapperStyle={{ zIndex: 10 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{
                      fontSize: isMobile ? "12px" : "14px",
                      paddingTop: "10px",
                    }}
                    payload={categoryChartData.map((entry, index) => ({
                      value: entry.category,
                      type: "square",
                      id: `legend-${index}`,
                      color: COLORS[index % COLORS.length],
                    }))}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {categoryChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Categories */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Total Spending by Category (
              {months.find((m) => m.value === selectedMonth)?.name}{" "}
              {selectedYear})
            </h2>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? 70 : 100}
                    innerRadius={0}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      isMobile
                        ? `${(percent * 100).toFixed(0)}%`
                        : `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      fontSize: isMobile ? "12px" : "14px",
                      padding: isMobile ? "4px 8px" : "8px 12px",
                    }}
                  />
                  <Legend
                    layout={isMobile ? "horizontal" : "vertical"}
                    align={isMobile ? "center" : "right"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    iconSize={isMobile ? 8 : 10}
                    wrapperStyle={{
                      fontSize: isMobile ? "10px" : "12px",
                      padding: isMobile ? "10px 0 0 0" : "0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {filteredTransactions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Monthly Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600 font-medium">
                  Total Spending
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  $
                  {pieChartData
                    .reduce((sum, item) => sum + item.value, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Most Spent</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pieChartData.length > 0
                    ? pieChartData.reduce((max, item) =>
                        max.value > item.value ? max : item
                      ).name
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
