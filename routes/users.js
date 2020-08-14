const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const { route } = require('.');

router.get('/profile', usersController.profile);

router.get('/posts',usersController.posts);

module.exports = router;