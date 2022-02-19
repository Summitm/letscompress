const { Router } = require('express');
const router = Router();

const fileControllers = require('../controllers/FileController');

// save file
router.post('/files/save-one', fileControllers.create);

module.exports = router;