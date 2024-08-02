import { useMemo, useState } from "react";
import { IProject } from "../../domain/entities/Types";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";

type ProjectListProps = {
    projects: IProject[];
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const [expandedSegments, setExpandedSegments] = useState<
        Record<string, boolean>
    >(() => {
        return projects.reduce((acc, project) => {
            Object.keys(project.timesheet).forEach((segment) => {
                acc[`${project.id}-${segment}`] = true;
            });
            return acc;
        }, {} as Record<string, boolean>);
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchFilter, setSearchFilter] = useState("segment");
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [totalSegments, setTotalSegments] = useState(0);

    const filteredProjects = useMemo(() => {
        let segmentCount = 0;
        const filtered = projects
            .map((project) => {
                const filteredTimesheet = Object.entries(
                    project.timesheet
                ).reduce((acc, [segmentKey, segmentData]) => {
                    const matchesSearch =
                        (searchFilter === "segment" &&
                            segmentData.segment
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())) ||
                        (searchFilter === "equipment" &&
                            (segmentData.grader
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                                segmentData.compactor
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()))) ||
                        (searchFilter === "contractor" &&
                            segmentData.contractorId
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()));

                    const matchesStatus =
                        statusFilter === "all" ||
                        segmentData.status === statusFilter;

                    if (matchesSearch && matchesStatus) {
                        segmentCount++;
                        acc[segmentKey] = segmentData;
                    }
                    return acc;
                }, {} as typeof project.timesheet);

                return {
                    ...project,
                    timesheet: filteredTimesheet,
                };
            })
            .filter((project) => Object.keys(project.timesheet).length > 0);

        setTotalSegments(segmentCount);
        return filtered;
    }, [projects, searchTerm, statusFilter, searchFilter]);

    const toggleSegment = (projectId: string, segment: string) => {
        const key = `${projectId}-${segment}`;
        setExpandedSegments((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const progressBar = (equipment: string, equipId: string) => {
        const totalSegments = 4; // Number of segments
        const segmentLength = 4; // Length of each segment in km
        const totalLength = totalSegments * segmentLength;
        const pSegments = new Array(totalSegments).fill(segmentLength);
        const rSegments = [3.5, 5, 2, 5.5];
        const chartData = [
            { name: "Today", working: 40, moving: 25, idle: 20, stop: 15 },
            { name: "Weekly", working: 35, moving: 30, idle: 25, stop: 10 },
            { name: "Monthly", working: 45, moving: 20, idle: 25, stop: 10 },
        ];
        const data = [
            { name: "Day 1", usage: 4000, maintenance: 2400 },
            { name: "Day 2", usage: 3000, maintenance: 1398 },
            { name: "Mar", usage: 2000, maintenance: 9800 },
            { name: "Apr", usage: 2780, maintenance: 3908 },
            { name: "May", usage: 1890, maintenance: 4800 },
            { name: "Jun", usage: 2390, maintenance: 3800 },
        ];

        const customizedLabel = ({ x, y, width, height, value }: any) => {
            const fontSize = Math.min(width / 3.5, height / 1.5);
            return (
                <g>
                    <text
                        x={x + width / 2}
                        y={y + height / 2}
                        fill="#2b2b2b"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={fontSize}
                        fontWeight={650}
                    >
                        {value < 20 ? "" : value}
                    </text>
                </g>
            );
        };

        const CustomTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
                return (
                    <div
                        className="custom-tooltip"
                        style={{
                            backgroundColor: "#fff",
                            padding: "10px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <p className="label">{`${label}`}</p>
                        {payload.map(({ entry, index }: any) => (
                            <p
                                key={`item-${index}`}
                                style={{ color: entry.color }}
                            >
                                {`${entry.name}: ${entry.value}`}
                            </p>
                        ))}
                    </div>
                );
            }
            return null;
        };

        const timesheetBar = (segments: number[], label: string) => (
            <div className="w-full flex items-center gap-3">
                <div className="w-full flex">
                    {segments.map((segment: number, index: number) => (
                        <div
                            key={index}
                            className="h-3 bg-yellow-400 border-r-2 border-black last:border-r-0"
                            style={{
                                width: `${(segment / totalLength) * 100}%`,
                            }}
                        ></div>
                    ))}
                </div>
                <div className="text-xs md:text-xl font-semibold">{label}</div>
            </div>
        );

        return (
            <div className="p-4 rounded-lg grid grid-cols-5 gap-5 items-end">
                <div className="col-span-4">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                        {equipment} - {equipId}
                    </h3>
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src={
                                equipment === "grader"
                                    ? "/grader.png"
                                    : "/compactor.png"
                            }
                            alt="image"
                            className="w-20 h-auto mb-2"
                        />
                        <div className="w-full">
                            <div className="mb-3">
                                {timesheetBar(pSegments, "P")}
                            </div>
                            <div>{timesheetBar(rSegments, "R")}</div>
                        </div>
                    </div>
                </div>
                <div className="h-32">
                    <ResponsiveContainer width="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis hide />

                            <Bar dataKey="working" stackId="a" fill="#4caf50">
                                <LabelList
                                    dataKey="working"
                                    content={customizedLabel}
                                />
                            </Bar>
                            <Bar dataKey="moving" stackId="a" fill="#ffa726">
                                <LabelList
                                    dataKey="moving"
                                    content={customizedLabel}
                                />
                            </Bar>
                            <Bar dataKey="idle" stackId="a" fill="#ffeb3b">
                                <LabelList
                                    dataKey="idle"
                                    content={customizedLabel}
                                />
                            </Bar>
                            <Bar dataKey="stop" stackId="a" fill="#ef5350">
                                <LabelList
                                    dataKey="stop"
                                    content={customizedLabel}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* <ResponsiveContainer width="100%" height={300}> */}
                    {/* <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                         {/* <Bar
                            dataKey="usage"
                            fill="#3b82f6"
                            name="Usage Hours"
                        />
                        <Bar
                            dataKey="maintenance"
                            fill="#10b981"
                            name="Maintenance Hours"
                        />
                    </BarChart>
                </ResponsiveContainer> */}
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    RAPP Project List
                </h2>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </button>
            </div>

            {isFilterOpen && (
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <div className="flex flex-wrap gap-5 items-center">
                        <div className="flex gap-5">
                            <div className="relative col-span-2">
                                <input
                                    type="text"
                                    placeholder={`Search by ${searchFilter}`}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            <div>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchFilter}
                                    onChange={(e) =>
                                        setSearchFilter(e.target.value)
                                    }
                                >
                                    <option value="segment">Segment Name</option>
                                    <option value="equipment">Equipment Name</option>
                                    <option value="contractor">
                                        Contractor Name
                                    </option>
                                    <option value="">Segment Progress</option>
                                    <option value="">Equipment Maintenance</option>
                                    <option value="">Equipment Working</option>
                                </select>
                            </div>
                        </div>
                        {/* <div className="relative">
                            <select
                                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="all">Segment Status</option>
                                <option value="in progress">In Progress</option>
                                <option value="finish">Finished</option>
                            </select>
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <div>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // value={statusFilter}
                                // onChange={(e) =>
                                //     setStatusFilter(e.target.value)
                                // }
                            >
                                <option value="all">Equipment Status</option>
                                <option value="in progress">Maintenance</option>
                                <option value="finish">Working</option>
                            </select>
                        </div> */}
                    <div className=" flex gap-3 items-center">
                        <div>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="date"
                                name=""
                                id=""
                            />
                        </div>
                        <div>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="date"
                                name=""
                                id=""
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-8 py-2 rounded-md">
                            Aplly
                        </button>
                    </div>
                    </div>

                </div>
            )}

            <div className="text-sm text-gray-500 mb-2">
                Showing {totalSegments} of{" "}
                {projects.reduce(
                    (acc, project) =>
                        acc + Object.keys(project.timesheet).length,
                    0
                )}{" "}
                segments
            </div>
            {filteredProjects.map((project) => (
                <div
                    key={project.id}
                    className="border rounded-lg shadow-sm mb-2"
                >
                    <div>
                        {/* Displaying segment list */}
                        {Object.entries(project.timesheet).map(
                            ([segment, data]) => (
                                <div key={segment}>
                                    <div
                                        className="bg-gray-100 hover:bg-gray-200/70 p-2 pl-6 pr-4 mb-1 flex justify-between items-center cursor-pointer"
                                        onClick={() =>
                                            toggleSegment(project.id, segment)
                                        }
                                    >
                                        <span className="text-xl">
                                            {data.segment} - {data.contractorId}
                                        </span>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-4">
                                                {data.status}
                                            </span>
                                            <button className="p-1 rounded-full hover:bg-gray-200">
                                                {expandedSegments[
                                                    `${project.id}-${segment}`
                                                ] ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Displaying progress graph */}
                                    {expandedSegments[
                                        `${project.id}-${segment}`
                                    ] && (
                                        <div className="mt-4">
                                            {Object.entries(
                                                project.equipments
                                            ).map(([equipment, equipId]) =>
                                                progressBar(equipment, equipId)
                                            )}
                                        </div>
                                    )}
                                    
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
