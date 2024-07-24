import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X, Search } from "lucide-react";
import {
    adminPermissions,
    allPermissions,
    managerPermissions,
    operatorPermissions,
} from "../data/data";
import { Role } from "../types";

interface UserRole {
    name: string;
    permissions: string[];
}

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="float-right text-gray-600 hover:text-gray-800"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

const RoleManagementPage = () => {
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [editingRole, setEditingRole] = useState<UserRole | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const initialRoles: UserRole[] = [
            { name: Role.Admin, permissions: adminPermissions },
            { name: Role.Manager, permissions: managerPermissions },
            { name: Role.Operator, permissions: operatorPermissions },
        ];
        setRoles(initialRoles);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRole) {
            if (roles.some((r) => r.name === editingRole.name)) {
                setRoles(
                    roles.map((r) =>
                        r.name === editingRole.name ? editingRole : r
                    )
                );
            } else {
                setRoles([...roles, editingRole]);
            }
        }
        setEditingRole(null);
        setIsModalOpen(false);
    };

    const handleDelete = (roleName: string) => {
        setRoles(roles.filter((r) => r.name !== roleName));
    };

    const handleEdit = (role: UserRole) => {
        setEditingRole({ ...role });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingRole({ name: "", permissions: [] });
        setIsModalOpen(true);
    };

    const filteredRoles = roles.filter((role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Role Management</h1>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                    <div className="w-full sm:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search roles..."
                                className="w-full sm:w-auto border p-2 pl-8 rounded"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                    >
                        <Plus size={18} className="mr-2" /> Add New Role
                    </button>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Permissions
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoles.map((role, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }
                                >
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                                            {role.name}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-700 whitespace-normal">
                                            {role.permissions.join(", ")}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(role)}
                                                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(role.name)
                                                }
                                                className="bg-red-600 text-white p-1 rounded hover:bg-red-800"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    {editingRole?.name ? "Edit Role" : "Add New Role"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Role Name
                        </label>
                        <input
                            type="text"
                            value={editingRole?.name || ""}
                            onChange={(e) =>
                                setEditingRole({
                                    ...editingRole!,
                                    name: e.target.value,
                                })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Permissions
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {allPermissions.map((perm) => (
                                <label key={perm} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editingRole?.permissions.includes(
                                            perm
                                        )}
                                        onChange={() => {
                                            const updatedPermissions =
                                                editingRole?.permissions.includes(
                                                    perm
                                                )
                                                    ? editingRole.permissions.filter(
                                                          (p) => p !== perm
                                                      )
                                                    : [
                                                          ...(editingRole?.permissions ||
                                                              []),
                                                          perm,
                                                      ];
                                            setEditingRole({
                                                ...editingRole!,
                                                permissions: updatedPermissions,
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">{perm}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {editingRole?.name ? "Update" : "Create"} Role
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default RoleManagementPage;