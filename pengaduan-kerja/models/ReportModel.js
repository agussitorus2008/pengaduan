import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ReportModel = db.define(
    "reports",
    {
        id_report: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        kategori: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lampiran: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "report",
        timestamps: true,
    }
);

export default ReportModel;