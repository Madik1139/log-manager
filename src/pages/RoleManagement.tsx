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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

// const Alert: React.FC<{
//     type: "success" | "error";
//     message: string;
//     onClose: () => void;
// }> = ({ type, message, onClose }) => (
//     <div
//         className={`p-4 mb-4 rounded-md ${
//             type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//         }`}
//     >
//         <div className="flex justify-between items-center">
//             <p>{message}</p>
//             <button onClick={onClose} className="text-sm">
//                 <X size={18} />
//             </button>
//         </div>
//     </div>
// );

const RoleManagementPage = () => {
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [editingRole, setEditingRole] = useState<UserRole | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [alert, setAlert] = useState<{ type: "success" | "error"; message: string;} | null>(null);

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
                // setAlert({
                //     type: "success",
                //     message: "Role updated successfully!",
                // });
            } else {
                setRoles([...roles, editingRole]);
                // setAlert({
                //     type: "success",
                //     message: "New role added successfully!",
                // });
            }
        }
        setEditingRole(null);
        setIsModalOpen(false);
    };

    const handleDelete = (roleName: string) => {
        setRoles(roles.filter((r) => r.name !== roleName));
        // setAlert({ type: "success", message: "Role deleted successfully!" });
    };

    const handleEdit = (role: UserRole) => {
        setEditingRole({ ...role });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingRole({ name: "", permissions: [] });
        setIsModalOpen(true);
    };

    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-6">Role Management</h1>

            {/* {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )} */}

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search roles..."
                                className="border p-2 pl-8 rounded"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    >
                        <Plus size={18} className="mr-2" /> Add New Role
                    </button>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left font-semibold text-gray-600 uppercase">
                                    Role
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left font-semibold text-gray-600 uppercase">
                                    Permissions
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left font-semibold text-gray-600 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
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
                                        <p className="text-gray-700 whitespace-no-wrap">
                                            {role.permissions.join(", ")}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <button
                                            onClick={() => handleEdit(role)}
                                            className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-3"
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">
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
                        <div className="grid grid-cols-2 gap-2">
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
                                    <span>{perm}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {editingRole?.name ? "Update" : "Create"} Role
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
