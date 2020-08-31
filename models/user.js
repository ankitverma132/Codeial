const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { strict } = require('assert');
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
    },
    //will just store path of file
    avatar : {
        type : String
    }
}, {
    // To keep track of created at and updated at
    timestamps : true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },  
    //Defing filename
    //Here filename is avatar-ms from Jan-1970
    //as fieldname is avatar
    filename: function (req, file, cb) {
        //Appended with current timestamp
      cb(null, file.fieldname + '-' + Date.now()); 
    }
});

//Static functions
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
//To make AVATAR_PATH available publically
userSchema.statics.avatarPath = AVATAR_PATH;
    

//Now we need to define which collection would use this schema
const user = mongoose.model('User', userSchema );

module.exports = user;
