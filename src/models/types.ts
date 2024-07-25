export interface ILog {
    id: number;
    user: string;
    activity: string;
    details: string;
    timestamp: string;
}

export interface IUser {
    id?: number;
    name?: string;
    email?: string;
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
    priority: Priority;
    status: MaintenanceStatus;
}

export interface ITimesheet {
    id?: number;
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
    status: VendorStatus;
}

export interface IMCUData {
    id?: number;
    data1: string;
    data2: string;
    data3: string;
    data4: string;
    data5: string;
}

export enum Role {
    Admin = "admin",
    Manager = "manager",
    Operator = "operator",
    Device = "device",
}

export const curentRole = Role.Operator;

export enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export enum MaintenanceStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed",
}

export enum VendorStatus {
    Active = "Active",
    Inactive = "Inactive",
}


