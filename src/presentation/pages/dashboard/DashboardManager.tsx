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
} from "recharts";

const data = [
    { name: "Jan", usage: 4000, maintenance: 2400 },
    { name: "Feb", usage: 3000, maintenance: 1398 },
    { name: "Mar", usage: 2000, maintenance: 9800 },
    { name: "Apr", usage: 2780, maintenance: 3908 },
    { name: "May", usage: 1890, maintenance: 4800 },
    { name: "Jun", usage: 2390, maintenance: 3800 },
];

const DashboardManager = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const totalDistance = 4;
    const rSegments = [3.5, 5, 4, 4];
    const chartData = [
        { name: "Today", working: 60, moving: 20, idle: 15, stop: 5 },
        { name: "Weekly", working: 55, moving: 25, idle: 15, stop: 5 },
        { name: "Monthly", working: 50, moving: 30, idle: 15, stop: 5 },
    ];

    const renderBar = (segments: any[], label: string) => (
        <div className="w-full flex items-center gap-3">
            <div className="w-full flex">
                {segments.map((segment: number, index: number) => (
                    <div
                        key={index}
                        className="h-6 bg-yellow-400 border-r border-black last:border-r-0"
                        style={{ width: `${(segment / totalDistance) * 100}%` }}
                    ></div>
                ))}
            </div>
            <div className="text-xs md:text-2xl font-semibold">{label}</div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Equipment Status
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <StatusCard
                                            image="/grader.png"
                                            title="Total Grader"
                                            value="24/26"
                                        />
                                        <StatusCard
                                            image="/compactor.png"
                                            title="Total Compactor"
                                            value="24/26"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Connectivity Overview
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        <StatItem
                                            label="With GPS"
                                            value="26"
                                            color="bg-green-100 text-green-800"
                                        />
                                        <StatItem
                                            label="Connected SMS"
                                            value="10"
                                            color="bg-blue-100 text-blue-800"
                                        />
                                        <StatItem
                                            label="Online 4G"
                                            value="12"
                                            color="bg-purple-100 text-purple-800"
                                        />
                                        <StatItem
                                            label="On Maintenance"
                                            value="4"
                                            color="bg-yellow-100 text-yellow-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                                Grader Progress
                            </h3>
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="/grader.png"
                                    alt="grader image"
                                    className="w-20 h-auto mb-2"
                                />
                                <div className="w-full">
                                    <div className="mb-3">
                                        {renderBar(
                                            new Array(totalDistance).fill(1),
                                            "P"
                                        )}
                                    </div>
                                    <div>{renderBar(rSegments, "R")}</div>
                                </div>
                            </div>

                            <div className="h-64 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        layout="vertical"
                                        stackOffset="expand"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip
                                            formatter={(value, name) => [
                                                `${value}%`,
                                                name && typeof name === "string"
                                                    ? name
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      name.slice(1)
                                                    : "",
                                            ]}
                                            labelFormatter={(label) =>
                                                `${label} Status`
                                            }
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="working"
                                            stackId="a"
                                            fill="#10B981"
                                            name="Working"
                                        />
                                        <Bar
                                            dataKey="moving"
                                            stackId="a"
                                            fill="#F59E0B"
                                            name="Moving"
                                        />
                                        <Bar
                                            dataKey="idle"
                                            stackId="a"
                                            fill="#FBBF24"
                                            name="Idle"
                                        />
                                        <Bar
                                            dataKey="stop"
                                            stackId="a"
                                            fill="#EF4444"
                                            name="Stop"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                                Compactor Progress
                            </h3>
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="/compactor.png"
                                    alt="compactor image"
                                    className="w-20 h-auto mb-2"
                                />
                                <div className="w-full">
                                    <div className="mb-3">
                                        {renderBar(
                                            new Array(totalDistance).fill(1),
                                            "P"
                                        )}
                                    </div>
                                    <div>{renderBar(rSegments, "R")}</div>
                                </div>
                            </div>

                            <div className="h-64 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        layout="vertical"
                                        stackOffset="expand"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip
                                            formatter={(value, name) => [
                                                `${value}%`,
                                                name && typeof name === "string"
                                                    ? name
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      name.slice(1)
                                                    : "",
                                            ]}
                                            labelFormatter={(label) =>
                                                `${label} Status`
                                            }
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="working"
                                            stackId="a"
                                            fill="#10B981"
                                            name="Working"
                                        />
                                        <Bar
                                            dataKey="moving"
                                            stackId="a"
                                            fill="#F59E0B"
                                            name="Moving"
                                        />
                                        <Bar
                                            dataKey="idle"
                                            stackId="a"
                                            fill="#FBBF24"
                                            name="Idle"
                                        />
                                        <Bar
                                            dataKey="stop"
                                            stackId="a"
                                            fill="#EF4444"
                                            name="Stop"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );
            case "logs":
                return <LogTable />;
            case "maintenance":
                return <MaintenanceForm />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <nav className="flex flex-wrap gap-3">
                    <TabButton
                        active={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                    >
                        Overview
                    </TabButton>
                    <TabButton
                        active={activeTab === "logs"}
                        onClick={() => setActiveTab("logs")}
                    >
                        View Logs
                    </TabButton>
                    <TabButton
                        active={activeTab === "maintenance"}
                        onClick={() => setActiveTab("maintenance")}
                    >
                        Maintenance
                    </TabButton>
                </nav>
                <hr className="border-gray-300 my-5" />
                {renderContent()}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Machinery Usage vs Maintenance
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="usage"
                            fill="#3b82f6"
                            name="Usage Hours"
                        />
                        <Bar
                            dataKey="maintenance"
                            fill="#10b981"
                            name="Maintenance Hours"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const StatusCard = ({ image, title, value }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
            <img
                src={image}
                alt={title}
                className="w-16 md:w-24 h-auto object-contain"
            />
        </div>
        <div>
            <h4 className="text-sm md:text-base font-medium text-gray-500">
                {title}
            </h4>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const StatItem = ({ label, value, color }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}
        >
            {value}
        </span>
    </div>
);

const TabButton = ({ children, active, onClick }: any) => (
    <button
        className={`px-4 py-2 rounded-md ${
            active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={onClick}
    >
        {children}
    </button>
);

const LogTable = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Machine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2023-07-19</td>
                    <td className="px-6 py-4 whitespace-nowrap">Machine A</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        Routine Check
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                        </span>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2023-07-18</td>
                    <td className="px-6 py-4 whitespace-nowrap">Machine B</td>
                    <td className="px-6 py-4 whitespace-nowrap">Oil Change</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            In Progress
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

const MaintenanceForm = () => (
    <form className="space-y-4">
        <div>
            <label
                htmlFor="machine"
                className="block text-sm font-medium text-gray-700"
            >
                Machine
            </label>
            <select
                id="machine"
                name="machine"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option>Machine A</option>
                <option>Machine B</option>
                <option>Machine C</option>
            </select>
        </div>
        <div>
            <label
                htmlFor="issue"
                className="block text-sm font-medium text-gray-700"
            >
                Issue
            </label>
            <input
                id="issue"
                name="issue"
                type="text"
                className="mt-1 block p-2 w-full sm:text-sm border rounded-md"
            ></input>
        </div>
        <div>
            <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
            >
                Description
            </label>
            <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block p-2 w-full sm:text-sm border rounded-md"
            ></textarea>
        </div>
        <div>
            <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
            >
                Priority
            </label>
            <select
                id="priority"
                name="priority"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
        </div>
        <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Submit Maintenance Request
        </button>
    </form>
);

export default DashboardManager;
