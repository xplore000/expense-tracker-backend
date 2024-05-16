const router = require('express').Router();
const uploadController = require('../controllers/uploadController')
const filename = require('../controllers/filename')
const multer = require('multer');
const textDetection = require('../controllers/textDetection')
// Multer middleware for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for file upload
router.post('/upload', upload.single('file'), uploadController.uploadFile);
router.get('/filename',filename.getFileName)
router.get("/text-detection", textDetection.processTextDetection);
module.exports = router;
