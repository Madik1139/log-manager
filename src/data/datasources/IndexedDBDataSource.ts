import db from "../../infrastructure/db/DexieDB";
import { IUser, IEquipment, Role, EquipmentStatus, IRole } from "../../domain/entities/Types";

export class IndexedDBDataSource {
    async getUsers(): Promise<IUser[]> {
        return db.users.toArray();
    }

    async getUserById(id: number): Promise<IUser | undefined> {
        return db.users.get(id);
    }

    async addUser(user: IUser): Promise<number> {
        return db.users.add(user);
    }

    async updateUser(user: IUser): Promise<void> {
        if (user.id) {
            await db.users.update(user.id, user);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        await db.users.delete(userId);
    }

    async searchUsers(searchTerm: string, role: Role | 'all'): Promise<IUser[]> {
        if (searchTerm === "" && role === "all") {
            return db.users.toArray();
        } else if (searchTerm === "") {
            return db.users.where("role").equals(role).toArray();
        } else if (role === "all") {
            return db.users
                .where("name")
                .startsWithIgnoreCase(searchTerm)
                .or("email")
                .startsWithIgnoreCase(searchTerm)
                .toArray();
        } else {
            return db.users
                .where("[role+name]")
                .between([role, searchTerm], [role, searchTerm + '\uffff'])
                .or("[role+email]")
                .between([role, searchTerm], [role, searchTerm + '\uffff'])
                .toArray();
        }
    }

    // Equipments
    async getEquipments(): Promise<IEquipment[]> {
        return db.equipments.toArray();
    }

    async getEquipmentById(id: number): Promise<IEquipment | undefined> {
        return db.equipments.get(id);
    }

    async addEquipment(equipment: IEquipment): Promise<number> {
        return db.equipments.add(equipment);
    }

    async updateEquipment(equipment: IEquipment): Promise<void> {
        if (equipment.id) {
            await db.equipments.update(equipment.id, equipment);
        }
    }

    async deleteEquipment(equipmentId: number): Promise<void> {
        await db.equipments.delete(equipmentId);
    }

    async searchEquipments(searchTerm: string, status: EquipmentStatus | "all"): Promise<IEquipment[]> {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
    
        if (searchTerm === "" && status === "all") {
            return db.equipments.toArray();
        } else if (searchTerm === "") {
            return db.equipments.where("status").equals(status).toArray();
        } else {
            let query = db.equipments.where("name").startsWithIgnoreCase(lowercaseSearchTerm)
                .or("operator").startsWithIgnoreCase(lowercaseSearchTerm);
    
            if (status !== "all") {
                query = query.and((item) => item.status === status);
            }
    
            return query.toArray();
        }
    }    

    //Roles
    async getRoles(): Promise<IRole[]> {
        return db.roles.toArray();
    }

    async getRoleById(id: number): Promise<IRole | undefined> {
        return db.roles.get(id);
    }

    async addRole(role: IRole): Promise<number> {
        return db.roles.add(role);
    }

    async updateRole(role: IRole): Promise<void> {
        if (role.id) {
            await db.roles.update(role.id, (obj) => {
                obj.name = role.name;
                obj.permissions = role.permissions;
                return true;
            });
        }
    }

    async deleteRole(roleId: number): Promise<void> {
        await db.roles.delete(roleId);
    }

    async searchRoles(searchTerm: string): Promise<IRole[]> {
        return db.roles
            .where("name")
            .startsWithIgnoreCase(searchTerm)
            .or("permissions")
            .startsWithIgnoreCase(searchTerm)
            .toArray();
    }
}
