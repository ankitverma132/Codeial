const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//Define transport
//This is the part which sends email
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    //Not using 2-factor authentication
    secure : false,
    auth : {
        user : 'ankitv.ashokaec19@gmail.com',
        pass : '**********'
    }
});

//Now we need to define that  we will use ejs
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile{
        path.join(__dirname, '../views/mailers', relativePath);
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template');
                return; 
            }
            mailHTML = template;
        }
    }
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}