const nodemailer = require('nodemailer');

//Difine transport
let transport = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    //Not using 2-factor authentication
    secure : false,
    auth : {

    }
})