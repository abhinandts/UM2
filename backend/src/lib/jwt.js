import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {

    const jwtSecret = process.env.JWT_ACCESS_SECRET;
    return jwt.sign(payload, jwtSecret, { expiresIn: "2m" });
}

export const generateRefreshToken = (payload) => {

    const jwtSecret = process.env.JWT_REFRESH_SECRET;
    return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
}