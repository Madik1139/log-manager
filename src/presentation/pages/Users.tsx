import { useState, useEffect } from "react";
import { UserPlus, Edit, Trash2, Search } from "lucide-react";
import { UserUseCases } from "../../domain/usecases/UserUseCases";
import { IUser, Role } from "../../domain/entities/Types";
import { useLiveQuery } from "dexie-react-hooks";
import { debugLog, generateUID, initializedDB } from "../../application/utils/utils";
import { IndexedDBDataSource } from "../../data/datasources/IndexedDBDataSource";
import { UserRepository } from "../../data/repositories/UserRepository";
import Modal from "../components/ModalUser";

const UsersManagementPage = () => {
    const [userUseCases, setUserUseCases] = useState<UserUseCases | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newUser, setNewUser] = useState<IUser>({
        uid: "",
        name: "",
        email: "",
        role: Role.Operator,
    });
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
        const initDB = async () => {
            try {
                initializedDB();
                const dataSource = new IndexedDBDataSource();
                const userRepository = new UserRepository(dataSource);
                setUserUseCases(userRepository);
                await loadUsers(userRepository);
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

    const loadUsers = async (repository: UserUseCases) => {
        try {
            const fetchedUsers = await repository.getUsers();
            if (fetchedUsers.length === 0) {
                const defaultUser: IUser = {
                    uid: generateUID(),
                    name: "Admin",
                    email: "admin@example.com",
                    role: Role.Admin,
                };
                await repository.addUser(defaultUser);
                debugLog("Default admin user created");
            }
        } catch (error) {
            console.error("Error loading users:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    const users = useLiveQuery(
        () => userUseCases?.searchUsers(debouncedSearchTerm, roleFilter),
        [userUseCases, debouncedSearchTerm, roleFilter]
    );

    const handleAddUser = async () => {
        if (!userUseCases) return;
        try {
            const userToAdd = {
                ...newUser,
                uid: generateUID(), // Ensure UID is always generated
            };
            await userUseCases.addUser(userToAdd);
            setIsAddModalOpen(false);
            setNewUser({ uid: "", name: "", email: "", role: Role.Operator });
        } catch (error: any) {
            console.error("Error adding user:", error);
            alert(`Failed to add user: ${error.message}`);
        }
    };

    const handleUpdateUser = async () => {
        if (editingUser && userUseCases) {
            try {
                await userUseCases.updateUser(editingUser);
                setIsEditModalOpen(false);
                setEditingUser(null);
            } catch (error: any) {
                console.error("Error updating user:", error);
                alert(error.message);
            }
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!userUseCases) return;
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                await userUseCases.deleteUser(userId);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleEdit = (user: IUser) => {
        setEditingUser({ ...user });
        setIsEditModalOpen(true);
    };

    debugLog("Users:", users);

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                User Management
            </h1>

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
                                <th className="border p-2 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }
                                >
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
                                                onClick={() =>
                                                    user.id !== undefined
                                                        ? handleDeleteUser(
                                                              user.id
                                                          )
                                                        : null
                                                }
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
                    {users?.length === 0 && (
                        <p className="text-center text-gray-500 text-lg mt-4">
                            No users found
                        </p>
                    )}
                </div>
            </div>

            <Modal isOpen={isAddModalOpen} title="Add New User">
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser?.name}
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
                        onClick={handleUpdateUser}
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
