const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/UserController');

// add user endpoint
router.post('/user/add', UserController.register);

// delete users
router.post('/user/login', UserController.login);

// get all users
router.get('/users/all', UserController.getAllUsers);

// delete users
router.delete('/users/deleteOne', UserController.deleteUser);

module.exports = router;