import React, { useState } from "react";
import { Search, Filter, PlusCircle, Eye, Edit, Trash, X } from "lucide-react";
import MaintenanceLogsPage from "./MaintenanceLogs";
import { useAuth } from "../AuthContext";
import { MaintenanceRequest, Role } from "../types";
import { dummyMaintenance } from "../data/data";

const MaintenanceManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [showLogs, setShowLogs] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"add" | "edit" | "view">("add");
    const [selectedRequest, setSelectedRequest] =
        useState<MaintenanceRequest | null>(null);
    const { role } = useAuth();
    const isAdmin = role === Role.Admin;
    const isOperator = role === Role.Operator;

    const [maintenanceRequests, setMaintenanceRequests] =
        useState<MaintenanceRequest[]>(dummyMaintenance);

    const filteredRequests = maintenanceRequests.filter(
        (request) =>
            request.machine.toLowerCase().includes(searchTerm.toLowerCase()) &&
            request.status.toLowerCase().includes(filterStatus.toLowerCase())
    );

    const getPriorityColor = (
        priority: MaintenanceRequest["priority"]
    ): string => {
        switch (priority.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status: MaintenanceRequest["status"]): string => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-blue-100 text-blue-800";
            case "in progress":
                return "bg-purple-100 text-purple-800";
            case "completed":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleShowManagement = (): void => setShowLogs(false);
    const handleShowLogs = (): void => setShowLogs(true);

    const handleAddRequest = (): void => {
        setModalType("add");
        setSelectedRequest({
            id: maintenanceRequests.length + 1,
            date: new Date().toISOString().split("T")[0],
            machine: "",
            issue: "",
            description: "",
            priority: "Low",
            status: "Pending",
        });
        setShowModal(true);
    };

    const handleViewDetails = (request: MaintenanceRequest): void => {
        setModalType("view");
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleEditRequest = (request: MaintenanceRequest): void => {
        setModalType("edit");
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleDeleteRequest = (id: number): void => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            setMaintenanceRequests(
                maintenanceRequests.filter((request) => request.id !== id)
            );
        }
    };

    const handleCloseModal = (): void => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const handleSaveRequest = (updatedRequest: MaintenanceRequest): void => {
        if (modalType === "add") {
            setMaintenanceRequests([...maintenanceRequests, updatedRequest]);
        } else if (modalType === "edit") {
            setMaintenanceRequests(
                maintenanceRequests.map((request) =>
                    request.id === updatedRequest.id ? updatedRequest : request
                )
            );
        }
        handleCloseModal();
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Maintenance Requests
            </h1>

            {isAdmin && (
                <div className="mb-6 font-semibold">
                    <button
                        onClick={handleShowManagement}
                        className={`w-1/2 md:w-32 py-2 rounded-l-full ${
                            showLogs
                                ? "bg-gray-300 hover:bg-blue-100"
                                : "bg-blue-500 text-white"
                        }`}
                    >
                        Management
                    </button>
                    <button
                        onClick={handleShowLogs}
                        className={`w-1/2 md:w-32 py-2 rounded-r-full ${
                            showLogs
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 hover:bg-blue-100"
                        }`}
                    >
                        Logs
                    </button>
                </div>
            )}

            {!showLogs ? (
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search machine..."
                                    className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative w-full md:w-auto">
                                <select
                                    className="w-full md:w-48 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <button
                            className="w-full md:w-auto flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={handleAddRequest}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            {isOperator ? "New Request" : "Add Maintenance"}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
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
                                        Priority
                                    </th>
                                    <th className="p-3 border-b font-semibold text-gray-600">
                                        Status
                                    </th>
                                    <th className="p-3 border-b font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="p-3 border-b">
                                            {request.date}
                                        </td>
                                        <td className="p-3 border-b">
                                            {request.machine}
                                        </td>
                                        <td className="p-3 border-b">
                                            {request.issue}
                                        </td>
                                        <td className="p-3 border-b">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                                                    request.priority
                                                )}`}
                                            >
                                                {request.priority}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white p-1 rounded"
                                                    onClick={() =>
                                                        handleViewDetails(
                                                            request
                                                        )
                                                    }
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white p-1 rounded"
                                                    onClick={() =>
                                                        handleEditRequest(
                                                            request
                                                        )
                                                    }
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
                                                    onClick={() =>
                                                        handleDeleteRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredRequests.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            No maintenance requests match the search criteria.
                        </p>
                    )}
                </div>
            ) : (
                <MaintenanceLogsPage />
            )}

            {showModal && selectedRequest && (
                <MaintenanceRequestModal
                    type={modalType}
                    request={selectedRequest}
                    onClose={handleCloseModal}
                    onSave={handleSaveRequest}
                />
            )}
        </div>
    );
};

interface MaintenanceRequestModalProps {
    type: "add" | "edit" | "view";
    request: MaintenanceRequest;
    onClose: () => void;
    onSave: (request: MaintenanceRequest) => void;
}

const MaintenanceRequestModal: React.FC<MaintenanceRequestModalProps> = ({
    type,
    request,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState<MaintenanceRequest>(request);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {type === "add"
                            ? "Add New Maintenance"
                            : type === "edit"
                            ? "Edit Maintenance"
                            : "Maintenance Details"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="machine"
                        >
                            Machine
                        </label>
                        <input
                            type="text"
                            id="machine"
                            name="machine"
                            value={formData.machine}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            readOnly={type === "view"}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="issue"
                        >
                            Issue
                        </label>
                        <input
                            type="text"
                            id="issue"
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            readOnly={type === "view"}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={3}
                            required
                            readOnly={type === "view"}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="priority"
                        >
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            disabled={type === "view"}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            disabled={type === "view"}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    {type !== "view" && (
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {type === "add"
                                    ? "Add Request"
                                    : "Save Changes"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MaintenanceManagementPage;
