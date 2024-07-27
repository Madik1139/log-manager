import React, { useEffect, useState } from "react";
import { Search, Plus, Trash2, Edit, X } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../infrastructure/db/DexieDB";
import { Ivendor, VendorStatus } from "../../domain/entities/Types";
import { generateUID } from "../../application/utils/utils";

const GroupsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingVendor, setEditingVendor] = useState<Ivendor | null>(null);

    const vendors = useLiveQuery(() => db.vendors.toArray(), []) || [];

    const filteredVendors = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (vendor: Ivendor | null = null) => {
        setEditingVendor(
            vendor || { id: 0, uid: "", name: "", category: "", status: VendorStatus.Active }
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingVendor(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingVendor) {
            if (editingVendor.id) {
                await db.vendors.update(editingVendor.id, editingVendor);
            } else {
                await db.vendors.add(editingVendor);
            }
            closeModal();
        }
    };

    const handleDelete = async (vendorId: number) => {
        if (window.confirm("Are you sure you want to delete this vendor?")) {
            await db.vendors.delete(vendorId);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditingVendor((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    useEffect(() => {
        const initDB = async () => {
            const count = await db.vendors.count();
            if (count === 0) {
                await db.vendors.add({
                    uid: generateUID(),
                    name: "Vendor A",
                    category: "Electronics",
                    status: VendorStatus.Active,
                });
            }
        };
        initDB();
    }, []);

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Groups Management
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            className="pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={20}
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mt-4"
                    >
                        <Plus size={20} className="mr-2" />
                        Add New Vendor
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">
                                    Category
                                </th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map((vendor) => (
                                <tr key={vendor.id} className="border-b">
                                    <td className="py-3 px-4">{vendor.name}</td>
                                    <td className="py-3 px-4">
                                        {vendor.category}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                vendor.status === "Active"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                            }`}
                                        >
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => openModal(vendor)}
                                            className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded text-white mr-2"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                vendor.id !== undefined &&
                                                handleDelete(vendor.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 p-1 rounded text-white"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredVendors.length === 0 && (
                        <p className="text-center text-gray-500 text-lg mt-4">
                            No vendors found
                        </p>
                    )}
                </div>
            </div>

            {isModalOpen && editingVendor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {editingVendor.id
                                    ? "Edit Vendor"
                                    : "Add New Vendor"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingVendor.name}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editingVendor.category}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Status</label>
                                <select
                                    name="status"
                                    value={editingVendor.status}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                {editingVendor.id
                                    ? "Update Vendor"
                                    : "Add Vendor"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupsPage;
