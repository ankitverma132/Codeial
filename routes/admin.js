const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin_controller');
const { route } = require('.');

router.get('/profile', adminController.profile);

module.exports = router;