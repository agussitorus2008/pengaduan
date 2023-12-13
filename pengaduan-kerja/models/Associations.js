import db from "../config/Database.js";

/** Sync all models */
export const SyncAllModels = async () => {
    try {
        await db.sync({ force: false });
        console.log("\n\n---------------------\n");
        console.log("Database has synced");
        console.log("\n---------------------\n\n");
    } catch (error) {
        console.log(error);
    }
};
