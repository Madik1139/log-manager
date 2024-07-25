const DEBUG_MODE = process.env.NODE_ENV === "development";

export const debugLog = (...args: any[]): void => {
    if (DEBUG_MODE) {
        console.log(...args);
    }
};

export const isDebugMode = (): boolean => DEBUG_MODE;
