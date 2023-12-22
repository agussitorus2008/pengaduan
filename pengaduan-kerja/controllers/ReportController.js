import ReportModel from "../models/ReportModel.js";
import { Op } from "sequelize";
import { validationResult } from 'express-validator';
import { getPagination, getPagingData } from '../controllers/Pagination.js';

export const createReport = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        // 

        const report = await ReportModel.create({
            kategori: req.body.kategori,
            judul: req.body.judul,
            isi: req.body.isi,
            lampiran: req.body.lampiran,
            tanggal: req.body.tanggal,
            status: 0
        });

        res.status(201).json({ message: "Report berhasil dibuat", data: report });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal dibuat" });
    }
};

export const getAllReport = async (req, res) => {
    try {
        const { page, size, kategori } = req.query;
        const { limit, offset } = getPagination(page, size);

        const condition = kategori ? { kategori: { [Op.like]: `%${kategori}%` } } : null;

        const data = await ReportModel.findAndCountAll({
            where: condition,
            limit,
            offset,
        });

        const response = getPagingData(data, page, limit);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal ditampilkan" });
    }
}

export const getReportById = async (req, res) => {
    try {
        const report = await ReportModel.findOne({
            where: {
                id_report: req.params.id,
            },
        });

        if (!report) {
            res.status(400).json({ message: "Report tidak dapat ditemukan" });
            return;
        }

        res.status(200).json(report);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal ditampilkan" });
    }
};

export const updateReport = async (req, res) => {
    try {
        const report = await ReportModel.findOne({
            where: {
                id_report: req.params.id_report,
            },
        });

        if (!report) {
            res.status(400).json({ message: "Report tidak dapat ditemukan" });
            return;
        }

        await ReportModel.update(req.body, {
            where: {
                id_report: req.params.id_report,
            },
        });

        res.status(200).json({ message: "Report berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal diupdate" });
    }
};

export const deleteReport = async (req, res) => {
    try {
        const report = await ReportModel.findOne({
            where: {
                id_report: req.params.id_report,
            },
        });

        if (!report) {
            res.status(400).json({ message: "Report tidak dapat ditemukan" });
            return;
        }

        await ReportModel.destroy({
            where: {
                id_report: req.params.id_report,
            },
        });

        res.status(200).json({ message: "Report berhasil dihapus" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal dihapus" });
    }
};  

// aproval
export const approveReport = async (req, res) => {
    try {
        const report = await ReportModel.findOne({
            where: {
                id_report: req.params.id_report,
            },
        });

        if (!report) {
            res.status(400).json({ message: "Report tidak dapat ditemukan" });
            return;
        }

        await ReportModel.update(req.body, {
            where: {
                id_report: req.params.id_report,
            },
        });

        res.status(200).json({ message: "Report berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal diupdate" });
    }
};

// reject
export const rejectReport = async (req, res) => {
    try {
        const report = await ReportModel.findOne({
            where: {
                id_report: req.params.id_report,
            },
        });

        if (!report) {
            res.status(400).json({ message: "Report tidak dapat ditemukan" });
            return;
        }

        await ReportModel.update(req.body, {
            where: {
                id_report: req.params.id_report,
            },
        });

        res.status(200).json({ message: "Report berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Report gagal diupdate" });
    }
};