import RefreshToken from "../schemas/refreshTokenSchema.js";

const logOutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found" });
        }

        await RefreshToken.deleteOne({ token: refreshToken });

        res.clearCookie("accessToken", { path: "/", httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
        res.clearCookie("refreshToken", { path: "/", httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });

        return res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.error("Logout process error", error);
        return res.status(500).json({ message: "Server couldn't complete logout" });
    }
};

export default logOutUser;