module.exports = function(app) {    //creating a function with express instance argument
    
    //importing body-parser for parsing request object in post
    var bodyParser = require('body-parser');

    //importing mongoose for storing data in database
    var mongoose = require('mongoose');

    //connecting to database
    mongoose.connect('mongodb://localhost/todo');

    //create a schema
    var todoSchema = new mongoose.Schema({
        item: String
    });

    //creating Model or Collection of Schema
    var Todo = mongoose.model('Todo', todoSchema);

    //Saving item in DB
    // var itemOne = Todo({
    //     item: 'Drink Milk'
    // }).save(function (err) {
    //     if (err) throw err;
    //     console.log('Item saved');
    // });

    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    //creating dummy data
    // var data = [{ 'item': 'Learn NodeJS' }, { 'item': 'Practice Aptitude' }, { 'item': 'Learn Mean Stack' }];

    //when a url request is made to todo
    app.get('/todo', function (req, res) {
        //get data from the mongodb and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data }); //passing data to the view
        })
        //res.render('todo', {todos:data}); //passing data to the view
    });

    //when a user wants to add a new todo 
    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and add it to the mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
        // data.push(req.body);
        // res.json(data);
    });

    //when a user wants to delete a todo
    app.delete('/todo/:item', urlencodedParser, function (req, res) {
        //Delete the request item from MongoDB
        //console.log(req.params.item);
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove(function (err, data) {
                if (err) throw err;
                res.json({todos: data });
            })
        // data = data.filter(function (i) {
        //     return (i.item.replace(/ /g, '-') !== req.params.item); //
        // });
        //res.json({todos: data });
        //console.log(data);
    });
}