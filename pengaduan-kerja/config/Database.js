import { Sequelize } from "sequelize";

const db = new Sequelize("pengaduan_kerja", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
export default db;
