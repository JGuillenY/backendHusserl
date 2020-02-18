var createError = require('http-errors');
var express = require('express');
const basicAuth = require('express-basic-auth')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt');
//var session = require('express-session');
//var MemoryStore = require('connect').session.MemoryStore

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var expresionesRouter = require('./routes/expresiones');
var referenciasRouter = require('./routes/referencias');
var reporteRouter = require('./routes/reporte');
var fixesRouter = require('./routes/fixes');
var verTambien = require('./routes/vertambien');

var acercaRouter = require('./routes/acerca_de');
var manualRouter = require('./routes/manual');

var serverUrl = "127.0.0.1"
//var port = "1859"
var port= "5432"
// var user = "Y2xhZmVub3JfdGVybXVzZQ=="
// var password = "Q2w0ZjNuMHJfdDNybXVzMw=="

var userList = []
var pgp = require("pg-promise")(/*options*/);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.rol = "admin"

//app.use(session({
   // secret: "secret",
  //  store: new MemoryStore({reapInterval: 60000 * 10})
//}));

// app.use(basicAuth({
//    	authorizer: (user, password, authorize) => {
//        console.log("Entra al auth.")
//      	  var connectionString = "postgres://clafenor_termuse:Cl4f3n0r_t3rmus3@"+serverUrl+":"+port+"/clafenor_terminos";
//      	  pgp(connectionString).query("SELECT users.email as user, users.user_password as password FROM users;").then((data)=>{
//             console.log("data:")
//             console.log(data)
//             var userList = data;
//             var flag = false;
//             console.log(user)
//             for(var i in userList){
//                 if(userList[i].user == user){           
//                     flag = true
//                     bcrypt.compare(password, userList[i].password, function(err, res) {
//                         if(res){
//                             switch(user){
//                                 case " guest":
//                                     global.rol = "guest" 
//                                     break
//                                 case "azirionq":
//                                     global.rol = "admin"
//                                     break
//                                 default:
//                                     global.rol = "public"
//                                     break
//                             } 
//                             return authorize(null, true)
//                         }else{
//                             return authorize(null, false)
//                         }
//                     })
//                 }
//             }
//             if(!flag){
//               console.log("not found.")
//               return authorize(null, false)
//             }
//         }).catch((error)=>{
//           console.log("ERROR DE CONEXION.")
//           console.log(error)
//           return authorize(null, false)
//         })
//    },
//    authorizeAsync: true,
// //   challenge: true,
//    unauthorizedResponse: "No estás autorizado para ver este contenido. You are not authorized to see this content."
//    })
// )

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, WWW-Authenticate");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  var connectionString = "postgres://clafenor_termuse:Cl4f3n0r_t3rmus3@"+serverUrl+":"+port+"/clafenor_terminos";
  res.locals.connection = pgp(connectionString)
  next()
});

app.use('/api/v1.0', indexRouter);
app.use('/api/v1.0/reporte', reporteRouter);
app.use('/api/v1.0/login', loginRouter);
app.use('/api/v1.0/expresiones', expresionesRouter);
app.use('/api/v1.0/referencias', referenciasRouter);

app.use('/api/v1.0/acerca_de', acercaRouter);
app.use('/api/v1.0/manual', manualRouter);
app.use('/api/v1.0/vertambien', verTambien)


// http://localhost:1938/api/v1.0/expresiones/
//app.use('/fixes', fixesRouter);

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
