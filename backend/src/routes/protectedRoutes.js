
import express from 'express';
import validateToken from '../middlewares/validateToken.js';

const router = express.Router();

router.get('/home', validateToken, (req, res) => {
    return res.status(200).json({ message: "This is the protected HOME page" });
});

export default router;