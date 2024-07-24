import { useState, useMemo } from "react";
import { UserPlus, Edit, Trash2, Search } from "lucide-react";
import { Role, User } from "../types";
import { dummyUsers } from "../data/data";

const Modal = ({ isOpen, title, children }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

const UsersManagementPage = () => {
    const [users, setUsers] = useState<User[]>(dummyUsers);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        role: "operator" as Role,
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<Role | "all">("all");

    const handleEdit = (user: User): void => {
        setEditingUser({ ...user });
        setIsEditModalOpen(true);
    };

    const handleSave = (): void => {
        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id ? editingUser : user
                )
            );
            setEditingUser(null);
            setIsEditModalOpen(false);
        }
    };

    const handleDelete = (userId: number): void => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    const handleAddUser = (): void => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ id: 0, name: "", email: "", role: "operator" as Role });
        setIsAddModalOpen(false);
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">User Management</h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border p-2 pl-8 rounded w-full"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value as Role | "all")
                            }
                            className="border p-2 rounded w-full md:w-auto"
                        >
                            <option value="all">All Roles</option>
                            <option value="operator">Operator</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center w-full md:w-auto"
                    >
                        <UserPlus className="mr-2 h-4 w-4" /> Add User
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Name</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-left">Role</th>
                                <th className="border p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role}</td>
                                    <td className="border p-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="bg-yellow-500 text-white p-1 rounded"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-500 text-white p-1 rounded"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isAddModalOpen} title="Add New User">
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="border p-2 rounded w-full mb-2"
                />
                <select
                    value={newUser.role}
                    onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value as Role })
                    }
                    className="border p-2 rounded w-full mb-2"
                >
                    <option value="operator">Operator</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add User
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} title="Edit User">
                <input
                    type="text"
                    placeholder="Name"
                    value={editingUser?.name || ""}
                    onChange={(e) =>
                        setEditingUser((prev) => ({
                            ...prev!,
                            name: e.target.value,
                        }))
                    }
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={editingUser?.email || ""}
                    onChange={(e) =>
                        setEditingUser((prev) => ({
                            ...prev!,
                            email: e.target.value,
                        }))
                    }
                    className="border p-2 rounded w-full mb-2"
                />
                <select
                    value={editingUser?.role || ""}
                    onChange={(e) =>
                        setEditingUser((prev) => ({
                            ...prev!,
                            role: e.target.value as Role,
                        }))
                    }
                    className="border p-2 rounded w-full mb-2"
                >
                    <option value="operator">Operator</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default UsersManagementPage;