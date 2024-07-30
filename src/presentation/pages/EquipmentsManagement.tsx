import { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    Filter,
} from "lucide-react";
import { EquipmentStatus, IEquipment, Role } from "../../domain/entities/Types";
import { useAuth } from "../../application/auth/AuthContext";
import EquipmentLogPage from "./EquipmentsLogs";
import { useLiveQuery } from "dexie-react-hooks";
import {
    debugLog,
    generateUID,
    initializedDB,
} from "../../application/utils/utils";
import { EquipmentUseCases } from "../../domain/usecases/EquipmentUseCases";
import { IndexedDBDataSource } from "../../data/datasources/IndexedDBDataSource";
import { EquipmentRepository } from "../../data/repositories/EquipmentRepository";
import MobileEquipmentList from "../components/MobileEquipmentList";
import AddEquipmentModal from "../components/AddEquipmentModal";
import EditEquipmentForm from "../components/EditEquipmentForm";
import EquipmentDetails from "../components/EquipmentDetails";

const EquipmentManagementPage = () => {
    const [equipmentUseCases, setEquipmentUseCases] = useState<EquipmentUseCases | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<EquipmentStatus | "all">( "all");
    const [selectedEquipment, setSelectedEquipment] = useState<IEquipment | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showMobileDetails, setShowMobileDetails] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const { user } = useAuth();
    const isAdmin = user?.role === Role.Admin;

    useEffect(() => {
        const initDB = async () => {
            try {
                initializedDB();
                const dataSource = new IndexedDBDataSource();
                const equipmentRepository = new EquipmentRepository(dataSource);
                setEquipmentUseCases(equipmentRepository);
                await loadEquipments(equipmentRepository);
            } catch (error) {
                console.error("Can't initializing database:", error);
            }
        };
        initDB();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const loadEquipments = async (repository: EquipmentUseCases) => {
        try {
            const fetchedEquioments = await repository.getEquipments();
            if (fetchedEquioments.length === 0) {
                const defaultEquipment: IEquipment = {
                    uid: generateUID(),
                    name: "Grader A",
                    type: "Heavy Machinery",
                    status: EquipmentStatus.normal,
                    operator: "John Doe",
                    lastMaintenance: "2024-06-15",
                    duration: "11 hours",
                };
                await repository.addEquipment(defaultEquipment);
                debugLog("Default equipment created");
            }
        } catch (error) {
            console.error("Error loading equipments:", error);
            // Handle error (e.g., show error message to equipment)
        }
    };

    const equipments = useLiveQuery(
        () =>
            equipmentUseCases?.searchEquipments(
                debouncedSearchTerm,
                statusFilter
            ),
        [equipmentUseCases, debouncedSearchTerm, statusFilter]
    );

    const handleSelectEquipment = (item: IEquipment) => {
        setSelectedEquipment(item);
        setIsEditing(false);
    };

    const handleAddNew = () => {
        setShowAddModal(true);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleAddEquipment = async (updatedEquipment: IEquipment) => {
        if (!equipmentUseCases) return;
        try {
            const equipmentToAdd = {
                ...updatedEquipment,
                uid: generateUID(), // Ensure UID is always generated
            };
            await equipmentUseCases.addEquipment(equipmentToAdd);
            debugLog(`Eqipment added with id ${equipmentToAdd.id}`);
            setShowAddModal(false);
        } catch (error: any) {
            console.error("Error adding equipment:", error);
            alert(`Failed to add equipment: ${error.message}`);
        }
    };

    const handleUpdateEquipment = async (updatedEquipment: IEquipment) => {
        if (updatedEquipment && equipmentUseCases) {
            try {
                await equipmentUseCases.updateEquipment(updatedEquipment);
                setIsEditing(false);
            } catch (error: any) {
                console.error("Error updating equipment:", error);
                alert(error.message);
            }
        }
    };

    const handleDeleteEquipment = async (equipment: number) => {
        if (!equipmentUseCases) return;
        try {
            if (window.confirm("Are you sure you want to delete this equipment?")) {
                await equipmentUseCases.deleteEquipment(equipment);
            }
        } catch (error) {
            console.error("Error deleting equipment:", error);
            // Handle error (e.g., show error message to equipment)
        }
    };

    const handleShowManagement = () => {
        setShowLogs(false);
    };

    const handleShowLogs = () => {
        setShowLogs(true);
    };

    const handleMobileSelect = (item: IEquipment) => {
        setSelectedEquipment(item);
        setIsEditing(false);
        setShowMobileDetails(true);
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Equipment Management
            </h1>

            {isAdmin && (
                <div className="mb-6 font-semibold">
                    <button
                        onClick={handleShowManagement}
                        className={`w-1/2 md:w-32 py-2 rounded-l-full ${
                            showLogs
                                ? "bg-gray-200 hover:bg-gray-300"
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
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        Logs
                    </button>
                </div>
            )}

            {!showLogs ? (
                <>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="flex-1 relative mb-2 md:mb-0 md:mr-2">
                            <input
                                type="text"
                                placeholder="Search equipment..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-8 border rounded"
                            />
                            <Search
                                className="absolute left-2 top-2.5 text-gray-400"
                                size={20}
                            />
                        </div>

                        <div className="flex-1 relative mb-2 md:mb-0 md:mr-2">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value as
                                            | EquipmentStatus
                                            | "all"
                                    )
                                }
                                className="w-full p-2 pl-8 border rounded appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value={EquipmentStatus.normal}>
                                    {EquipmentStatus.normal}
                                </option>
                                <option value={EquipmentStatus.need}>
                                    {EquipmentStatus.need}
                                </option>
                                <option value={EquipmentStatus.under}>
                                    {EquipmentStatus.under}
                                </option>
                            </select>
                            <Filter
                                className="absolute left-2 top-2.5 text-gray-400"
                                size={20}
                            />
                        </div>

                        <button
                            onClick={handleAddNew}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                        >
                            <Plus size={20} className="mr-2" /> Add New
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md md:mr-4 mb-4 md:mb-0 h-[calc(100vh-300px)] md:h-[calc(100vh-200px)] overflow-y-auto hidden md:block">
                            <h2 className="text-xl font-semibold mb-4">
                                Equipment List
                            </h2>
                            {equipments?.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-2 mb-2 rounded cursor-pointer bg-gray-100 ${
                                        selectedEquipment?.id === item.id
                                            ? "bg-gray-300"
                                            : "hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleSelectEquipment(item)}
                                >
                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {item.type}
                                    </p>
                                    <p
                                        className={`text-sm font-semibold ${
                                            item.status === "Normal"
                                                ? "text-green-600"
                                                : item.status ===
                                                  "Need Maintenance"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {item.status}
                                    </p>
                                </div>
                            ))}
                            {equipments?.length === 0 && (
                                <p className="text-center text-gray-500 text-lg mt-20">
                                    No equipment found
                                </p>
                            )}
                        </div>

                        <MobileEquipmentList
                            equipment={equipments}
                            selectedId={selectedEquipment?.id}
                            onSelect={handleMobileSelect}
                        />

                        <div
                            className={`flex-1 bg-white p-4 rounded-lg shadow-md h-[calc(100vh-300px)] md:h-[calc(100vh-200px)] overflow-y-auto ${
                                showMobileDetails ? "block" : "hidden md:block"
                            }`}
                        >
                            {selectedEquipment ? (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">
                                            {isEditing
                                                ? "Edit Equipment"
                                                : "Equipment Details"}
                                        </h2>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    setShowMobileDetails(false)
                                                }
                                                className="md:hidden mr-2 text-gray-500"
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            {!isEditing && (
                                                <div>
                                                    <button
                                                        onClick={handleEdit}
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            selectedEquipment.id !==
                                                            undefined
                                                                ? handleDeleteEquipment(
                                                                      selectedEquipment.id
                                                                  )
                                                                : null
                                                        }
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <EditEquipmentForm
                                            equipment={selectedEquipment}
                                            onSave={handleUpdateEquipment}
                                            onCancel={() => setIsEditing(false)}
                                        />
                                    ) : (
                                        <EquipmentDetails
                                            equipment={selectedEquipment}
                                        />
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center mt-10">
                                    Select an equipment to view details
                                </p>
                            )}
                        </div>
                    </div>

                    {showAddModal && (
                        <AddEquipmentModal
                            onSave={handleAddEquipment}
                            onClose={() => setShowAddModal(false)}
                        />
                    )}
                </>
            ) : (
                <EquipmentLogPage />
            )}
        </div>
    );
};

export default EquipmentManagementPage;
