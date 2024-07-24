import {
    Activity,
    AlertCircle,
    BarChart2,
    Boxes,
    FileText,
    LayoutDashboard,
    LineChart,
    Search,
    Server,
    Settings,
    ShieldCheck,
    Tractor,
    User,
    Users,
    Wrench,
} from "lucide-react";
import { MaintenanceRequest, Role, TimesheetEntry } from "../types";

export const menuItems = {
    admin: [
        {
            id: "userManagement",
            icon: Users,
            label: "Users",
            path: "/users",
        },
        {
            id: "roleManagement",
            icon: ShieldCheck,
            label: "Roles",
            path: "/roles",
        },
        {
            id: "groups",
            icon: Boxes,
            label: "Groups/ Vendors",
            path: "/groups",
        },
        {
            id: "equipment",
            icon: Tractor,
            label: "Equipments",
            path: "/equipments-management",
        },
        {
            id: "Maintenance",
            icon: Wrench,
            label: "Maintenance",
            path: "/maintenance-management",
        },
        {
            id: "logManagement",
            icon: FileText,
            label: "Logs",
            path: "/logs",
        },
        {
            id: "reportsAnalytics",
            icon: BarChart2,
            label: "Reports & Analytics",
            path: "/reports",
        },
        {
            id: "systemSettings",
            icon: Settings,
            label: "System Settings",
            path: "/settings",
        },
    ],
    manager: [
        {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/",
        },
        {
            id: "timeshhet",
            icon: LineChart,
            label: "Timesheet",
            path: "/timesheet",
        },
        {
            id: "equipment",
            icon: Tractor,
            label: "Equipment",
            path: "/equipments-management",
        },
        {
            id: "maintenance",
            icon: Wrench,
            label: "Maintenance",
            path: "/maintenance-management",
        },
        {
            id: "reportsAnalytics",
            icon: BarChart2,
            label: "Reports & Analytics",
            path: "/reports",
        },
        { id: "profile", icon: User, label: "My Profile", path: "/profile" },
    ],
    operator: [
        {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/",
        },
        {
            id: "timeshhet",
            icon: LineChart,
            label: "Timesheet",
            path: "/timesheet",
        },
        {
            id: "equipment",
            icon: Tractor,
            label: "Equipment",
            path: "/equipments-logs",
        },
        {
            id: "maintenance",
            icon: Wrench,
            label: "Maintenance",
            path: "/maintenance-logs",
        },
        { id: "profile", icon: User, label: "My Profile", path: "/profile" },
    ],
};

export const metrics = {
    admin: [
        { title: "Total Logs", value: "1,234,567", icon: Activity },
        { title: "Error Rate", value: "0.5%", icon: AlertCircle },
        { title: "Active Users", value: "1,234", icon: Users },
        { title: "Server Uptime", value: "99.99%", icon: Server },
    ],
    manager: [
        { title: "Total Logs", value: "1,234,567", icon: Activity },
        { title: "Error Rate", value: "0.5%", icon: AlertCircle },
        { title: "Active Users", value: "1,234", icon: Users },
        { title: "Server Uptime", value: "99.99%", icon: Server },
    ],
    operator: [
        { title: "My Logs", value: "1,234", icon: Activity },
        { title: "My Error Rate", value: "0.2%", icon: AlertCircle },
        { title: "My Active Sessions", value: "3", icon: Users },
    ],
};

export const features = {
    admin: [
        { name: "Search Logs", icon: Search, path: "/logs" },
        { name: "User Management", icon: Users, path: "/users" },
        { name: "Alert Settings", icon: Settings, path: "/alerts" },
    ],
    manager: [
        { name: "Search Logs", icon: Search, path: "/logs" },
        { name: "User Management", icon: Users, path: "/users" },
        { name: "Alert Settings", icon: Settings, path: "/alerts" },
    ],
    operator: [
        { name: "Search My Logs", icon: Search, path: "/logs" },
        // { name: "My Profile", icon: Users, path: "/users" },
        { name: "Alert Settings", icon: Settings, path: "/alerts" },
    ],
};

