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
import { Activity, AlertTriangle, Wrench } from "lucide-react";

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

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatCard
                            title="Total Machinery"
                            value="156"
                            icon={<Activity size={30} className="text-blue-500" />}
                        />
                        <StatCard
                            title="Active Maintenance"
                            value="23"
                            icon={<Wrench size={30} className="text-green-500" />}
                        />
                        <StatCard
                            title="Critical Issues"
                            value="3"
                            icon={<AlertTriangle size={30} className="text-red-500" />}
                        />
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

const StatCard = ({ title, value, icon }: any) => (
    <div className="bg-white rounded-lg shadow border p-6 flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </div>
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
