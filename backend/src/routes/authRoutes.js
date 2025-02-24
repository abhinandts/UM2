import express from 'express'
import registerUser from '../services/userRegistration.js';
import logInUser from '../services/userLogin.js';
import logOutUser from '../services/userLogout.js';
import refreshAccessToken from '../services/refreshAccessToken.js';
import verifyToken from '../services/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', logInUser)
router.post('/logout',logOutUser)
router.get('/verify',verifyToken )

router.post('/refreshToken', refreshAccessToken);

export default router;