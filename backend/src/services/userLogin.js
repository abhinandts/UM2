import User from "../schemas/userSchema.js";
import RefreshToken from "../schemas/refreshTokenSchema.js";
import bcrypt from "bcrypt";

import { generateAccessToken, generateRefreshToken } from "../lib/jwt.js";

const logInUser = async (req, res) => {
    try {
        const { email, password } = req?.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Password don't match" });
        }

        await RefreshToken.deleteMany({ userId: user._id });

        const accessToken = generateAccessToken({ email: email, userId: user._id });
        const refreshToken = generateRefreshToken({ email: email, userId: user._id });

        const refreshTokenSchema = new RefreshToken({
            token: refreshToken,
            userId: user._id
        });

        await refreshTokenSchema.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return res.status(200).json({ message: "Tokens sent..." });

    } catch (error) {
        console.error("login process error", error);
        return res.status(500).json({ message: "server couldn't complete login." })
    }
}

export default logInUser;