import express from 'express';
import {
    registerUser,
    loginUser,
    getProfessionalProfile,
    updateProfessionalProfile,
    getClientProfile,
    updateClientProfile,
    getAllProfessionals,
    searchUsers,
    changePassword
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadSingle } from '../middleware/uploadMiddleware.js'; 

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();


router.post('/register', uploadSingle, registerUser);
router.post('/login', loginUser);


router.get('/profile/professional', authenticateToken, verifyRole(['Professional']), getProfessionalProfile);
router.put('/profile/professional', authenticateToken, verifyRole(['Professional']), uploadSingle, updateProfessionalProfile);


router.get('/profile/client', authenticateToken, verifyRole(['Client']), getClientProfile);
router.put('/profile/client', authenticateToken, verifyRole(['Client']), uploadSingle, updateClientProfile);


router.get('/professionals', getAllProfessionals);


router.get('/search', searchUsers);


router.put('/change-password', authenticateToken, changePassword);

export default router;
