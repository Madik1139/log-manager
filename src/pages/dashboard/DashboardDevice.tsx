import { useState } from "react";
import { IMCUData } from "../../models/types";
import db from "../../models/DexieDB";

function DashboardDevice() {
    const [newEntry, setNewEntry] = useState<IMCUData>({
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEntry = async () => {
      try {
          const id = await db.mcuData.add(newEntry);
          console.log("Timesheet added successfully with ID:", id);
          setNewEntry({
              data1: "",
              data2: "",
              data3: "",
              data4: "",
              data5: "",
          });
      } catch (error) {
          console.error("Failed to add timesheet:", error);
      }
  };

    return (
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
                Add Data
            </h3>
            <div className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    name="data1"
                    value={newEntry.data1}
                    onChange={handleInputChange}
                    placeholder="Data 1"
                />
                <input
                    className="w-full p-2 border rounded"
                    name="data2"
                    value={newEntry.data2}
                    onChange={handleInputChange}
                    placeholder="Data 2"
                />
                <input
                    className="w-full p-2 border rounded"
                    name="data3"
                    value={newEntry.data3}
                    onChange={handleInputChange}
                    placeholder="Data 3"
                />
                <input
                    className="w-full p-2 border rounded"
                    name="data4"
                    value={newEntry.data4}
                    onChange={handleInputChange}
                    placeholder="Data 4"
                />
                <input
                    className="w-full p-2 border rounded"
                    name="data5"
                    value={newEntry.data5}
                    onChange={handleInputChange}
                    placeholder="Data 5"
                />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={handleAddEntry}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add Entry
                </button>
            </div>
        </div>
    );
}

export default DashboardDevice;
