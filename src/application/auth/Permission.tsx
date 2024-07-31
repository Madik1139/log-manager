import { UsersPermissions } from "../../domain/entities/Types";
import db from "../../infrastructure/db/DexieDB";

export const hasPermission = async (
    userRole: string,
    requiredPermission: UsersPermissions
): Promise<boolean> => {
    const role = await db.roles.where({ name: userRole }).first();
    return role?.permissions?.includes(requiredPermission) || false;
};

export const permissionToString = (permission: UsersPermissions): string => {
    return UsersPermissions[permission].replace(/_/g, " ");
};
