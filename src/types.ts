export interface Log {
    id: number;
    user: string;
    activity: string;
    details: string;
    timestamp: string;
}

export interface Alert {
    id: number;
    title: string;
    status: string;
    severity: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface Equipment {
    id: number;
    name: string;
    type: string;
    status: string;
    operator: string;
    lastMaintenance: string;
}

export interface MaintenanceRequest {
    id: number;
    date: string;
    machine: string;
    issue: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "Pending" | "Approved" | "In Progress" | "Completed";
}

export interface TimesheetEntry {
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

export enum Role {
    Admin = "admin",
    Manager = "manager",
    Operator = "operator",
}

export const curentRole = Role.Operator;
