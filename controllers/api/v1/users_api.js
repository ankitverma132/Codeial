const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//Get the signin data

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({
            email : req.body.email
        });
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Invalid username or password"
            });
        }
        //if user found
        return res.json(200, {
            message : "Sign in succesful, here is your token, please keep it safe",
            data : {
                //Passing user
                token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '100000'})
            }
        })

    }catch(err){
        console.log('****Error');
        return res.json(500, {
            message : "Internal server error"
        });
    }
}