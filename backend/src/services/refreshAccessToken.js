import jwt from 'jsonwebtoken'
import User from '../schemas/userSchema.js';
import { generateAccessToken, generateRefreshToken } from '../lib/jwt.js';
import RefreshToken from '../schemas/refreshTokenSchema.js';

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(403).json({ message: "No refresh Token" });
    }
    try {
        const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

        const payload = jwt.verify(refreshToken, jwtRefreshSecret);

        const storedToken = await RefreshToken.find({ userId: payload._id })
        if (!storedToken) {
            return res.status(403).json({ message: "no stored token" });
        }

        const user = await User.findOne({ email: payload.email }).lean();

        if (!user) {
            return res.status(403).json({ message: "No user found" });
        }

        const accessToken = generateAccessToken({ email: user.email, userId: user._id });

        const newRefreshToken = generateRefreshToken({ email: user.email, userId: user._id });

        await RefreshToken.findOneAndUpdate(
            { userId: user._id },
            { token: newRefreshToken },
            { new: true }
        )

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true
        });

        res.status(200).json({ token: accessToken });
    } catch (error) {
        console.error("error", error);
        return res.status(403).json({ message: "Unable to create access token" });
    }
}

export default refreshAccessToken;