export interface ILog {
    id: number;
    user: string;
    activity: string;
    details: string;
    timestamp: string;
}

export interface IUser {
    id?: number;
    uid: string;
    name?: string;
    email?: string;
    role: Role;
    picture?: string;
}

export interface IEquipment {
    id?: number;
    uid: string;
    name: string;
    type: string;
    status: EquipmentStatus;
    operator: string;
    lastMaintenance: string;
    duration: string;
}

export interface IMaintenance {
    id?: number;
    uid: string;
    date: string;
    machine: string;
    issue: string;
    description: string;
    priority: Priority;
    status: MaintenanceStatus;
}

export interface ITimesheet {
    id?: number;
    uid: string;
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
    uid: string;
    name: string;
    permissions: string[];
}

export interface Ivendor {
    id?: number;
    uid: string;
    name: string;
    category: string;
    status: VendorStatus;
}

export interface IMCUData {
    id?: number;
    uid: string;
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

export enum EquipmentStatus {
    normal = "Normal",
    under = "Under Maintenance",
    need = "Need Maintenance",
}


