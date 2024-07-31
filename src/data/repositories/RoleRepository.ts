import { RoleUseCases } from "../../domain/usecases/RoleUseCases";
import { IRole } from "../../domain/entities/Types";
import { IndexedDBDataSource } from "../datasources/IndexedDBDataSource";

export class RoleRepository implements RoleUseCases {
    constructor(private dataSource: IndexedDBDataSource) {}

    async getRoles(): Promise<IRole[]> {
        return this.dataSource.getRoles();
    }

    async getRoleById(id: number): Promise<IRole | undefined> {
        return this.dataSource.getRoleById(id);
    }

    async addRole(role: IRole): Promise<number> {
        return this.dataSource.addRole(role);
    }

    async updateRole(role: IRole): Promise<void> {
        await this.dataSource.updateRole(role);
    }

    async deleteRole(roleId: number): Promise<void> {
        await this.dataSource.deleteRole(roleId);
    }

    async searchRoles(searchTerm: string): Promise<IRole[]> {
        return this.dataSource.searchRoles(searchTerm);
    }
}
