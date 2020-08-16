const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development', {useNewUrlParser: true});

const db = mongoose.connection;

//Checking connection
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

db.once('open', function(){
    console.log("Connected to database :: MongoDB");
});

module.exports = db;