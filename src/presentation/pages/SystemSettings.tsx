import { useState } from "react";
import { Save, Globe, Lock } from "lucide-react";

const SystemSettingsPage = () => {
    const [settings, setSettings] = useState({
        companyName: "ACME Corporation",
        timezone: "UTC+7",
        language: "en",
        dateFormat: "DD/MM/YYYY",
        twoFactorAuth: false,
        passwordExpiry: 90,
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = () => {
        console.log("Saving settings:", settings);
        alert("Settings saved successfully!");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">System Settings</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Globe className="mr-2" size={24} />
                        General Settings
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={settings.companyName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Timezone</label>
                            <select
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="UTC+7">UTC+7</option>
                                <option value="UTC+8">UTC+8</option>
                                <option value="UTC+9">UTC+9</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Language</label>
                            <select
                                name="language"
                                value={settings.language}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Date Format</label>
                            <select
                                name="dateFormat"
                                value={settings.dateFormat}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Lock className="mr-2" size={24} />
                        Security Settings
                    </h2>
                    <div className="space-y-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="twoFactorAuth"
                                checked={settings.twoFactorAuth}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Enable Two-Factor Authentication
                        </label>
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                    >
                        <Save className="mr-2" size={20} />
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsPage;
