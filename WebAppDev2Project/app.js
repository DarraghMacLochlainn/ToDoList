var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var objectives = require('./routes/objectives');
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
app.get('/users/:id', users.findOne);
app.get('/objectives', objectives.findAll);
app.get('/objectives/:id', objectives.findOne);
app.get('/users/:id/profile', users.findUserAndObjectives);
app.get('/objectives/:user_id/profile', objectives.findObjectives);

//POST
app.post('/users/', users.addUser);
app.post('/objectives/', objectives.addObjective);

//PUT
app.put('/users/:_id/Name', users.changeUsername);
app.put('/users/:_id/Password', users.changeUserPassword);
app.put('/users/:_id/Email', users.changeUserEmail);
app.put('/objectives/:_id/Time', objectives.changeTime);
app.put('/objectives/:_id/Goal', objectives.changeGoal);
app.put('/objectives/:_id/Location', objectives.changeLocation);
app.put('/objectives/:_id/Like', objectives.likeObjective);


//DELETE
app.delete('/objectives/:_id/', objectives.deleteObjective);
app.delete('/users/:_id', users.deleteUser);

var mongodbUri ='mongodb://tododbuser:tododb1@ds137913.mlab.com:37913/tododb';
mongoose.connect(mongodbUri);

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
