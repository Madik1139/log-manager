import { UserUseCases } from "../../domain/usecases/UserUseCases";
import { IUser, Role } from "../../domain/entities/Types";
import { IndexedDBDataSource } from "../datasources/IndexedDBDataSource";

export class UserRepository implements UserUseCases {
    constructor(private dataSource: IndexedDBDataSource) {}

    async getUsers(): Promise<IUser[]> {
        return this.dataSource.getUsers();
    }

    async getUserById(id: number): Promise<IUser | undefined> {
        return this.dataSource.getUserById(id);
    }

    async addUser(user: IUser): Promise<number> {
        return this.dataSource.addUser(user);
    }

    async updateUser(user: IUser): Promise<void> {
        await this.dataSource.updateUser(user);
    }

    async deleteUser(userId: number): Promise<void> {
        await this.dataSource.deleteUser(userId);
    }

    async searchUsers(searchTerm: string, role: Role | "all"): Promise<IUser[]> {
        return this.dataSource.searchUsers(searchTerm, role);
    }
    
}
