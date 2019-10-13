var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

let uri = 'mongodb://localhost:27017/comments'
if (process.env.NODE_ENV == "production") {
  uri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0-usyae.mongodb.net/comments?retryWrites=true&w=majority`
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

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/users', usersRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'view/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/build/index.html'))
})

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
