import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { useAuth } from "../../application/auth/AuthContext";
import { Role } from "../../domain/entities/Types";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../infrastructure/db/DexieDB";

const EquipmentLogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const { user } = useAuth();
    const isOperator = user?.role === Role.Operator;

    const logData = useLiveQuery(() => db.equipments.toArray(), []) || [];

    const filteredLogs = logData.filter(
        (log) =>
            log.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            log.lastMaintenance.includes(filterDate)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Normal":
                return "bg-green-100 text-green-800";
            case "Needs Maintenance":
                return "bg-yellow-100 text-yellow-800";
            case "Under Repair":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Equipments Logs
            </h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search machine..."
                                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    {!isOperator && (
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            <Download className="h-5 w-5 mr-2" />
                            Download Logs
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Date
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Machine
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Duration
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Operator
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{log.lastMaintenance}</td>
                                    <td className="p-3 border-b">
                                        {log.name}
                                    </td>
                                    <td className="p-3 border-b">
                                        {log.duration}
                                    </td>
                                    <td className="p-3 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                                log.status
                                            )}`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b">
                                        {log.operator}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No logs match the search criteria.
                    </p>
                )}

                <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Showing {filteredLogs.length} of {logData.length} logs
                    </p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                            Previous
                        </button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentLogPage;
