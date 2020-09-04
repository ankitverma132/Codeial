const express = require('express');
const router = express.Router();
const passpost = require('passport');

const postsApi = require("../../../controllers/api/v1/posts_api");
const { param } = require('./users');
const passport = require('passport');

router.get('/', postsApi.index);

router.delete('/:id',passport.authenticate('jwt',{session : false}), postsApi.destroy);

module.exports = router;