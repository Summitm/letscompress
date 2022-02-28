const { Router } = require('express');

const router = Router();
const fileController = require('../controllers/FileController');

// file upload
router.post('/uploads', fileController.savefile);

// list all files
router.get('/fileslist', fileController.fileregister);

module.exports = router;