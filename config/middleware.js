module.exports.setFlash = function(req,res,next){
    //We will findout flash from req & set it up
    //in locals of the response
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}