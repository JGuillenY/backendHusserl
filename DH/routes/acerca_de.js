var express = require('express');
//var bcrypt = require('bcrypt');
var router = express.Router();

router.get('/get', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
	   + "/" + currentdate.getFullYear() + " @ "
     + currentdate.getHours() + ":"
	   + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = "\
    select\
	* from config where id = 0";
    res.locals.connection.query(queryString)
    .then(function (results) {
        obj = results
        console.log(datetime + "== acerca_de/get/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        console.log(datetime + "== acerca_de/get/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/update', function(req, res, next){
  if(global.rol == "admin"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.body.content]
    var queryString = "update config set contenido = $1 where id = 0";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        obj = results
      console.log(datetime + "== acerca_de/update/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        console.log(datetime + "== acerca_de/update/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/updateD', function(req, res, next){
  if(global.rol == "admin"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log(req.body.content)
    filter = [req.body.content]
    var queryString = "update config set contenido_de = $1 where id = 0";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        obj = results
        console.log(datetime + "== acerca_de/updateD/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
      console.log(datetime + "== acerca_de/updateD/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/updateE', function(req, res, next){
  if(global.rol == "admin"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.body.content]
    var queryString = "update config set contenido_en = $1 where id = 0";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        obj = results
        console.log(datetime + "== acerca_de/updateE/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
      console.log(datetime + "== acerca_de/updateE/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/updateF', function(req, res, next){
  if(global.rol == "admin"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.body.content]
    var queryString = "update config set contenido_fr = $1 where id = 0";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        obj = results
        console.log(datetime + "== acerca_de/updateF/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
      console.log(datetime + "== acerca_de/updateF/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/updateC', function(req, res, next){
  if(global.rol == "admin"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.body.content]
    var queryString = "update config set contenido_ca = $1 where id = 0";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        obj = results
        console.log(datetime + "== acerca_de/updateC/ | Exitoso")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
      console.log(datetime + "== acerca_de/updateC/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

module.exports = router;
