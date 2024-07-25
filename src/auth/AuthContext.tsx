import React, { createContext, useState, useEffect, useContext } from "react";
import { IUser, Role } from "../models/types";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: IUser | null;
    loginUsernamePassword: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (token: string) => void;
    logout: () => void;
    updateUserRole: (role: Role) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loginUsernamePassword: async () => {},
    loginWithGoogle: () => {},
    logout: () => {},
    updateUserRole: () => {},
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUserAuth = async () => {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");
            
            if (token && userStr) {
                try {
                    // const decodedToken: any = jwtDecode(token);
                    // const currentTime = Date.now() / 1000;
                    
                    // if (decodedToken.exp > currentTime) {
                        const parsedUser = JSON.parse(userStr);
                        setUser(parsedUser);
                        // If we're on the login page, redirect to dashboard
                        if (location.pathname === "/login") {
                            navigate("/", { replace: true });
                        }
                    // } else {
                    //     // Token expired
                    //     await logout();
                    // }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    await logout();
                }
            }
            setIsLoading(false);
        };

        checkUserAuth();
    }, [navigate, location]);


    const loginUsernamePassword = async (email: string, password: string) => {
        try {
            if (email === "admin@email.com" && password === "admin") {
                const userData: IUser = {
                    name: "Admin",
                    email: email,
                    role: Role.Admin
                };
                const token = "fakeToken";
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                navigate("/users", { replace: true });
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const loginWithGoogle = (token: string) => {
        const decoded: any = jwtDecode(token);
        const userWithRole: IUser = {
            ...decoded,
            role: Role.Admin // Set default role
        };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithRole));
        setUser(userWithRole);
        navigate("/users", { replace: true });
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });
    };

    const updateUserRole = (newRole: Role) => {
        if (user) {
            const updatedUser = { ...user, role: newRole };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            if (newRole === Role.Admin) {
                navigate("/users", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUsernamePassword,
                loginWithGoogle,
                logout,
                updateUserRole,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);