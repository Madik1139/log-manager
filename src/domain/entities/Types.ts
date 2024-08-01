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
    contractor: string;
    eqId: string;
    date: Date;
    hmStart: number;
    hmEnd: number;
    gps: string;
    blade: string;
    status: TimesheetStatus;
}

export interface IRole {
    id?: number;
    uid: string;
    name: string;
    permissions: UsersPermissions[];
}

export interface IVendor {
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
    Contractor = "contractor",
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

export enum TimesheetStatus {
    Working = "Working",
    Moving = "Moving",
    Idle = "Idle",
    Stop = "Stop",
}

export enum UsersPermissions {
    My_Profile_Read,
    My_Profile_Write,
    Timesheet_InGroup_InManagement_Read,
    Timesheet_InGroup_InManagement_Write,
    Maintenance_Request_InGroup_InManagement_Read,
    Maintenance_Request_InGroupIn_Management_Write,
    Equipments_Management_InGroup_InManagement_Read,
    Equipments_Management_InGroup_InManagement_Write,
    Roles_Management_InGroup_InManagement_Read,
    Roles_Management_InGroup_InManagement_Write,
    Users_Management_InGroup_InManagement_Read,
    Users_Management_InGroup_InManagement_Write,
    Timesheet_InGroup_Read,
    Timesheet_InGroup_Write,
    Maintenance_Request_InGroup_Read,
    Maintenance_Request_InGroup_Write,
    Equipments_Management_InGroup_Read,
    Equipments_Management_InGroup_Write,
    Roles_Management_InGroup_Read,
    Roles_Management_InGroup_Write,
    Users_Management_InGroup_Read,
    Users_Management_InGroup_Write,
    Maintenance_Request_Read,
    Maintenance_Request_Write,
    Equipments_Management_Read,
    Equipments_Management_Write,
    Groups_Management_Read,
    Groups_Management_Write,
    Roles_Management_Read,
    Roles_Management_Write,
    Users_Management_Read,
    Users_Management_Write,
    Logs_Management_Read,
    Report_Management_Read,
    Settings_Management_Write,
}
