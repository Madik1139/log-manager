import { EquipmentUseCases } from '../../domain/usecases/EquipmentUseCases';
import { EquipmentStatus, IEquipment } from '../../domain/entities/Types';
import { IndexedDBDataSource } from '../datasources/IndexedDBDataSource';

export class EquipmentRepository implements EquipmentUseCases {
    constructor(private dataSource: IndexedDBDataSource) {}

    async getEquipments(): Promise<IEquipment[]> {
        return this.dataSource.getEquipments();
    }

    async getEquipmentById(id: number): Promise<IEquipment | undefined> {
        return this.dataSource.getEquipmentById(id);
    }

    async addEquipment(equipment: IEquipment): Promise<number> {
        return this.dataSource.addEquipment(equipment);
    }

    async updateEquipment(equipment: IEquipment): Promise<void> {
        await this.dataSource.updateEquipment(equipment);
    }

    async deleteEquipment(equipmentId: number): Promise<void> {
        await this.dataSource.deleteEquipment(equipmentId);
    }

    async searchEquipments(searchTerm: string, status: EquipmentStatus | "all"): Promise<IEquipment[]> {
        return this.dataSource.searchEquipments(searchTerm, status);
    }
}
