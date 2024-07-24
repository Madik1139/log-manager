import React, { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, X, ChevronLeft } from "lucide-react";
import { IEquipment, Role } from "../types";
import { useAuth } from "../AuthContext";
import EquipmentLogPage from "./EquipmentsLogs";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../models/DexieDB";

const EquipmentManagementPage = () => {
    // const [equipment, setEquipment] = useState(initialEquipment);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEquipment, setSelectedEquipment] =
        useState<IEquipment | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const { role } = useAuth();
    const isAdmin = role === Role.Admin;
    const [showMobileDetails, setShowMobileDetails] = useState(false);

    const equipments = useLiveQuery(() => db.equipments.toArray(), []) || [];

    const filteredEquipment = equipments?.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleSave = async (updatedEquipment: IEquipment) => {
        if (showAddModal) {
            try {
                const id = await db.equipments.add(updatedEquipment);
                console.log(`Eqipment added with id ${id}`);
                setShowAddModal(false);
            } catch (error) {
                console.error(`Failed to add equipment: ${error}`);
            }
        } else {
            if (updatedEquipment.id !== undefined) {
                try {
                    const id = await db.equipments.update(
                        updatedEquipment.id,
                        updatedEquipment
                    );
                    console.log(`Eqipment added with id ${id}`);
                    setIsEditing(false);
                } catch (error) {
                    console.error(`Failed to add equipment: ${error}`);
                }
            } else {
                console.error("Equipment id is undefined");
            }
        }
        setSelectedEquipment(updatedEquipment);
    };

    const handleDelete = async (id: number) => {
        if (
            window.confirm("Are you sure you want to delete this equipment?")
        ) {
            try {
                await db.equipments.delete(id);
                setSelectedEquipment(null);
            } catch (error) {
                console.error(`Failed to delete equipment: ${error}`);
                // TODO: Implement user-facing error message
            }
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

    useEffect(() => {
        const initDB = async () => {
            const count = await db.equipments.count();
            if (count === 0) {
                await db.equipments.add({
                    name: "Grader A",
                    type: "Heavy Machinery",
                    status: "Normal",
                    operator: "John Doe",
                    lastMaintenance: "2024-06-15",
                    duration: "11 hours",
                });
            }
        };
        initDB();
    }, []);

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
                            {filteredEquipment?.map((item) => (
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
                        </div>

                        <MobileEquipmentList
                            equipment={filteredEquipment}
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
                                                                ? handleDelete(
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
                                        <EquipmentForm
                                            equipment={selectedEquipment}
                                            onSave={handleSave}
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
                            onSave={handleSave}
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

const EquipmentDetails = ({ equipment }: any) => (
    <div>
        <p>
            <strong>Name:</strong> {equipment.name}
        </p>
        <p>
            <strong>Operator:</strong> {equipment.operator}
        </p>
        <p>
            <strong>Type:</strong> {equipment.type}
        </p>
        <p>
            <strong>Status:</strong> {equipment.status}
        </p>
        <p>
            <strong>Last Maintenance:</strong> {equipment.lastMaintenance}
        </p>
        <div className="w-full md:w-3/4 mt-4">
            <img
                src={`https://placehold.co/300x200/EEEEFF/003366?text=Pictures of ${encodeURIComponent(
                    equipment.name
                )}`}
                alt={`${equipment.name} image`}
                className="w-full h-auto rounded-lg shadow-md"
            />
        </div>
    </div>
);

const EquipmentForm = ({ equipment, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(equipment);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Operator:</label>
                <input
                    type="text"
                    name="operator"
                    value={formData.operator}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="Normal">Normal</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Need Maintenance">Need Maintenance</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Last Maintenance:</label>
                <input
                    type="date"
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Upload image:</label>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

const AddEquipmentModal = ({
    onSave,
    onClose,
}: {
    onSave: (equipment: IEquipment) => void;
    onClose: () => void;
}) => {
    const [formData, setFormData] = useState<IEquipment>({
        name: "",
        type: "",
        status: "Normal",
        operator: "",
        lastMaintenance: "",
        duration: "8 hours",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Equipment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Operator:</label>
                        <input
                            type="text"
                            name="operator"
                            value={formData.operator}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="Normal">Normal</option>
                            <option value="Under Maintenance">
                                Under Maintenance
                            </option>
                            <option value="Need Maintenance">
                                Need Maintenance
                            </option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Last Maintenance:</label>
                        <input
                            type="date"
                            name="lastMaintenance"
                            value={formData.lastMaintenance}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// New component for mobile view
const MobileEquipmentList = ({ equipment, selectedId, onSelect }: any) => (
    <div className="md:hidden bg-white p-2 mb-5 rounded">
        {equipment.map((item: any) => (
            <div
                key={item.id}
                className={`p-2 mb-2 rounded cursor-pointer bg-gray-100 ${
                    selectedId === item.id ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
                onClick={() => onSelect(item)}
            >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.type}</p>
                <p
                    className={`text-sm font-semibold ${
                        item.status === "Normal"
                            ? "text-green-600"
                            : item.status === "Need Maintenance"
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                >
                    {item.status}
                </p>
            </div>
        ))}
    </div>
);

export default EquipmentManagementPage;
