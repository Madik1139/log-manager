import { dummyProjects } from "../../../data/data";
import ProjectList from "../../components/ProjectList";

const StatusCard = ({ image, title, value }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
            <img
                src={image}
                alt={title}
                className="w-16 md:w-24 h-auto object-contain"
            />
        </div>
        <div>
            <h4 className="text-sm md:text-base font-medium text-gray-500">
                {title}
            </h4>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);



const DashboardManager = () => {
    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Equipment Status
                            </h3>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <StatusCard
                                    image="/grader.png"
                                    title="Total Grader"
                                    value="24/26"
                                />
                                <StatusCard
                                    image="/compactor.png"
                                    title="Total Compactor"
                                    value="24/26"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 bg-white rounded-lg shadow-md border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Connectivity Overview
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:gap-4 p-4">
                            <div className="bg-blue-100 p-3 md:p-4 rounded-md">
                                <p className="text-xs md:text-xl text-blue-600 font-medium">
                                    With GPS
                                </p>
                                <p className="text-lg md:text-2xl font-bold">
                                    26
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 md:p-4 rounded-md">
                                <p className="text-xs md:text-xl text-green-600 font-medium">
                                    Connected SMS
                                </p>
                                <p className="text-lg md:text-2xl font-bold">
                                    10
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-3 md:p-4 rounded-md">
                                <p className="text-xs md:text-xl text-yellow-600 font-medium">
                                    Online 4G
                                </p>
                                <p className="text-lg md:text-2xl font-bold">
                                    12
                                </p>
                            </div>
                            <div className="bg-purple-100 p-3 md:p-4 rounded-md">
                                <p className="text-xs md:text-xl text-purple-600 font-medium">
                                    On Maintenance
                                </p>
                                <p className="text-lg md:text-2xl font-bold">
                                    4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <ProjectList projects={dummyProjects} />
                </div>
            </div>
        </div>
    );
};

export default DashboardManager;
