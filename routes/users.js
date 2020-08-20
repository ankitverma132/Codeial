const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const { route } = require('.');

//Make profile page accessible only if user is signed in
router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/posts',usersController.posts);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//Use passport as a  middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;
