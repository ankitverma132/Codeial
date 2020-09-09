const nodeMailer = require('../config/nodemailer');

//Function to sent email
//Another way of exporting a function
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');

   // console.log('Inside newComment mailer');
    nodeMailer.transporter.sendMail({
        from : 'ankitv.ashokaec19@gmail.com',
        to: comment.user.email, // list of receivers
        subject: "New comment published!", // Subject line
        //html: "<h1>Yup! your comment published!</h1>", // html body
        html : htmlString
    },(err,info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}
//Now whenever new comment is made I just need to call this mailer