const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, {
    // To keep track of created at and updated at
    timestamps : true
});

//Now we need to define which collection would use this schema
const user = mongoose.model('User', userSchema );

module.exports = user;
