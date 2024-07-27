import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../application/auth/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithGoogle, loginUsernamePassword } = useAuth();

    const handleLoginUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUsernamePassword(email, password);
    };

    const onSuccessGoogle = (credentialResponse: any) => {
        const token = credentialResponse.credential;
        loginWithGoogle(token);
    };

    const onErrorGoogle = () => {
        console.log("Login Failed");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Sign In
                </h2>

                <form onSubmit={handleLoginUsername} className="space-y-4">
                    <div className="relative">
                        <Mail
                            className="absolute top-3 left-3 text-gray-400"
                            size={20}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock
                            className="absolute top-3 left-3 text-gray-400"
                            size={20}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-gray-400"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                    >
                        <LogIn className="mr-2" size={20} />
                        Sign In
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <hr className="w-full border-gray-200" />
                    <span className="px-2 text-gray-500 bg-white">or</span>
                    <hr className="w-full border-gray-200" />
                </div>

                <div className="w-full flex items-center justify-center mt-6">
                    <GoogleLogin
                        onSuccess={onSuccessGoogle}
                        onError={onErrorGoogle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
