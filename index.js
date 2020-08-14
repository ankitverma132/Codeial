 const express = require('express');

 const app = express();

 const port = 8000;

//Use express router
app.use('/', require('./routes/index'));

//Setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');

 app.listen(port, function(err){
     if(err){
         //console.log("Error");
         //Using interpolation
        console.log(`Error in running the server: ${err}`);
     }
     console.log(`Server is running on port : ${port}`);
 });