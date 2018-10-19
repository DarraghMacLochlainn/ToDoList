var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
let mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//GET
app.get('/users', users.findAll);
app.get('/users/objective', users.findAllObjectives);
app.get('/users/profile', users.findAllUsers);

app.get('/users/:id', users.findOne);
app.get('/users/profile/:id/', users.findOneUser);
app.get('/users/objective/:id', users.findOneObjective);

//POST
app.post('/users', users.addUserAndObjective);
app.post('/users/profile', users.addUser);
app.post('/users/:id', users.addObjective);

//PUT
/*
app.put('/users/profile/:_id/newName', users.changeUsername);
app.put('/users/objective/:_id/newTime', users.changeTime);
app.put('/users/objective/:_id/newGoal', users.changeGoal);
app.put('/users/objective/:_id/newLocation', users.changeLocation);
app.put('/users/objective/:_id/support', users.likeObjective);
*/

//DELETE
app.delete('/users/objective/:_id', users.deleteObjective);
app.delete('/users/profile/:_id', users.deleteUser);

mongoose.connect('mongodb://localhost:27017/TODOdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
