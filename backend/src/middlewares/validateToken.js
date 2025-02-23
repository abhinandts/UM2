import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    try {
        const jwtSecret = process.env.JWT_ACCESS_SECRET;

        const authHeader = req.headers?.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret);

        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "you are not authorised to access this resource" });
    }
}

export default validateToken;