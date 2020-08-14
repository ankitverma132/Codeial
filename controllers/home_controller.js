
//module.export.actionName = function(req,res){};

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial!</h1>');
}