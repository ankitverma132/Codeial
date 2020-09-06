const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const { route } = require('.');

//Make profile page accessible only if user is signed in
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);

router.post('/update/:id',passport.checkAuthentication, usersController.update);

//router.get('/posts',usersController.posts);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//Use passport as a  middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
//URL at which we will receive data
router.get('/auth/google/callback', passport.authenticate('google',{
         failureRedirect : 'users/signin'
    }),usersController.createSession);


module.exports = router;