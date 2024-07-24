export interface ILog {
    id: number;
    user: string;
    activity: string;
    details: string;
    timestamp: string;
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    role: Role;
    picture?: string;
}

export interface IEquipment {
    id?: number;
    name: string;
    type: string;
    status: string;
    operator: string;
    lastMaintenance: string;
    duration: string;
}

export interface IMaintenance {
    id?: number;
    date: string;
    machine: string;
    issue: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "Pending" | "Approved" | "In Progress" | "Completed";
}

export interface ITimesheet {
    activity: string;
    timeMachineStart: number;
    timeMachineEnd: number;
    timeOperatorStart: string;
    timeOperatorEnd: string;
    hours: string;
    production: number;
    speed: number;
    quality: string;
}

export interface Irole {
    id?: number;
    name: string;
    permissions: string[];
}

export interface Ivendor {
    id?: number;
    name: string;
    category: string;
    status: "Active" | "Inactive";
}

export enum Role {
    Admin = "admin",
    Manager = "manager",
    Operator = "operator",
    Device = "device",
}

export const curentRole = Role.Operator;
