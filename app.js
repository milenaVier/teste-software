var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const errorHandler = require('./middlewares/errorHandler');


const sequelize = require('./config/database');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRoutes = require("./modules/user/userRoutes");
// var itemRoutes = require(".modules/item/itemRoutes");
// var messagesRouter = require("./modules/messages/messagesRoutes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'frase_secreta_aqui',   // mude isso!
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.user = req.session.user || null; // Globaliza o objeto user para as views
    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRoutes);
// app.use('/', itemRoutes);
// app.use('/', messagesRoutes)

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

app.use(errorHandler);

require("./config/associations");

sequelize.sync({ alter: true })
    .then(() => console.log('Banco de dados sincronizado!'))
    .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = app;