export const chartData = [
    { name: "Mon", logs: 4000, errors: 240 },
    { name: "Tue", logs: 3000, errors: 139 },
    { name: "Wed", logs: 2000, errors: 980 },
    { name: "Thu", logs: 2780, errors: 390 },
    { name: "Fri", logs: 1890, errors: 490 },
    { name: "Sat", logs: 2390, errors: 300 },
    { name: "Sun", logs: 3490, errors: 430 },
];

export const dummyLogs = [
    {
        id: 1,
        timestamp: "2024-07-16 10:30:00",
        user: "admin",
        activity: "User login",
        details: "Admin logged in from IP 192.168.1.1",
    },
    {
        id: 2,
        timestamp: "2024-07-16 11:15:00",
        user: "john_doe",
        activity: "File upload",
        details: "Uploaded file: report.pdf",
    },
    {
        id: 3,
        timestamp: "2024-07-16 12:00:00",
        user: "jane_smith",
        activity: "Settings change",
        details: "Changed email notification preferences",
    },
    {
        id: 4,
        timestamp: "2024-07-16 13:45:00",
        user: "alice_wonder",
        activity: "Password reset",
        details: "Requested password reset",
    },
    {
        id: 5,
        timestamp: "2024-07-16 14:30:00",
        user: "bob_builder",
        activity: "Project created",
        details: "Created new project: Website Redesign",
    },
    {
        id: 6,
        timestamp: "2024-07-16 15:20:00",
        user: "charlie_brown",
        activity: "Comment added",
        details: "Added comment to task #1234",
    },
    {
        id: 7,
        timestamp: "2024-07-16 16:10:00",
        user: "david_copperfield",
        activity: "Task completed",
        details: "Marked task #5678 as complete",
    },
    {
        id: 8,
        timestamp: "2024-07-16 17:00:00",
        user: "eve_hacker",
        activity: "Security alert",
        details: "Unusual login attempt detected",
    },
    {
        id: 9,
        timestamp: "2024-07-16 18:30:00",
        user: "frank_sinatra",
        activity: "API key generated",
        details: "Generated new API key for project X",
    },
    {
        id: 10,
        timestamp: "2024-07-16 19:45:00",
        user: "grace_hopper",
        activity: "Bug report",
        details: "Submitted bug report #9876",
    },
    {
        id: 11,
        timestamp: "2024-07-16 20:15:00",
        user: "hank_pym",
        activity: "User invited",
        details: "Invited user@example.com to collaborate",
    },
    {
        id: 12,
        timestamp: "2024-07-16 21:00:00",
        user: "irene_adler",
        activity: "Document deleted",
        details: "Deleted document: old_contract.docx",
    },
    {
        id: 13,
        timestamp: "2024-07-16 22:30:00",
        user: "jack_sparrow",
        activity: "Payment processed",
        details: "Processed payment for order #54321",
    },
    {
        id: 14,
        timestamp: "2024-07-17 09:00:00",
        user: "kevin_flynn",
        activity: "System update",
        details: "Initiated system update to version 2.0",
    },
    {
        id: 15,
        timestamp: "2024-07-17 10:45:00",
        user: "lara_croft",
        activity: "Backup created",
        details: "Created system backup: backup_20240717.zip",
    },
];

export const dummyUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "operator" as Role,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "admin" as Role,
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "manager" as Role,
    },
];

export const allPermissions = [
    "Full Access",
    "User Management",
    "Role Management",
    "Log Management",
    "Equipment Management",
    "Maintenance Management",
    "System Settings",
    "Report Generation",
    "View Logs",
    "Access Maintenance Records",
    "Add Maintenance",
    "Access Equipment",
    "View Personal Profile",
    "Request Maintenance",
]

export const adminPermissions = [
    "Full Access",
    "User Management",
    "Role Management",
    "Log Management",
    "Equipment Management",
    "Maintenance Management",
    "System Settings",
    "Report Generation",
]

export const managerPermissions = [
    "View Logs",
    "Report Generation",
    "Access Maintenance Records",
    "Add Maintenance",
    "Access Equipment",
    "View Personal Profile",
]

