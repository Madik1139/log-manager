import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./AuthContext";
import UsersManagemenPage from "./pages/Users";
import Sidebar from "./components/SideBar";
import MyProfilePage from "./pages/Profile";
import { Menu } from "lucide-react";
import RoleManagementPage from "./pages/RoleManagement";
import ReportsAnalyticsPage from "./pages/Reports";
import EquipmentManagementPage from "./pages/EquipmentsManagement";
import SystemSettingsPage from "./pages/SystemSettings";
import LogsPage from "./pages/Logs";
import TimesheetPage from "./pages/Timesheet";
import EquipmentLogPage from "./pages/EquipmentsLogs";
import MaintenanceLogsPage from "./pages/MaintenanceLogs";
import MaintenanceManagementPage from "./pages/MaintenanceManagement";
import GroupsPage from "./pages/groups";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // Or a proper loading component
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {isLoggedIn && (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                {isLoggedIn && (
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
                        className={`p-10 ${
                            isLoggedIn ? "md:ml-64" : ""
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
                                <ProtectedRoute>
                                    <LogsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute>
                                    <UsersManagemenPage />
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
                                <ProtectedRoute>
                                    <RoleManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/reports"
                            element={
                                <ProtectedRoute>
                                    <ReportsAnalyticsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/equipments-management"
                            element={
                                <ProtectedRoute>
                                    <EquipmentManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <SystemSettingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/timesheet"
                            element={
                                <ProtectedRoute>
                                    <TimesheetPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/equipments-logs"
                            element={
                                <ProtectedRoute>
                                    <EquipmentLogPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/maintenance-logs"
                            element={
                                <ProtectedRoute>
                                    <MaintenanceLogsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/maintenance-management"
                            element={
                                <ProtectedRoute>
                                    <MaintenanceManagementPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/groups"
                            element={
                                <ProtectedRoute>
                                    <GroupsPage />
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
