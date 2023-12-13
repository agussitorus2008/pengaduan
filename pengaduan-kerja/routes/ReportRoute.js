import express from "express";
import{
    createReport,
    getAllReport,
    getReportById,
    updateReport,
    deleteReport,
    approveReport,
    rejectReport
} from "../controllers/ReportController.js";

import { JWTMiddleware } from "../middleware/JWTMiddleware.js";

const router = express.Router();

router.post("/report", createReport);
router.get("/report", JWTMiddleware, getAllReport);
router.get("/report/:id", JWTMiddleware, getReportById);
router.put("/report/:id", JWTMiddleware, updateReport);
router.delete("/report/:id", JWTMiddleware, deleteReport);
router.put("/report/approve/:id", JWTMiddleware, approveReport);
router.put("/report/reject/:id", JWTMiddleware, rejectReport);

export default router;