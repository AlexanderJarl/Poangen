var express = require("express");
var path = require("path");

var app = express();

app.use(function(req, res, next){

  console.log(`${req.method} method for '${req.url}'`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/CSS',express.static(path.join(__dirname, 'public/CSS')));
// app.use('/JS',express.static(path.join(__dirname, 'public/JS')));
// app.use('/images',express.static(path.join(__dirname, 'public/images')));

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
