import { IRole } from "../entities/Types";

export interface RoleUseCases {
    getRoles(): Promise<IRole[]>;
    getRoleById(id: number): Promise<IRole | undefined>;
    addRole(role: IRole): Promise<number>;
    updateRole(role: IRole): Promise<void>;
    deleteRole(roleId: number): Promise<void>;
    searchRoles(searchTerm: string): Promise<IRole[]>;
}
