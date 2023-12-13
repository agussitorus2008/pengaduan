import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import bcrypt from "bcryptjs";

const { DataTypes } = Sequelize;

const User = db.define(
    "user",
    {
        id_user: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // Konfigurasi default untuk semua kolom dalam model
        freezeTableName: true,
    }
);
User.afterSync(async (options) => {
    try {
        const count = await User.count();
        if (count === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("password", salt);
            const admin = {
                username: "admin",
                email: "admin@mail.com",
                password: hashedPassword,
                role: 0,
            };

            await User.create(admin);

            console.log("Initial data inserted successfully.");
        }
    } catch (error) {
        console.error("Error in beforeBulkSync:", error);
    }
});
export default User;
