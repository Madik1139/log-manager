import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { curentRole, Role } from "../../types";
import { chartData, features, metrics } from "../../data/data";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import DashboardManager from "./DashboardManager";
import DashboardDevice from "./DashboardDevice";

const Dashboard = ({ userRole = curentRole }) => {
    const [systemStatus, setSystemStatus] = useState("healthy");
    const { role } = useAuth();
    const isAdmin = role === Role.Admin;
    const isDevice = role === Role.Device;

    useEffect(() => {
        setSystemStatus("healthy");
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {isAdmin ? (
                <>
                    {/* System Status */}
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            System Status
                        </h2>
                        <div className="flex items-center">
                            <span
                                className={`text-2xl mr-2 ${
                                    systemStatus === "healthy"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {systemStatus === "healthy" ? (
                                    <CheckCircle
                                        className="text-green-500 mr-2"
                                        size={24}
                                    />
                                ) : (
                                    <AlertCircle
                                        className="text-red-500 mr-2"
                                        size={24}
                                    />
                                )}
                            </span>
                            <span className="text-lg font-semibold">
                                {systemStatus === "healthy"
                                    ? "All Systems Operational"
                                    : "Issues Detected"}
                            </span>
                        </div>
                    </div>

                    {/* Log Trend Chart */}
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Daily Log Trend
                        </h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="logs"
                                        stackId="1"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="errors"
                                        stackId="1"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {metrics[userRole as keyof typeof metrics].map(
                            (metric, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow rounded-lg p-4"
                                >
                                    <div className="flex items-center mb-2">
                                        <metric.icon
                                            className="text-blue-500 mr-2"
                                            size={20}
                                        />
                                        <h3 className="text-lg font-semibold">
                                            {metric.title}
                                        </h3>
                                    </div>
                                    <p className="text-2xl font-bold">
                                        {metric.value}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Quick Access Features */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Quick Access
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {features[userRole as keyof typeof features].map(
                                (feature, index) => (
                                    <Link
                                        to={feature.path}
                                        key={index}
                                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        <feature.icon
                                            className="mr-2"
                                            size={16}
                                        />
                                        {feature.name}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </>
            ) : isDevice ? (
                <DashboardDevice />
            ) : (
                <DashboardManager />
            )}
        </div>
    );
};

export default Dashboard;
