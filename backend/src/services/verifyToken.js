import jwt from 'jsonwebtoken'


const verifyToken = async (req, res) => {
    const aToken = req.cookies.accessToken;

    console.log(req.cookies.accessToken);

    if (!aToken) {
        return res.status(403).json({ message: "No Access Token" });
    }

    try {

        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

        jwt.verify(aToken,jwtAccessSecret);

        res.status(200).json({ message: "JWT verified"});


    } catch (error) {
        console.error("error", error);
        return res.status(400).json({ message: "Token verification failed" });
    }
}

export default verifyToken;