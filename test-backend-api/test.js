var express = require('express');
var path = require('path');
var logger = require('morgan');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


  // catch 404 and forward to error handler
//   app.use(function(req, res, next) {
//     next(createError(404));
//   });

let globalCounter = 0;

app.get('/', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-type', 'application/json')
    if (globalCounter > 0)
      res.status(200).send();
    else {
      res.status(404)
      res.send({role: 'error occur', email: 'blockeds user', password:'incorrect', code: 12312})
    }

    globalCounter++;
})
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


  var server = http.createServer(app);

  server.listen(3000);
