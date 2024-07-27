import { IUser, Role } from "../entities/Types";

export interface UserUseCases {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser | undefined>;
    addUser(user: IUser): Promise<number>;
    updateUser(user: IUser): Promise<void>;
    deleteUser(userId: number): Promise<void>;
    searchUsers(searchTerm: string, role: Role | 'all'): Promise<IUser[]>;
}
