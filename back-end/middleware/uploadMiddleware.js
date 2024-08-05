import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }  // Limiting file size to 10MB
});

const uploadClient = upload.none(); // No files expected for clients during registration
const uploadProfessional = upload.single('portfolio'); // Only one portfolio file expected for professionals during registration
const uploadClientProfile = upload.single('profile_picture'); // Profile image for client profile update
const uploadProfessionalProfile = upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'portfolio', maxCount: 1 }]); // Profile image and portfolio file for professional profile update

export { uploadClient, uploadProfessional, uploadClientProfile, uploadProfessionalProfile };
