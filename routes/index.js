const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
const { route } = require('./posts');

//console.log("Router loaded");

router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

//For any further routes access from here
//router.use('/routerName', require('./routerfile'));

router.use('/admin', require('./admin'));

module.exports = router;
