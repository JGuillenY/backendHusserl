var express = require('express');
//var bcrypt = require('bcrypt');
var debug = require('debug')('backend:server');
var router = express.Router();
const nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var security = require('../custom_modules/security');

var serverUrl = "132.248.184.95"

router.get('/all', function(req, res){
    var currentdate = new Date();
      var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
          + "/" + currentdate.getFullYear() + " @ "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var queryString = 'SELECT * FROM users ORDER BY id;';
    //   var filter = [req.query.userId];
    //   var password = req.query.password;
      res.locals.connection.query(queryString)
      .then(function (results){
        // console.log(results)
        // if(results[0].user_password == password){
        console.log(datetime + "== logins/ | Usuario reconocido con éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        // }else
            // res.send(JSON.stringify({"status": 500, "error": "Password incorrecto", "response": null}));
      }).catch(function(error) {
          console.log(datetime + "== logins/admin | " + error);
      })
  })

router.post('/usuario', function(req, res){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = 'SELECT * FROM users WHERE email = $1;';
    var filter = [req.body.userId];
    var password = req.body.password;
    var user = {}
    console.log(queryString)
    res.locals.connection.query(queryString, filter)
    .then(function (results){
        console.log(results)
        user = results[0]
        if(results.length < 1){
            console.log(datetime + "== logins/usuario | Usuario inexistente. Usuario: " + user)
            res.send(JSON.stringify({"status": 500, "error": "Usuario inexistente", "response": null}));
        }else{
            bcrypt.compare(password, results[0].user_password, function(err, res2) {
            if(res2) {
                res.locals.connection.query("UPDATE users SET lastaccess = now() WHERE email = $1;", filter)
                .then(function (results){
                    console.log(datetime + "== logins/usuario | Usuario guardado con éxito. Usuario: " + user.email)
                    res.send(JSON.stringify({"status": 200, "error": null, "response": user.email}));
                }).catch(function(error){
                    console.log(datetime + "== logins/usuario | Error al registrar nuevo acceso")
                    res.send(JSON.stringify({"status": 500, "error": "Password incorrecto", "response": null}));
                })
            }else{
                console.log(datetime + "== logins/usuario | Error al registrar nuevo acceso. Usuario: " + user.email)
                res.send(JSON.stringify({"status": 500, "error": "Password incorrecto", "response": null}));
            }})
        }
    }).catch(function(error) {
        console.log(datetime + "== logins/usuario | " + error);
    })
})

router.get('/admin', function(req, res){
  var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = 'SELECT * FROM administrador WHERE email = $1;';
    var filter = [req.query.userId];
    var password = req.query.password;
    res.locals.connection.query(queryString, filter)
    .then(function (results){
        console.log(results)
        if(results.length < 1){
            console.log(datetime + "== logins/admin | " + error)
            res.send(JSON.stringify({"status": 500, "error": "Usuario inexistente", "response": null}));
        }else{
            if(results[0].user_password == password){
                console.log(datetime + "== logins/usuario | Usuario reconocido con éxito")
                res.send(JSON.stringify({"status": 200, "error": null, "response": results[0]}));
            }else
                res.send(JSON.stringify({"status": 500, "error": "Password incorrecto", "response": null}));
        }
    }).catch(function(error) {
        console.log(datetime + "== logins/admin | " + error);
    })
})

router.get('/checkUserExistence/:email', function(req, res){
    var currentdate = new Date();
	  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		  + "/" + currentdate.getFullYear() + " @ "
		  + currentdate.getHours() + ":"
		  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = 'SELECT * FROM users WHERE email = $1;';
    var filter = [req.params.email];
    res.locals.connection.query(queryString, filter)
    .then(function (results){
        if(results.length < 1){
            console.log(datetime + "== logins/checkUserExistence/:email | " + error)
            res.send(JSON.stringify({"status": 500, "error": "Usuario inexistente", "response": null}));
        }else{
            if(results[0].user_password == password){
                console.log(datetime + "== logins/checkUserExistence/:email | Usuario reconocido con éxito")
                res.send(JSON.stringify({"status": 200, "error": null, "response": results[0]}));
            }else
                res.send(JSON.stringify({"status": 500, "error": "Password incorrecto", "response": null}));
        }
    }).catch(function(error) {
        console.log(datetime + "== logins/checkUserExistence/:email | " + error);
    })
})

router.post('/updatePassword/:email',function(req, res){
  if(req.params.email == " guest" || req.params.email == "azirionq"){
	res.send(JSON.stringify({"status": 401, "error": "Acción imposible de realizar.", "response": null}));
  }else{var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = 'UPDATE users SET user_password = $1 WHERE email = $2;';
    console.log(req.body.pass)
    bcrypt.hash(req.body.pass, 10, function(err, hash) {
        console.log('hash:' + hash)
        var filter = [hash, req.params.email];
        console.log(filter)
        res.locals.connection.query(queryString, filter)
        .then(function (results){
          console.log(datetime + "== logins/updatePassword/:email | Registro exitoso")
            res.send(JSON.stringify({"status": 200, "error": null, "response": "Registro exitoso!"}));
        }).catch(function(error) {
          console.log(datetime + "== logins/updatePassword/:email | " + error)
            res.send(JSON.stringify({"status": 500, "error": "Hubo un error en el servicio", "response": null}));
        })
    });}
})

router.get('/eraseRegister/:email', function(req, res){
  if(req.params.email == "azirionq" || req.params.email == " guest"){
        res.send(JSON.stringify({"status": 401, "error": "Acción imposible de realizar.", "response": null}));
  }else{var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString0 = 'SELECT * FROM users WHERE email = $1;';
    var queryString = 'DELETE FROM users WHERE email = $1;';
    var filter = [req.params.email];
    res.locals.connection.query(queryString0, filter)
    .then(function (results){
        console.log(results)
        bcrypt.compare(req.query.pass, results.user_password, function(err, res) {
            if(res) {
                res.locals.connection.query(queryString, filter)
                .then(function (results){
                    console.log(datetime + "== logins/eraseRegister/:email | Usuario borrado con éxito")
                    res.send(JSON.stringify({"status": 200, "error": null, "response": "Registro exitoso!"}));
                }).catch(function(error) {
                    console.log(datetime + "== logins/eraseRegister/:email | " + error)
                    res.send(JSON.stringify({"status": 500, "error": "Hubo un error en el servicio", "response": null}));
                })
            } else {
              console.log(datetime + "== logins/eraseRegister/:email | " + error)
             // Passwords don't match
                res.send(JSON.stringify({"status": 505, "error": "Passwords don't match.", "response": null}));
            }
        });
    }).catch(function(error) {
        console.log(datetime + "== logins/eraseRegister/:email | " + error)
        res.send(JSON.stringify({"status": 500, "error": "Hubo un error en el servicio", "response": null}));
    })}
})

router.get('/sendRegistroEmail/:lang',function(req, res){
    var email = "dhusserl.eservice@gmail.com"
    var password = "Padua50!"
    var name = req.query.nombre
    var toEmail = req.query.email
    console.log("lang=" + req.params.lang)
    console.log("email=" + req.query.email)
    console.log("email=" + name)
    switch(req.params.lang){
        case "es":
            var header = "¡Felicidades, " + name + "!"
            var body = "Su registro ha sido exitoso. Ahora puede ingresar al \
            Diccionario Husserl con su usuario y contraseña"
            var here = "aquí"
            var warning = "Si usted no ha realizado ningún registro, por favor haga click "
            var warning2 = " para deshacer el registro."
            var subj = "¡Registro exitoso!"
            var nameCC = "Servicio de Registro DH"
            break;
        case "al":
            var header = "Alles Gute, " + name + "!"
            var body = "Seine Registrierung war erfolgreich. Sie können jetzt ins Husserl Wörterbuch eintreten mit seiner Login-Name und Passwort"
            var here = "hier"
            var warning = "Haben Sie keinen Registrierungversuch vollzogen? Bitte klicken Sie "
            var warning2 = " um die Registrierung aufmachen."
            var subj = "Registrierung war erfolgreich!"
            var nameCC = "SHusserl Wörterbuch Registerdienst"
            break;
        case "en":
            var header = "Congratulations, Mr(s) " + name + "!"
            var body = "Your register has been completed successfully, now you can log in to \
            the Husserl Dictionary Portal with your email and password"
            var here = "here"
            var warning = "If you have not made any attempt to register, please click "
            var warning2 = " to undo the registration."
            var subj = "Register was successfull!"
            var nameCC = "Husserl Dictionary registration service"
            break;
        case "fr":
            var header = "¡Felicidades, " + name + "!"
            var body = "Su registro ha sido completado exitosamente, ahora puede ingresar al \
            portal de Diccionario Husserl con su usuario y contraseña"
            var here = "aquí"
            var warning = "Si usted no ha realizado ningun registro, por favor haga click "
            var warning2 = " para deshacer el registro."
            var subj = "¡Registro exitoso!"
            var nameCC = "Servicio de Registro DH"
            break;
    }
    console.log(header + " " + body + " " + here +" " )
    var foot = '<br/><footer style="height: calc(9vh - 1px);text-align: left;background: rgb(126, 46, 56);box-shadow: grey 0px 2px 10px 5px;"></footer>'
   // var htmlContent = "<h3>" + header + "</h3><hr/><br/><form><p>" + body + "</p><p>" + warning + " <a href='" + serverUrl + "/" + toEmail + "&pass=" + password + "'>" + here + "</a> " + warning2 + "</p></form>" + foot
    // var htmlContent = "<h3>" + header + "</h3><hr/><br/><form><p>" + body + "</p><p>" + warning + " <a href='" + serverUrl + "/" + toEmail + "&pass=" + password + "'>" + here + "</a> " + warning2 + "</p></form>" + foot
    var htmlContent = "<h3>" + header + "</h3><hr/><br/><form><p>" + body + "</p></form>" + foot
    console.log(htmlContent)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email, // generated ethereal user
            pass: password // generated ethereal password
        }
    });

    let mailOptions = {
        from: '"'+nameCC+'" <foo@example.com>', // sender address
        to: toEmail, // list of receivers
        subject: subj, // Subject line
        html: htmlContent // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
	    console.log(error)
            res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
            return console.log(error);
        }
        res.send(JSON.stringify({"status": 200, "error": null, "response": "Envio exitoso"}));
        console.log('Message sent: %s', info.messageId);
    });
})

