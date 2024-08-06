import express from 'express';
import {
    registerClient,
    registerProfessional,
    loginUser,
    getProfessionalProfile,
    updateProfessionalProfile,
    getClientProfile,
    updateClientProfile,
    getAllProfessionals,
    searchUsers,
    getUserProfileById,
    changePassword
} from '../controllers/userController.js';
import {
    uploadProfessional,
    uploadClientProfile,
    uploadProfessionalProfile
} from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();


router.post('/register/client', registerClient);
router.post('/register/professional', uploadProfessional, registerProfessional);
router.post('/login', loginUser);
router.get('/search', searchUsers);
// General profile route that redirects to the correct profile based on user role
router.get('/profile', authenticateToken, (req, res) => {
    const role = req.user.role;
    if (role === 'Professional') {
        return getProfessionalProfile(req, res);
    } else if (role === 'Client') {
        return getClientProfile(req, res);
    } else {
        return res.status(400).json({ message: 'Invalid role' });
    }
});

router.get('/profile/professional', authenticateToken, verifyRole(['Professional']), getProfessionalProfile);
router.put('/profile/professional', authenticateToken, verifyRole(['Professional']), uploadProfessionalProfile, updateProfessionalProfile);
router.get('/profile/client', authenticateToken, verifyRole(['Client']), getClientProfile);
router.put('/profile/client', authenticateToken, verifyRole(['Client']), uploadClientProfile, updateClientProfile);

router.get('/profile/:userId', getUserProfileById);
router.get('/professionals', getAllProfessionals);

router.put('/change-password', authenticateToken, changePassword);

export default router;
