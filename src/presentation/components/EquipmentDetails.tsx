const EquipmentDetails = ({ equipment }: any) => (
    <div>
        <p>
            <strong>Name :</strong> {equipment.name}
        </p>
        <p>
            <strong>Operator :</strong> {equipment.operator}
        </p>
        <p>
            <strong>Type :</strong> {equipment.type}
        </p>
        <p>
            <strong>Status :</strong> {equipment.status}
        </p>
        <p>
            <strong>Last Maintenance :</strong> {equipment.lastMaintenance}
        </p>
        <div className="w-full md:w-3/4 mt-4">
            <img
                src={`https://placehold.co/300x200/EEEEFF/003366?text=Pictures of ${encodeURIComponent(
                    equipment.name
                )}`}
                alt={`${equipment.name} image`}
                className="w-full h-auto rounded-lg shadow-md"
            />
        </div>
    </div>
);

export default EquipmentDetails;