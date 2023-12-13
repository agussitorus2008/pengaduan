import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ReportRoute from "./routes/ReportRoute.js";
import { SyncAllModels } from "./models/Associations.js";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ReportRoute);

SyncAllModels();
app.listen(port, () => console.log(`Server running on port ${port}`));