export const operatorPermissions = [
    "View Logs",
    "Access Equipment Records",
    "Access Maintenance Records",
    "Request Maintenance",
    "View Personal Profile",
]

export const dummyEquipments = [
    {
        id: 1,
        date: "2024-07-19",
        machine: "Machine A",
        duration: "8 hours",
        status: "Normal",
        operator: "John Doe",
    },
    {
        id: 2,
        date: "2024-07-18",
        machine: "Machine B",
        duration: "6 hours",
        status: "Needs Maintenance",
        operator: "Jane Smith",
    },
    {
        id: 3,
        date: "2024-07-17",
        machine: "Machine C",
        duration: "7 hours",
        status: "Normal",
        operator: "Mike Johnson",
    },
    {
        id: 4,
        date: "2024-07-16",
        machine: "Machine A",
        duration: "5 hours",
        status: "Under Repair",
        operator: "Emily Brown",
    },
    {
        id: 5,
        date: "2024-07-15",
        machine: "Machine D",
        duration: "9 hours",
        status: "Normal",
        operator: "Chris Wilson",
    },
]

export const initialEquipment = [
    {
        id: 1,
        name: "Grader A",
        type: "Heavy Machinery",
        status: "Normal",
        operator: "John Doe",
        lastMaintenance: "2024-06-15",
    },
    {
        id: 2,
        name: "Grader B",
        type: "Conveyor System",
        status: "Under Maintenance",
        operator: "Jane Smith",
        lastMaintenance: "2024-07-01",
    },
    {
        id: 3,
        name: "Excavator",
        type: "Automation",
        status: "Need Maintenance",
        operator: "Mike Johnson",
        lastMaintenance: "2024-06-30",
    },
];

export const dummyMaintenance: MaintenanceRequest[] = [
    {
        id: 1,
        date: "2024-07-18",
        machine: "Machine B",
        issue: "Unusual noise",
        description: "The machine is making a loud grinding noise during operation.",
        priority: "High",
        status: "Pending",
    },
    {
        id: 2,
        date: "2024-07-17",
        machine: "Machine A",
        issue: "Regular checkup",
        description: "Scheduled maintenance for routine inspection and tune-up.",
        priority: "Low",
        status: "Approved",
    },
    {
        id: 3,
        date: "2024-07-16",
        machine: "Machine D",
        issue: "Performance degradation",
        description: "Machine efficiency has decreased by 15% over the past week.",
        priority: "Medium",
        status: "In Progress",
    },
    {
        id: 4,
        date: "2024-07-15",
        machine: "Machine C",
        issue: "Software update",
        description: "New firmware version available for improved functionality.",
        priority: "Low",
        status: "Completed",
    },
    {
        id: 5,
        date: "2024-07-14",
        machine: "Machine A",
        issue: "Oil leak",
        description: "Small oil leak detected near the main gear assembly.",
        priority: "High",
        status: "In Progress",
    },
];

export const dummyTimesheet: TimesheetEntry[] = [
    {
        activity: "Maintenance Unit",
        timeMachineStart: 101,
        timeMachineEnd: 101,
        timeOperatorStart: "09:53",
        timeOperatorEnd: "09:55",
        hours: "00:01",
        production: 0,
        speed: 0,
        quality: "--",
    },
    {
        activity: "Cuci Unit",
        timeMachineStart: 101,
        timeMachineEnd: 101,
        timeOperatorStart: "09:55",
        timeOperatorEnd: "09:56",
        hours: "00:01",
        production: 0,
        speed: 0,
        quality: "--",
    },
    {
        activity: "Work",
        timeMachineStart: 101,
        timeMachineEnd: 105,
        timeOperatorStart: "11:48",
        timeOperatorEnd: "11:48",
        hours: "01:24",
        production: 613,
        speed: 0,
        quality: "--",
    },
    {
        activity: "Work",
        timeMachineStart: 105,
        timeMachineEnd: 107,
        timeOperatorStart: "16:00",
        timeOperatorEnd: "16:00",
        hours: "00:08",
        production: 613,
        speed: 0,
        quality: "--",
    },
];