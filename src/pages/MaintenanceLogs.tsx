import { useState } from "react";
import { Search, Filter, Download, PlusCircle, X } from "lucide-react";
import { useAuth } from "../AuthContext";
import { MaintenanceRequest, Role } from "../types";
import { dummyMaintenance } from "../data/data";

const MaintenanceLogsPage = () => {
    const [maintenanceRecords, setmaintenanceRecords] =
        useState<MaintenanceRequest[]>(dummyMaintenance);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRecord, setNewRecord] = useState({
        date: "",
        machine: "",
        issue: "",
        description: "",
        priority: "",
        status: "Pending",
    });
    const { role } = useAuth();
    const isAdmin = role === Role.Admin;
    const isOperator = role === Role.Operator;

    const filteredRecords = maintenanceRecords.filter(
        (record) =>
            record.machine.toLowerCase().includes(searchTerm.toLowerCase()) &&
            record.date.includes(filterDate)
    );

    const handleAddRecord = (e: any) => {
        e.preventDefault();
        setmaintenanceRecords([
            ...maintenanceRecords,
            {
                ...newRecord,
                id: maintenanceRecords.length + 1,
                priority: newRecord.priority as "Low" | "Medium" | "High",
                status: "Pending",
            },
        ]);
        setIsModalOpen(false);
        setNewRecord({
            date: "",
            machine: "",
            issue: "",
            description: "",
            priority: "",
            status: "Pending",
        });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    return (
        <div>
            {!isAdmin && (
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Maintenance Records
                </h1>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
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
                    {isOperator ? (
                        <button
                            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            New Request
                        </button>
                    ) : (
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            <Download className="h-5 w-5 mr-2" />
                            Export Records
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
                                    Issue
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Description
                                </th>
                                <th className="p-3 border-b font-semibold text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="p-3 border-b">
                                        {record.date}
                                    </td>
                                    <td className="p-3 border-b">
                                        {record.machine}
                                    </td>
                                    <td className="p-3 border-b">
                                        {record.issue}
                                    </td>
                                    <td className="p-3 border-b">
                                        {record.description}
                                    </td>
                                    <td className="p-3 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                record.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRecords.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No maintenance records match the search criteria.
                    </p>
                )}

                <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Showing {filteredRecords.length} of{" "}
                        {maintenanceRecords.length} logs
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                New Request Maintenance
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddRecord} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={newRecord.date}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="machine"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Machine
                                </label>
                                <input
                                    type="text"
                                    id="machine"
                                    name="machine"
                                    value={newRecord.machine}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="issue"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Issue
                                </label>
                                <input
                                    type="text"
                                    id="issue"
                                    name="issue"
                                    value={newRecord.issue}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
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
                                    value={newRecord.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
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
                                    value={newRecord.priority}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="">Select priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaintenanceLogsPage;
