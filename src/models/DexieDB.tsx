import Dexie, { Table } from "dexie";
import { IEquipment, IUser, IMaintenance, ITimesheet, Irole, Ivendor } from "../types";

class TimesheetDB extends Dexie {
    users!: Table<IUser, number>;
    roles!: Table<Irole, number>;
    vendors!: Table<Ivendor, number>;
    equipments!: Table<IEquipment, number>;
    maintenance!: Table<IMaintenance, number>;
    timesheet!: Table<ITimesheet, number>;

    constructor() {
        super("TimesheetDB");
        this.version(1).stores({
            users: "++id, name, email, role",
            roles: "++id, name, permissions",
            vendors: "++id, name, category, status",
            equipments: "++id, name, operator, type, status, lastMaintenance",
            maintenance:
                "++id, date, machine, issue, description, priority, status",
            timesheet:
                "++id, activity, timeMachineStart, timeMachineEnd, timeOperatorStart, timeOperatorEnd ,hours, production, speed, quality",
        });
    }
}

const db = new TimesheetDB();

export default db;
