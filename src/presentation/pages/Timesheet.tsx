import React, { useEffect, useState } from "react";
import { ITimesheet, TimesheetStatus } from "../../domain/entities/Types";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../infrastructure/db/DexieDB";
import { debugLog, generateUID } from "../../application/utils/utils";

const TimesheetPage = () => {
    // const [selectedEquipment, setSelectedEquipment] = useState("Excavator");
    const [newEntry, setNewEntry] = useState<ITimesheet>({
        uid: "",
        contractor: "",
        eqId: "",
        date: new Date(),
        hmStart: 0,
        hmEnd: 0,
        gps: "",
        blade: "",
        status: "" as TimesheetStatus,
    });

    const data = useLiveQuery(() => db.timesheet.toArray(), []) || [];

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    // const equipmentOptions = ["Excavator", "Bulldozer", "Crane", "Loader"];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({
            ...prev,
            [name]: name === "date" ? new Date(value) : value,
        }));
    };

    const handleAddEntry = async () => {
        try {
            const id = await db.timesheet.add(newEntry);
            debugLog("Timesheet added successfully with ID:", id);
            setNewEntry({
                uid: "",
                contractor: "",
                eqId: "",
                date: new Date(),
                hmStart: 0,
                hmEnd: 0,
                gps: "",
                blade: "",
                status: "" as TimesheetStatus,
            });
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to add timesheet:", error);
        }
    };

    useEffect(() => {
        const initDB = async () => {
            const count = await db.timesheet.count();
            if (count === 0) {
                await db.timesheet.add({
                    uid: generateUID(),
                    contractor: "Contractor A",
                    eqId: "MG1",
                    date: new Date("2024-07-30"),
                    hmStart: 325,
                    hmEnd: 325,
                    gps: "yes",
                    blade: "down",
                    status: TimesheetStatus.Working,
                });
            }
        };
        initDB();
    }, []);

    const getStatusColor = (status: string): string => {
        switch (status) {
            case TimesheetStatus.Working:
                return "bg-green-100 text-green-800";
            case TimesheetStatus.Moving:
                return "bg-orange-100 text-orange-800";
            case TimesheetStatus.Idle:
                return "bg-yellow-100 text-yellow-800";
            case TimesheetStatus.Stop:
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Timesheet
            </h2>
            {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3 space-y-2 md:space-y-0"> */}
            {/* <div>
                    <select
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                        className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                    >
                        {equipmentOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div> */}
            <p className="text-right text-lg md:text-xl font-bold text-gray-600 mb-2">
                {new Date()
                    .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    .replace(/\//g, "-")}
            </p>
            {/* </div> */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full border-collapse min-w-max">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="border p-2">Contractor</th>
                            <th className="border p-2">Eq Id</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">HM Start</th>
                            <th className="border p-2">HM End</th>
                            <th className="border p-2">GPS</th>
                            <th className="border p-2">Blade</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                <td className="border p-2">{row.contractor}</td>
                                <td className="border p-2">{row.eqId}</td>
                                <td className="border p-2">
                                    {row.date.toLocaleDateString("id-ID")}
                                </td>
                                <td className="border p-2">{row.hmStart}</td>
                                <td className="border p-2">{row.hmEnd}</td>
                                <td className="border p-2">{row.gps}</td>
                                <td className="border p-2">{row.blade}</td>
                                <td className="border p-2"><span className={`px-2 py-1 rounded-full ${getStatusColor(row.status)}`}>{row.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto"
                >
                    Add Entry
                </button>
            </div>
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleAddEntry} className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Add New Timesheet Entry
                        </h3>
                        <div className="space-y-4">
                            <input
                                className="w-full p-2 border rounded"
                                name="contractor"
                                value={newEntry.contractor}
                                onChange={handleInputChange}
                                placeholder="Contractor"
                                required
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="eqId"
                                value={newEntry.eqId}
                                onChange={handleInputChange}
                                placeholder="Equipment Id"
                                required
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="date"
                                type="date"
                                value={
                                    newEntry.date.toISOString().split("T")[0]
                                }
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="hmStart"
                                type="number"
                                value={newEntry.hmStart}
                                onChange={handleInputChange}
                                placeholder="HM Start"
                                required
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="hmEnd"
                                type="number"
                                value={newEntry.hmEnd}
                                onChange={handleInputChange}
                                placeholder="HM End"
                                required
                            />
                            <select
                                className="w-full p-2 border rounded"
                                name="gps"
                                value={newEntry.gps}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select GPS</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <select
                                className="w-full p-2 border rounded"
                                name="blade"
                                value={newEntry.blade}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Blade</option>
                                <option value="Up">Up</option>
                                <option value="Down">Down</option>
                            </select>
                            <select
                                className="w-full p-2 border rounded"
                                name="status"
                                value={newEntry.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value={TimesheetStatus.Working}>
                                    {TimesheetStatus.Working}
                                </option>
                                <option value={TimesheetStatus.Moving}>
                                    {TimesheetStatus.Moving}
                                </option>
                                <option value={TimesheetStatus.Idle}>
                                    {TimesheetStatus.Idle}
                                </option>
                                <option value={TimesheetStatus.Stop}>
                                    {TimesheetStatus.Stop}
                                </option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Add Entry
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TimesheetPage;
