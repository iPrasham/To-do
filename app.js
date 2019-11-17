//importing express from node modules
var express = require('express');

//importing todoController
var todoController = require('./controllers/todoController');

//creating constructor/instance for express for using various methods of express
var app = express();

//setting up template engine using ejs
app.set('view engine', 'ejs');

//express static file middleware to access styles
app.use('/assets', express.static(__dirname + '/assets'));

//fire controllers
todoController(app);       //passing app instance of express to todoController

//listen to port
app.listen(3000);
console.log("You're listening to port 3000");



