import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }

        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(400).json({ message: "Pengguna tidak dapat ditemukan" });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(400).json({ message: "Password salah" });
            return;
        }

        const token = jwt.sign(
            { id_user: user.id_user, role: user.role, prodi: user.id_prodi },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // user berhasil log in
        res.status(200).json({
            message: "Login berhasil dilakukan",
            token,
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login gagal dilakukan" });
    }
};
