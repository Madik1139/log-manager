import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus, X, Search } from "lucide-react";
import { IRole, UsersPermissions } from "../../domain/entities/Types";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../infrastructure/db/DexieDB";
import { generateUID } from "../../application/utils/utils";
import { permissionToString } from "../../application/auth/Permission";

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
    // const [roles, setRoles] = useState<Irole[]>([]);
    const [editingRole, setEditingRole] = useState<IRole | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const roles = useLiveQuery(() => db.roles.toArray(), []) || [];

    useEffect(() => {
        const initDB = async () => {
            const count = await db.roles.count();
            if (count === 0) {
                await db.roles.bulkAdd([
                    {
                        uid: generateUID(),
                        name: "admin",
                        permissions: [
                            UsersPermissions.Maintenance_Request_Read,
                            UsersPermissions.Maintenance_Request_Write,
                            UsersPermissions.Equipments_Management_Read,
                            UsersPermissions.Equipments_Management_Write,
                            UsersPermissions.Groups_Management_Read,
                            UsersPermissions.Groups_Management_Write,
                            UsersPermissions.Roles_Management_Read,
                            UsersPermissions.Roles_Management_Write,
                            UsersPermissions.Users_Management_Read,
                            UsersPermissions.Users_Management_Write,
                            UsersPermissions.Logs_Management_Read,
                            UsersPermissions.Report_Management_Read,
                            UsersPermissions.Settings_Management_Write,
                        ],
                    },
                    {
                        uid: generateUID(),
                        name: "manager",
                        permissions: [
                            UsersPermissions.Timesheet_InGroup_Read,
                            UsersPermissions.Timesheet_InGroup_Write,
                            UsersPermissions.Maintenance_Request_InGroup_Read,
                            UsersPermissions.Maintenance_Request_InGroup_Write,
                            UsersPermissions.Equipments_Management_InGroup_Read,
                            UsersPermissions.Equipments_Management_InGroup_Write,
                            UsersPermissions.Roles_Management_InGroup_Read,
                            UsersPermissions.Roles_Management_InGroup_Write,
                            UsersPermissions.Users_Management_InGroup_Read,
                            UsersPermissions.Users_Management_InGroup_Write,
                            UsersPermissions.Report_Management_Read,
                        ],
                    },
                    {
                        uid: generateUID(),
                        name: "contractor",
                        permissions: [
                            UsersPermissions.Timesheet_InGroup_InManagement_Read,
                            UsersPermissions.Timesheet_InGroup_InManagement_Write,
                            UsersPermissions.Maintenance_Request_InGroup_InManagement_Read,
                            UsersPermissions.Maintenance_Request_InGroupIn_Management_Write,
                            UsersPermissions.Equipments_Management_InGroup_InManagement_Read,
                            UsersPermissions.Equipments_Management_InGroup_InManagement_Write,
                            UsersPermissions.Roles_Management_InGroup_InManagement_Read,
                            UsersPermissions.Roles_Management_InGroup_InManagement_Write,
                            UsersPermissions.Users_Management_InGroup_InManagement_Read,
                            UsersPermissions.Users_Management_InGroup_InManagement_Write,
                        ],
                    },
                    {
                        uid: generateUID(),
                        name: "operator",
                        permissions: [
                            UsersPermissions.My_Profile_Read,
                            UsersPermissions.My_Profile_Write,
                        ],
                    },
                ]);
            }
        };
        initDB();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRole?.id) {
            await db.roles.update(editingRole.id, (obj) => {
                obj.name = editingRole.name;
                obj.permissions = editingRole.permissions;
                setIsEditing(false);
                return true; // return true to indicate that the object has been updated
            });
        } else if (editingRole) {
            await db.roles.add(editingRole);
        }
        setEditingRole(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (roleId: number) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            await db.roles.delete(roleId);
        }
    };

    const handleEdit = (role: IRole) => {
        setEditingRole({ ...role });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingRole({ uid: "", name: "", permissions: [] });
        setIsModalOpen(true);
    };

    const filteredRoles = roles.filter((role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Role Management
            </h1>

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
                                        {role.permissions.map(permissionToString).join(", ")}
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
                                                    role.id !== undefined &&
                                                    handleDelete(role.id)
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
                    {filteredRoles.length === 0 && (
                        <p className="text-center text-gray-500 text-lg mt-4">
                            No roles found
                        </p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                }}
            >
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
                            {Object.values(UsersPermissions)
                                .filter(perm => typeof perm === 'number')
                                .map((perm) => (
                                <label key={perm} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editingRole?.permissions.includes(perm as UsersPermissions)}
                                        onChange={() => {
                                            const updatedPermissions = editingRole?.permissions.includes(perm as UsersPermissions)
                                                ? editingRole.permissions.filter((p) => p !== perm)
                                                : [...(editingRole?.permissions || []), perm as UsersPermissions];
                                            setEditingRole({
                                                ...editingRole!,
                                                permissions: updatedPermissions,
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">{permissionToString(perm as UsersPermissions)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {isEditing ? "Update" : "Create"} Role
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                setIsEditing(false);
                            }}
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