router.get('/recoverPassword/:lang', function(req, res){
    var email = "dhusserl.eservice@gmail.com"
    var password = "Padua50!"
    var toEmail = req.query.email
    var queryString = 'SELECT * FROM users WHERE email = $1;';
    var filter = [req.query.email];
    console.log("lang=" + req.params.lang)
    console.log("email=" + req.query.email)
    res.locals.connection.query(queryString, filter)
    .then(function (results){
        console.log(results)
        if(results.length > 0){
            var name = results[0].apellidos ? results[0].nombre + " " + results[0].apellidos : results[0].nombre
            console.log(name)
            switch(req.params.lang){
                case "es":
                    var header = "¡Hola, " + name + "!"
                    var body = "Ha sido solicitado un cambio de contraseña; para reemplazarla por una nueva, haga click "
                    var here = "aquí"
                    var warning = "Si usted no ha solicitado un cambio de contraseña, por favor ignore este mensaje."
                    var subj = "Solicitud de Cambio de Contraseñas"
                    var nameCC = "Servicio de Registro DH"
                    break;
                case "al":
                    var header = "Hallo, " + name + "!"
                    var body = "Sie haben ein Passwortwechseln erbitten; um ein neues Passwort bekommen, bitte klicken Sie "
                    var here = "hier"
                    var warning = "Wenn Sie kein Passwortwechseln erbeten haben, bitte lassen Sie diese Message unbeachtet."
                    var subj = "Passwortwechseln Bewerbung"
                    var nameCC = "SHusserl Wörterbuch Registerdienst"
                    break;
                case "en":
                    var header = "Hello, " + name + "!"
                    var body = "You have asked for a change of password; to get a new password, please click "
                    var here = "here"
                    var warning = "If you have not asked for a change of password, please ignore this message."
                    var subj = "Password Recovery Request"
                    var nameCC = "Husserl Dictionary registration service"
                    break;
                case "fr":
                    var header = "¡Hola, Sr(a) " + name + "!"
                    var body = "Ha sido solicitado un cambio de contraseña, para reemplazarla por una nueva, haga click "
                    var here = "aquí"
                    var warning = "Si usted no ha solicitado un cambio de contraseña, por favor ignore este mensaje."
                    var subj = "Solicitud de Cambio de Contraseñas"
                    var nameCC = "Servicio de Registro DH"
                    break;
            }
            var emailEncoded = new Buffer(toEmail).toString('base64')
	    var foot = '<br/><footer style="height: calc(9vh - 1px);text-align: left;background: rgb(126, 46, 56);box-shadow: grey 0px 2px 10px 5px;"></footer>'
            var htmlContent = '<h3>' + header + '</h3><hr/><br/>\
                <p>' + body + here + ' ' + serverUrl + '/diccionario/recoverPassword.html?e=' + emailEncoded + '</p>\
                <p>' + warning + '</p>' + foot
            console.log(htmlContent)
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: email, // generated ethereal user
                    pass: password // generated ethereal password
                }
            });

            let mailOptions = {
                from: '"'+ nameCC +'" <foo@example.com>', // sender address
                to: toEmail, // list of receivers
                subject: subj, // Subject line
                html: htmlContent // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
                    return console.log(error);
                }
                res.send(JSON.stringify({"status": 200, "error": null, "response": "Envio exitoso"}));
                console.log('Message sent: %s', info.messageId);
            });
        }
    }).catch(function(error){
        console.log(error)
        res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
    })
})

router.post('/registrar', function(req, res){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = 'SELECT * FROM users WHERE email = $1;';
    var filter2 = [req.body.email];
    res.locals.connection.query(queryString, filter2)
    .then(function (results){
        if(results.length < 1){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                var filter = [req.body.nombre, req.body.apellidos,req.body.institucion,
                    req.body.pais, req.body.grado,hash, req.body.email];
                res.locals.connection.query("insert into users(nombre, apellidos, institucion, pais, grado, user_password, email, registro, lastaccess) \
                VALUES($1, $2, $3, $4, $5, $6, $7, now(), now())", filter)
                .then(function(results){
                    console.log(datetime + "== logins/registrar | Usuario registrado con éxito")
                    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                }).catch(function(error){
                    console.log(error)
                })
            })
        }else{
            res.send(JSON.stringify({"status": 501, "error": "Ya existe el usuario.", "response": null}));
        }
    }).catch(function(error) {
        console.log(datetime + "== logins/registrar | " + error);
    })
})

module.exports = router;
