import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, X } from "lucide-react";
import { Role } from "../types";
import { useAuth } from "../AuthContext";
import { menuItems } from "../data/data";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

const RoleSelectionPopup = ({
    isOpen,
    onClose,
    onSelectRole,
    onSignOut,
}: any) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold mb-4">Select Role</h2>
            <X size={24} onClick={onClose} className="cursor-pointer hover:text-red-700" />
            </div>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={() => onSelectRole(Role.Admin)}
                    className="px-4 py-2 bg-blue-300 text-blue-900 font-bold rounded hover:bg-blue-400"
                >
                    Admin
                </button>
                <button
                    onClick={() => onSelectRole(Role.Manager)}
                    className="px-4 py-2 bg-green-300 text-green-900 font-bold rounded hover:bg-green-400"
                >
                    Manager
                </button>
                <button
                    onClick={() => onSelectRole(Role.Operator)}
                    className="px-4 py-2 bg-yellow-200 text-yellow-900 font-bold rounded hover:bg-yellow-400"
                >
                    Operator
                </button>
                <div className="mt-6 flex items-center justify-between">
                    <hr className="w-full border-gray-700" />
                    <span className="px-2 text-gray-900 bg-white">or</span>
                    <hr className="w-full border-gray-700" />
                </div>
                <button
                    onClick={onSignOut}
                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>
        </Dialog>
    );
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user, role, setRole } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleLogout = () => {
        setIsPopupOpen(true);
    };

    const handleSelectRole = (selectedRole: Role) => {
        localStorage.setItem("role", selectedRole);
        setRole(selectedRole);
        setIsPopupOpen(false);
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <div
                className={`fixed inset-y-0 left-0 z-10 w-64 bg-white text-gray-900 h-screen p-4 flex flex-col justify-between shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                <nav>
                    <h2 className="text-2xl font-bold mb-6">Log Manager</h2>
                    {menuItems[role!].map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center w-full p-2 mb-2 rounded font-semibold ${
                                location.pathname === item.path
                                    ? "bg-blue-200"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    toggleSidebar();
                                }
                            }}
                        >
                            <item.icon className="mr-2" size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div>
                    <div className="flex items-center mb-2 p-2 bg-gray-200 rounded-lg">
                        {user?.picture ? (
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        ) : (
                            <User className="w-10 h-10 rounded-full mr-3 bg-gray-300 p-2" />
                        )}
                        <div>
                            <p className="font-semibold">
                                {user?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">
                                {role}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 mt-auto font-bold rounded-lg bg-red-200 hover:bg-red-300"
                    >
                        <LogOut className="mr-2" size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <RoleSelectionPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSelectRole={handleSelectRole}
                onSignOut={handleSignOut}
            />
        </div>
    );
};

export default Sidebar;
