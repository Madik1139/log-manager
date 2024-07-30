import { useState } from "react";
import { EquipmentStatus } from "../../domain/entities/Types";

const EditEquipmentForm = ({ equipment, onSave, onCancel }: any) => {
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
                    <option value={EquipmentStatus.normal}>{EquipmentStatus.normal}</option>
                    <option value={EquipmentStatus.need}>{EquipmentStatus.need}</option>
                    <option value={EquipmentStatus.under}>{EquipmentStatus.under}</option>
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

export default EditEquipmentForm;