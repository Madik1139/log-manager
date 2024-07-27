import Dexie, { Table } from "dexie";
import {
    IEquipment,
    IUser,
    IMaintenance,
    ITimesheet,
    Irole,
    Ivendor,
    IMCUData,
} from "../../domain/entities/Types";

class TimesheetDB extends Dexie {
    users!: Table<IUser, number>;
    roles!: Table<Irole, number>;
    vendors!: Table<Ivendor, number>;
    equipments!: Table<IEquipment, number>;
    maintenance!: Table<IMaintenance, number>;
    timesheet!: Table<ITimesheet, number>;
    mcuData!: Table<IMCUData, number>;

    constructor() {
        super("TimesheetDB");
        this.version(1).stores({
            users: "++id, uid, name, email, role, [name+email], [role+name], [role+email]",
            roles: "++id, uid, name, *permissions",
            vendors: "++id, uid, name, category, status, [name+category], [status+name]",
            equipments: "++id, uid, name, operator, type, status, lastMaintenance, [type+status], [operator+status]",
            maintenance: "++id, uid, date, machine, issue, priority, status, [machine+status], [priority+status]",
            timesheet: "++id, uid, activity, timeMachineStart, timeMachineEnd, timeOperatorStart, timeOperatorEnd, hours, production, speed, quality, [activity+timeMachineStart]",
            mcuData: "++id, uid, data1, data2, data3, data4, data5, [data1+data2]",
        });
    }
}

const db = new TimesheetDB();

export default db;
