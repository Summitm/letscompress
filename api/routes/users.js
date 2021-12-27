const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/UserController');

// add user endpoint
router.post('/users/add', UserController.addUser);

// get all users
router.get('/users/all', UserController.getAllUsers);

// delete users
router.delete('/users/deleteOne', UserController.deleteUser);

module.exports = router;