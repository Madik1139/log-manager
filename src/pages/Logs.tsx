import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyLogs } from "../data/data";

interface ActivityData {
    date: string;
    logins: number;
    dataAccesses: number;
    violations: number;
}

interface Metric {
    title: string;
    value: string;
    color: string;
}

const LogsPage = () => {
    const [startDate, setStartDate] = useState<string>("07/01/2024");
    const [endDate, setEndDate] = useState<string>("07/07/2024");
    const [activityData, setActivityData] = useState<ActivityData[]>([]);
    const [recentLogs, setRecentLogs] = useState(dummyLogs);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [logsPerPage] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        // Simulated data fetching
        const fetchedActivityData: ActivityData[] = [
            {
                date: "2024-07-01",
                logins: 200,
                dataAccesses: 600,
                violations: 1,
            },
            {
                date: "2024-07-03",
                logins: 300,
                dataAccesses: 900,
                violations: 0,
            },
            {
                date: "2024-07-05",
                logins: 250,
                dataAccesses: 750,
                violations: 2,
            },
            {
                date: "2024-07-07",
                logins: 400,
                dataAccesses: 1200,
                violations: 3,
            },
        ];
        setActivityData(fetchedActivityData);
        setRecentLogs(dummyLogs);
    }, []);

    const handleApplyDateRange = (): void => {
        console.log("Applying date range:", startDate, "to", endDate);
        // Here you would typically fetch new data based on the date range
    };

    // Get current logs
    const filteredLogs = recentLogs.filter(
        (log) =>
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    // Change page
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

    const metrics: Metric[] = [
        { title: "Total Logins", value: "581", color: "text-blue-600" },
        { title: "Data Accesses", value: "1,329", color: "text-green-600" },
        { title: "Compliance Violations", value: "6", color: "text-red-600" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Activity Log</h1>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setStartDate(e.target.value)
                        }
                        className="border rounded px-2 py-1"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEndDate(e.target.value)
                        }
                        className="border rounded px-2 py-1"
                    />
                    <button
                        onClick={handleApplyDateRange}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-sm font-medium text-gray-500">
                            {metric.title}
                        </h2>
                        <p className={`text-2xl font-bold ${metric.color}`}>
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">
                    System Activity Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="logins"
                            stroke="#8884d8"
                            name="Logins"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="dataAccesses"
                            stroke="#82ca9d"
                            name="Data Accesses"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="violations"
                            stroke="#ffc658"
                            name="Violations"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        Recent Activity Log
                    </h2>
                    <div className="flex space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded px-2 py-1 pl-8"
                                value={searchTerm}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <button className="flex items-center border rounded px-3 py-1 text-white bg-blue-500 hover:bg-blue-600">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </button>
                    </div>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentLogs.map((log) => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.timestamp}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {log.user}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.activity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.details}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span>
                        Page {currentPage} of{" "}
                        {Math.ceil(filteredLogs.length / logsPerPage)}
                    </span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                            currentPage ===
                            Math.ceil(filteredLogs.length / logsPerPage)
                        }
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogsPage;
