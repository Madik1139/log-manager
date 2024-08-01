import Dexie, { Table } from "dexie";
import {
    IEquipment,
    IUser,
    IMaintenance,
    ITimesheet,
    IRole,
    IVendor,
    IMCUData,
} from "../../domain/entities/Types";

class TimesheetDB extends Dexie {
    users!: Table<IUser, number>;
    roles!: Table<IRole, number>;
    vendors!: Table<IVendor, number>;
    equipments!: Table<IEquipment, number>;
    maintenance!: Table<IMaintenance, number>;
    timesheet!: Table<ITimesheet, number>;
    mcuData!: Table<IMCUData, number>;

    constructor() {
        super("TimesheetDB");
        this.version(1).stores({
            users: "++id, uid, name, email, role, [role+name], [role+email]",
            roles: "++id, uid, name, *permissions",
            vendors: "++id, uid, name, category, status, [name+category], [status+name]",
            equipments: "++id, uid, name, operator, type, status, lastMaintenance",
            maintenance: "++id, uid, date, machine, issue, priority, status, [machine+status], [priority+status]",
            timesheet: "++id, uid, contractor, eqId, date, hmStart, hmEnd, gps, blade, status",
            mcuData: "++id, uid, data1, data2, data3, data4, data5, [data1+data2]",
        });
    }
}

const db = new TimesheetDB();

export default db;
