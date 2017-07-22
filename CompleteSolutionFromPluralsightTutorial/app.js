var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
//1.
var sql = require('mssql');
//2.
var config = {
    server: 'testapplicationsaqs.database.windows.net',
    user: 'remoteuser',
    password: 'Password1!',
    database: 'testNodejsAppaqs',
    options: {
       
        //the username above should have granted permissions in order to access this DB.
      
        encrypt: true
    }
};
sql.connect(config, function (err) { 
//new sql.Connection(config);///, function (err) {
   console.log(err);
});
 var nav=[{
                Link: '/books',
                Text: 'Book'
        },
            {
                Link: '/Authors',
                Text: 'Auther'
            }];
var bookRoute = require('./routes/book')(nav);
var adminRoute = require('./routes/Admin')(nav); 
var authRoute = require('./routes/auth')(nav); 

//var port = "1000";
//app.set('port', port);

//module.exports = app;


var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cookieParser());
 app.use(session({
     secret: 'library', resave: true,
     saveUninitialized: true}));
 app.use(passport.initialize());
 app.use(passport.session());

 require('./config/passport')(app);
app.set('Views', './views');
app.get('/', function (req, res) {
    res.render('index', {
        title: 'index ejs',
        list: ['a', 'b', 'c'],
        nav: [{
                Link: '/books',
                Text: 'Books'
            },
            {
                Link: '/Authors',
                Text: 'Authers'
            }]
    });
});

app.use('/books', bookRoute);
app.use('/Admin', adminRoute);  
app.use('/auth', authRoute);  
//app.get('/books', function (req, res) {

//    res.send('hello books');
//});

app.set('view engine', 'ejs');






//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

//var app = express();

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//

//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));


//app.use('/', routes);
//app.use('/users', users);

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


module.exports = app;
