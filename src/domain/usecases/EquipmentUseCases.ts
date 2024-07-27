import { IEquipment } from '../entities/Types';

export interface EquipmentUseCases {
    getEquipments(): Promise<IEquipment[]>;
    getEquipmentById(id: number): Promise<IEquipment | undefined>;
    addEquipment(equipment: IEquipment): Promise<number>;
    updateEquipment(equipment: IEquipment): Promise<void>;
    deleteEquipment(equipmentId: number): Promise<void>;
}
