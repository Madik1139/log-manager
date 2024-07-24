import React, { createContext, useState, useEffect, useContext } from "react";
import { IUser, Role } from "./types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    role: Role | null;
    user: IUser | null;
    loginUsernamePassword: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (token: string) => void;
    logout: () => void;
    checkAuth: () => boolean;
    setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isLoading: true,
    role: null,
    user: null,
    loginUsernamePassword: async () => {},
    loginWithGoogle: () => {},
    logout: () => {},
    checkAuth: () => false,
    setRole: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState<Role | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    const checkAuth = () => {
        const userStr = localStorage.getItem("user");
        const roleStr = localStorage.getItem("role");
        const isAuth = !!userStr;
        setIsLoggedIn(isAuth);
        if (isAuth && userStr) {
            const userData = JSON.parse(userStr);
            setUser(userData);
            setRole(roleStr as Role || Role.Admin);
        } else {
            setUser(null);
            setRole(null);
        }
        setIsLoading(false);
        return isAuth;
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const loginUsernamePassword = async (email: string, password: string) => {
        try {
            console.log("Login with username/password:", email, password);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const loginWithGoogle = (token: string) => {
        const decoded: any = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("role", Role.Admin); // Set default role
        setUser(decoded);
        setIsLoggedIn(true);
        setRole(Role.Admin);
        navigate("/users", { replace: true });
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUser(null);
        setRole(null);
        navigate("/login");
    };

    const updateRole = (newRole: Role) => {
        localStorage.setItem("role", newRole);
        setRole(newRole);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                role,
                user,
                loginUsernamePassword,
                loginWithGoogle,
                logout,
                checkAuth,
                setRole: updateRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);