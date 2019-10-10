var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
require('dotenv').config()

let uri = 'mongodb://localhost:27017/comments'
if (process.env.ENV == "production") {
  uri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0-7doi5.mongodb.net/products?retryWrites=true&w=majority`
}
mongoose.Promise = global.Promise;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(
  () => console.log('Connected to the DB')
)
.catch(
  (err) => {
    console.log('DB Connection failed '+ err);
  }
)
var commentsRouter = require('./routes/comments');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

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
