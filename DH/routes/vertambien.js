var express = require('express');
//var bcrypt = require('bcrypt');
var router = express.Router();

router.get('/:id', function(req, res, next){
    if(global.rol == "admin"){
		var currentdate = new Date();
		var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
			+ "/" + currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = [req.params.id]
		res.locals.connection.query("select termino.t_term_es as traduccion, termino.t_term_de as expresion, termino.t_id as id\
            from vertambien inner join termino on termino.t_id = ver_b where ver_a=$1;", filter)
		.then(function(data){
            console.log(data)
            res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
		}).catch(function(error){
			console.log(datetime + "== expresiones/nuevaExpresion/ | " + error)
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		})
	}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/:id/:vt', function(req, res, next){
	console.log(global.rol)
	if(global.rol == "admin"){
		var currentdate = new Date();
        var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
            + "/" + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = [req.params.id, req.params.vt]
        var queryString = "INSERT INTO vertambien (ver_a, ver_b) VALUES ($1, $2);";
        console.log(queryString)
        res.locals.connection.query(queryString, filter)
        .then(function(results){
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }).catch(function(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        })
    }else{
        res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));
    }
});

router.delete('/:id/:vt', function(req, res, next){
	if(global.rol == "admin"){
        var currentdate = new Date();
        var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
            + "/" + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = [parseInt(req.params.id), parseInt(req.params.vt)]
        var queryString = "\
        DELETE FROM vertambien WHERE ver_a=$1 AND ver_b=$2;";
        console.log(queryString, filter)
        res.locals.connection.query(queryString, filter)
        .then(function(results){
            console.log(datetime + "== expresiones/eliminarRelacion/:hijo/:padre | Términos relacionados eliminados con éxito")
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }).catch(function(error){
            console.log(datetime + "== expresiones/eliminarRelacion/:hijo/:padre | " + error)
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        })}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));
    }
});

module.exports = router;
