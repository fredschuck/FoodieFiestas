const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middleware/auth');
// const {validateID} = require('../middleware/validator');


const router = express.Router();

router.get('/new', isGuest, controller.new);

router.post('/', isGuest, controller.create);

router.get('/login', isGuest, controller.loginForm);

router.post('/login', isGuest, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;