import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Camera } from "lucide-react";

const MyProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        location: "Bandung, Indonesia",
        picture: "/api/placeholder/150/150",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    picture: reader.result ? String(reader.result) : "",
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically send the updated profile to a server
    };

    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
                <div className="md:flex md:items-center">
                    <div className="md:shrink-0 m-3 relative">
                        <img
                            className="h-48 w-48 rounded-full object-cover mx-auto"
                            src={user.picture}
                            alt="Profile picture"
                        />
                        {isEditing && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="h-12 w-12 text-white" />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="p-8 flex-grow">
                        <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">
                            My Profile
                        </div>
                        {isEditing ? (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4 space-y-4"
                            >
                                <input
                                    className="w-full p-2 border rounded"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                                <input
                                    className="w-full p-2 border rounded"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                                <input
                                    className="w-full p-2 border rounded"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                />
                                <input
                                    className="w-full p-2 border rounded"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleInputChange}
                                    placeholder="Location"
                                />
                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h1 className="mt-2 text-2xl font-bold text-gray-900">
                                    {user.name}
                                </h1>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>{profile.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>{profile.location}</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
