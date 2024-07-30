import { X } from "lucide-react";
import { EquipmentStatus, IEquipment } from "../../domain/entities/Types";
import { useState } from "react";

const AddEquipmentModal = ({
    onSave,
    onClose,
}: {
    onSave: (equipment: IEquipment) => void;
    onClose: () => void;
}) => {
    const [formData, setFormData] = useState<IEquipment>({
        uid: "",
        name: "",
        type: "",
        status: EquipmentStatus.normal,
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

export default AddEquipmentModal;