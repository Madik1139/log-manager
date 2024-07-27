import db from "../../infrastructure/db/DexieDB";

const DEBUG_MODE = process.env.NODE_ENV === "development";

export const debugLog = (...args: any[]): void => {
    if (DEBUG_MODE) {
        console.log(...args);
    }
};

export const isDebugMode = (): boolean => DEBUG_MODE;


export function generateUID(length: number = 10): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

export async function initializedDB() {
    try {
        await db.open();
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}