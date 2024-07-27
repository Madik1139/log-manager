import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Download } from "lucide-react";
import { debugLog } from "../../application/utils/utils";

const ReportsAnalyticsPage = () => {
    const [startDate, setStartDate] = useState("2024-07-01");
    const [endDate, setEndDate] = useState("2024-07-31");

    // Sample data for charts (unchanged)
    const machineUsageData = [
        { name: "Machine A", hours: 120 },
        { name: "Machine B", hours: 80 },
        { name: "Machine C", hours: 100 },
        { name: "Machine D", hours: 90 },
    ];

    const statusDistributionData = [
        { name: "Operational", value: 70 },
        { name: "Maintenance", value: 15 },
        { name: "Idle", value: 10 },
        { name: "Repair", value: 5 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const handleDateChange = (e: any) => {
        if (e.target.name === "startDate") {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
        // Here you would typically fetch new data based on the selected date range
        debugLog("Date range changed:", e.target.name, e.target.value);
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
                Reports & Analytics
            </h1>
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                        className="border rounded px-2 py-1 w-full sm:w-auto"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={handleDateChange}
                        className="border rounded px-2 py-1 w-full sm:w-auto"
                    />
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-full sm:w-auto">
                        Apply
                    </button>
                </div>
                <div className="flex justify-end space-x-2">
                    <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        <Download className="h-5 w-5 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Key Metrics */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                        <div className="bg-blue-100 p-3 md:p-4 rounded-md">
                            <p className="text-xs md:text-sm text-blue-600 font-medium">
                                Total Operating Hours
                            </p>
                            <p className="text-lg md:text-2xl font-bold">
                                390 hours
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 md:p-4 rounded-md">
                            <p className="text-xs md:text-sm text-green-600 font-medium">
                                Average Efficiency
                            </p>
                            <p className="text-lg md:text-2xl font-bold">85%</p>
                        </div>
                        <div className="bg-yellow-100 p-3 md:p-4 rounded-md">
                            <p className="text-xs md:text-sm text-yellow-600 font-medium">
                                Maintenance Requests
                            </p>
                            <p className="text-lg md:text-2xl font-bold">12</p>
                        </div>
                        <div className="bg-purple-100 p-3 md:p-4 rounded-md">
                            <p className="text-xs md:text-sm text-purple-600 font-medium">
                                Active Machines
                            </p>
                            <p className="text-lg md:text-2xl font-bold">
                                4 / 5
                            </p>
                        </div>
                    </div>
                </div>

                {/* Machine Usage Chart */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Machine Usage
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={machineUsageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hours" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Distribution Chart */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Status Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {statusDistributionData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Maintenance Table */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Maintenance
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 md:p-3 font-semibold">
                                        Date
                                    </th>
                                    <th className="p-2 md:p-3 font-semibold">
                                        Machine
                                    </th>
                                    <th className="p-2 md:p-3 font-semibold">
                                        Issue
                                    </th>
                                    <th className="p-2 md:p-3 font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 md:p-3">2024-07-15</td>
                                    <td className="p-2 md:p-3">Machine A</td>
                                    <td className="p-2 md:p-3">
                                        Unusual noise
                                    </td>
                                    <td className="p-2 md:p-3">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 md:p-3">2024-07-12</td>
                                    <td className="p-2 md:p-3">Machine C</td>
                                    <td className="p-2 md:p-3">
                                        Regular checkup
                                    </td>
                                    <td className="p-2 md:p-3">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                            In Progress
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 md:p-3">2024-07-10</td>
                                    <td className="p-2 md:p-3">Machine B</td>
                                    <td className="p-2 md:p-3">Oil leak</td>
                                    <td className="p-2 md:p-3">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalyticsPage;
