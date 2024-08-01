import { useState } from "react";
import { ArrowLeft, Globe, Settings } from "lucide-react";

interface Project {
    id: number;
    name: string;
}

enum subMenu {
    project = "project",
    setup = "setup",
}

const ProjectManager = () => {
    const [activeSubMenu, setActiveSubMenu] = useState(subMenu.project);
    const [, setSelectedProject] = useState<Project | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const projects: Project[] = [
        { id: 1, name: "Project A" },
        { id: 2, name: "Project B" },
        { id: 3, name: "Project C" },
        { id: 4, name: "Project D" },
        { id: 5, name: "Project E" },
        { id: 6, name: "Project F" },
        { id: 7, name: "Project G" },
        { id: 8, name: "Project H" },
        { id: 9, name: "Project I" },
        { id: 10, name: "Project J" },
    ];

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setShowDetails(true);
    };

    const handleBackClick = () => {
        setShowDetails(false);
    };

    const renderProjectList = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-4 rounded-lg shadow border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleProjectClick(project)}
                    >
                        <h3 className="text-lg font-semibold">
                            {project.name}
                        </h3>
                        <p className="text-gray-600">Click to view details</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProjectDetails = () => (
        <div className="space-y-6">
            <button
                className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
                onClick={handleBackClick}
            >
                <ArrowLeft className="mr-2" size={20} />
                Back to Projects
            </button>
            <div className="relative bg-[url(/map.png)] bg-no-repeat bg-cover h-[70vh] mb-4">
                <div className="absolute top-[55%] left-[10%] flex items-start">
                    <img src="/grader.png" alt="grader" className="w-20" />
                    <div className="w-full bg-green-500 text-center text-xs font-semibold p-2 rounded absolute bottom-full left-full ml-2">
                        <p>MOV</p>
                        <p>3,4 km/h</p>
                        <p>xxx secs</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSetup = () => (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Setup</h2>
            <form className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label
                        htmlFor="geojson"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        GeoJSON Input
                    </label>
                    <input
                        id="geojson"
                        type="file"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                    ></input>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Setup
                </button>
            </form>
        </div>
    );

    const renderContent = () => {
        if (activeSubMenu === subMenu.project) {
            return showDetails ? renderProjectDetails() : renderProjectList();
        } else if (activeSubMenu === subMenu.setup) {
            return renderSetup();
        }
    };

    return (
        <div className="bg-white p-6">
            {/* Sub Sidebar */}
            <nav className="flex gap-3 mb-4">
                <button
                    className={`flex items-center px-4 py-2 text-left rounded-md ${
                        activeSubMenu === subMenu.project
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveSubMenu(subMenu.project)}
                >
                    <Globe className="mr-2" size={20} />
                    Projects
                </button>
                <button
                    className={`flex items-center px-4 py-2 text-left rounded-md ${
                        activeSubMenu === subMenu.setup
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveSubMenu(subMenu.setup)}
                >
                    <Settings className="mr-2" size={20} />
                    Setup
                </button>
            </nav>

            {/* Main content */}
            <div className="flex-1 overflow-auto">{renderContent()}</div>
        </div>
    );
};

export default ProjectManager;
