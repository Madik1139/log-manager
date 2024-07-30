const MobileEquipmentList = ({ equipment, selectedId, onSelect }: any) => (
    <div className="md:hidden bg-white p-2 mb-5 rounded">
        {equipment?.map((item: any) => (
            <div
                key={item.id}
                className={`p-2 mb-2 rounded cursor-pointer bg-gray-100 ${
                    selectedId === item.id ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
                onClick={() => onSelect(item)}
            >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.type}</p>
                <p
                    className={`text-sm font-semibold ${
                        item.status === "Normal"
                            ? "text-green-600"
                            : item.status === "Need Maintenance"
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                >
                    {item.status}
                </p>
            </div>
        ))}
    </div>
);

export default MobileEquipmentList;