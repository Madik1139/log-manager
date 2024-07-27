import React, { useEffect, useState } from "react";
import { ITimesheet } from "../../domain/entities/Types";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../infrastructure/db/DexieDB";
import { debugLog, generateUID } from "../../application/utils/utils";

const TimesheetPage = () => {
    const [selectedEquipment, setSelectedEquipment] = useState("Excavator");
    const [newEntry, setNewEntry] = useState<ITimesheet>({
        uid: "",
        activity: "",
        timeMachineStart: 0,
        timeMachineEnd: 0,
        timeOperatorStart: "",
        timeOperatorEnd: "",
        hours: "",
        production: 0,
        speed: 0,
        quality: "",
    });

    const data = useLiveQuery(() => db.timesheet.toArray(), []) || [];

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const equipmentOptions = ["Excavator", "Bulldozer", "Crane", "Loader"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEntry = async () => {
        try {
            const id = await db.timesheet.add(newEntry);
            debugLog("Timesheet added successfully with ID:", id);
            setNewEntry({
                uid: "",
                activity: "",
                timeMachineStart: 0,
                timeMachineEnd: 0,
                timeOperatorStart: "",
                timeOperatorEnd: "",
                hours: "",
                production: 0,
                speed: 0,
                quality: "",
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
                    activity: "Work",
                    timeMachineStart: 105,
                    timeMachineEnd: 107,
                    timeOperatorStart: "16:00",
                    timeOperatorEnd: "16:00",
                    hours: "00:08",
                    production: 613,
                    speed: 0,
                    quality: "--",
                });
            }
        };
        initDB();
    }, []);

    return (
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Timesheet
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3 space-y-2 md:space-y-0">
                <div>
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
                </div>
                <p className="text-lg md:text-xl font-bold text-gray-600">
                    {new Date()
                        .toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, "-")}
                </p>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full border-collapse min-w-max">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border p-2 rounded-tl-lg">
                                {selectedEquipment}
                            </th>
                            <th className="border p-2" colSpan={2}>
                                TIME MACHINE
                            </th>
                            <th
                                className="border p-2 rounded-tr-lg"
                                colSpan={6}
                            >
                                TIME OPERATOR
                            </th>
                        </tr>
                        <tr className="bg-gray-700 text-white">
                            <th className="border p-2">Activity</th>
                            <th className="border p-2">Start</th>
                            <th className="border p-2">End</th>
                            <th className="border p-2">Start</th>
                            <th className="border p-2">End</th>
                            <th className="border p-2">Hours</th>
                            <th className="border p-2">Production</th>
                            <th className="border p-2">Speed</th>
                            <th className="border p-2">Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border p-2">{row.activity}</td>
                                <td className="border p-2">
                                    {row.timeMachineStart}
                                </td>
                                <td className="border p-2">
                                    {row.timeMachineEnd}
                                </td>
                                <td className="border p-2">
                                    {row.timeOperatorStart}
                                </td>
                                <td className="border p-2">
                                    {row.timeOperatorEnd}
                                </td>
                                <td className="border p-2">{row.hours}</td>
                                <td className="border p-2">{row.production}</td>
                                <td className="border p-2">{row.speed}</td>
                                <td className="border p-2">{row.quality}</td>
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
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Add New Timesheet Entry
                        </h3>
                        <div className="space-y-4">
                            <input
                                className="w-full p-2 border rounded"
                                name="activity"
                                value={newEntry.activity}
                                onChange={handleInputChange}
                                placeholder="Activity"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="timeMachineStart"
                                type="number"
                                value={newEntry.timeMachineStart}
                                onChange={handleInputChange}
                                placeholder="Time Machine Start"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="timeMachineEnd"
                                type="number"
                                value={newEntry.timeMachineEnd}
                                onChange={handleInputChange}
                                placeholder="Time Machine End"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="timeOperatorStart"
                                value={newEntry.timeOperatorStart}
                                onChange={handleInputChange}
                                placeholder="Time Operator Start"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="timeOperatorEnd"
                                value={newEntry.timeOperatorEnd}
                                onChange={handleInputChange}
                                placeholder="Time Operator End"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="hours"
                                value={newEntry.hours}
                                onChange={handleInputChange}
                                placeholder="Hours"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="production"
                                type="number"
                                value={newEntry.production}
                                onChange={handleInputChange}
                                placeholder="Production"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="speed"
                                type="number"
                                value={newEntry.speed}
                                onChange={handleInputChange}
                                placeholder="Speed"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                name="quality"
                                value={newEntry.quality}
                                onChange={handleInputChange}
                                placeholder="Quality"
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddEntry}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Add Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimesheetPage;
