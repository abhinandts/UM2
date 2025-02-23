import express from 'express'
import registerUser from '../services/userRegistration.js';
import loginUser from '../services/userLogin.js';
import refreshAccessToken from '../services/refreshAccessToken.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/refreshToken', refreshAccessToken);

export default router;