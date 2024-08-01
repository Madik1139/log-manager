import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./presentation/pages/dashboard/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./presentation/pages/Login";
import { AuthProvider, useAuth } from "./application/auth/AuthContext";
import Sidebar from "./presentation/components/SideBar";
import MyProfilePage from "./presentation/pages/Profile";
import { Menu } from "lucide-react";
import RoleManagementPage from "./presentation/pages/RolesManagement";
import ReportsAnalyticsPage from "./presentation/pages/Reports";
import EquipmentManagementPage from "./presentation/pages/EquipmentsManagement";
import SystemSettingsPage from "./presentation/pages/SystemSettings";
import LogsPage from "./presentation/pages/Logs";
import TimesheetPage from "./presentation/pages/Timesheet";
import EquipmentLogPage from "./presentation/pages/EquipmentsLogs";
import MaintenanceLogsPage from "./presentation/pages/MaintenanceLogs";
import MaintenanceManagementPage from "./presentation/pages/MaintenanceManagement";
import GroupsPage from "./presentation/pages/groups";
import UsersManagementPage from "./presentation/pages/Users";
import { UsersPermissions } from "./domain/entities/Types";
import Unauthorized from "./presentation/pages/Unauthorized";
import ProjectManager from "./presentation/pages/ProjectManager";

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredPermissions?: UsersPermissions | UsersPermissions[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermissions }) => {
    const { user, isLoading, hasPermissions } = useAuth();
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthorization = async () => {
            if (user && requiredPermissions) {
                const authorized = await hasPermissions(requiredPermissions);
                setIsAuthorized(authorized);
            } else if (user) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        };
        checkAuthorization();
    }, [user, requiredPermissions, hasPermissions]);

    if (isLoading || isAuthorized === null) {
        return <div className="text-center mt-20 text-2xl font-semibold">Loading...</div>;
    }

    if (user === null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isAuthorized) {
        return <Unauthorized />;
    }

    return children;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {user && (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                {user && (
                    <div className="bg-white shadow-md pl-4 py-2 md:hidden z-30">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-auto">
                    <div
                        className={`p-4 md:p-10 ${
                            user ? "md:ml-64" : ""
                        } transition-all duration-300`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <GoogleOAuthProvider clientId="811868704583-hkjlg3jbcrcmmq693gls1r7km2m4asdu.apps.googleusercontent.com">
            <AuthProvider>
                <AuthWrapper>
                    <Routes>
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/logs"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={
                                        UsersPermissions.Logs_Management_Read
                                    }
                                >
                                    <LogsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Users_Management_Read,
                                        UsersPermissions.Users_Management_Write,
                                    ]}
                                >
                                    <UsersManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <MyProfilePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/roles"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Roles_Management_Read,
                                        UsersPermissions.Roles_Management_Write,
                                    ]}
                                >
                                    <RoleManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/reports"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={
                                        UsersPermissions.Report_Management_Read
                                    }
                                >
                                    <ReportsAnalyticsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/equipments-management"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Equipments_Management_Read,
                                        UsersPermissions.Equipments_Management_Write,
                                        UsersPermissions.Equipments_Management_InGroup_Read,
                                        UsersPermissions.Equipments_Management_InGroup_Write,
                                        UsersPermissions.Equipments_Management_InGroup_InManagement_Read,
                                        UsersPermissions.Equipments_Management_InGroup_InManagement_Write,
                                    ]}
                                >
                                    <EquipmentManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={
                                        UsersPermissions.Settings_Management_Write
                                    }
                                >
                                    <SystemSettingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/timesheet"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Timesheet_InGroup_Read,
                                        UsersPermissions.Timesheet_InGroup_Write,
                                        UsersPermissions.Timesheet_InGroup_InManagement_Read,
                                        UsersPermissions.Timesheet_InGroup_InManagement_Write,
                                    ]}
                                >
                                    <TimesheetPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/equipments-logs"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Equipments_Management_Read,
                                        UsersPermissions.Equipments_Management_Write,
                                    ]}
                                >
                                    <EquipmentLogPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/maintenance-logs"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Maintenance_Request_Read,
                                    ]}
                                >
                                    <MaintenanceLogsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/maintenance-management"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Maintenance_Request_Read,
                                        UsersPermissions.Maintenance_Request_Write,
                                        UsersPermissions.Maintenance_Request_InGroup_Read,
                                        UsersPermissions.Maintenance_Request_InGroup_Write,
                                        UsersPermissions.Maintenance_Request_InGroupIn_Management_Write,
                                    ]}
                                >
                                    <MaintenanceManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/groups"
                            element={
                                <ProtectedRoute
                                    requiredPermissions={[
                                        UsersPermissions.Groups_Management_Read,
                                        UsersPermissions.Groups_Management_Write,
                                    ]}
                                >
                                    <GroupsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/projects"
                            element={
                                <ProtectedRoute>
                                    <ProjectManager />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthWrapper>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
