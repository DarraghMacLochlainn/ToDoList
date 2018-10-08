var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');

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

//get users
//app.get('/users', users.findAllUsers);
//app.get('/users/:user_id', users.findOneUsers);

//get users and objectives
app.get('/users', users.findAll);
app.get('/users/:user_id', users.findOne);

//get objectives
//app.get('/users', users.findAllObjectives);
//app.get('/users/:todo_id', users.findOneObjective);

//add users without objectives
//app.post('/users', users.addUser);

//add users with objectives
app.post('/users', users.addUserAndObjective);

//add objectives to users
//app.post('/users', users.addObjective);

//change user name
//app.put('/users/:user_id/newName', users.changeUsername);

//change objective time
//app.put('/users/:todo_id/newTime', users.changeTime);

//change objective goal
//app.put('/users/:todo_id/newGoal', users.changeGoal);

//change objective location
//app.put('/users/:todo_id/newLocation', users.changeLocation);

//like objective
//app.put('/users/:todo_id/support', users.likeObjective);

//delete objective
//app.delete('/users/:todo_id', users.deleteObjective);

//delete user
app.delete('/users/:user_id', users.deleteUser);

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
