import User from "../schemas/userSchema.js";
import RefreshToken from "../schemas/refreshTokenSchema.js";
import bcrypt from "bcrypt";

import { generateAccessToken, generateRefreshToken } from "../lib/jwt.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req?.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Login falied" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Login failed" });
        }

        const accessToken = generateAccessToken({ email: email, userId: user._id });
        const refreshToken = generateRefreshToken({ email: email, userId: user._id });

        const refreshTokenSchema = new RefreshToken({
            token:refreshToken,
            userId:user._id
        });

        await refreshTokenSchema.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        });

        return res.status(200).json({ token: accessToken });

    } catch (error) {
        console.error("login process error", error);
        return res.status(500).json({ message: "server couldn't complete login." })
    }
}

export default loginUser;