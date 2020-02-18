var express = require('express');
//var bcrypt = require('bcrypt');
var router = express.Router();

router.post('/nuevaExpresion', function(req, res, next){
	console.log(global.rol)
	if(global.rol == "admin"){
		var currentdate = new Date();
		var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
			+ "/" + currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
		res.locals.connection.query("select MAX(t_id) as count from termino;")
		.then(function(qty){
		//		obj = results
			console.log(qty)
			var filter = [parseInt(qty[0].count) + 1, req.body.traduccion, req.body.expresion, req.body.indice_de, req.body.indice_es, req.body.pretty_de, req.body.pretty_es]
			console.log(filter)
			var queryString = "\
			insert into termino (t_id, t_term_es, t_term_de, t_index_de, t_index_es, t_em_de, t_em_es) values ($1, $2, $3, $4, $5, $6, $7)";
			console.log(queryString)
			res.locals.connection.query(queryString, filter)
			.then(function(results){
				console.log(datetime + "== expresiones/nuevaExpresion/ | Nueva expresión guardada con éxito| Expresion:" + req.body.expresion)
				res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
			}).catch(function(error){
				console.log(datetime + "== expresiones/nuevaExpresion/ | " + error)
				res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			})
		}).catch(function(error){
			console.log(datetime + "== expresiones/nuevaExpresion/ | " + error)
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		})
	}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.post('/updateExpresion/:id', function(req, res, next){
	if(global.rol == "admin"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = [req.params.id, req.body.traduccion, req.body.expresion, req.body.indice_de, req.body.indice_es, req.body.pretty_de, req.body.pretty_es]
                console.log(filter)
        var queryString = "\
                update termino set t_term_es = $2, t_term_de = $3, t_index_de = $4, t_index_es = $5, t_em_de = $6, t_em_es = $7 where t_id = $1;"
	console.log(queryString)
	console.log(filter)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		console.log(datetime + "== expresiones/updateExpresion/:id/ | Expresión cambiada con éxito | Expresion:" + req.query.expresion)
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	}).catch(function(error){
			console.log(datetime + "== expresiones/updateExpresion/:id/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.delete('/deleteExpresion/:id', function(req, res, next){
	if(global.rol == "admin"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = [req.params.id]
	var queryString = "\
	delete from termino where t_id = $1";
	console.log(filter)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		console.log(datetime + "== expresiones/deleteExpresion/:id/ | Expresión borrada con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/deleteExpresion/:id/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/todas/:letra', function(req, res, next){
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var conditionPart = ""
	conditionPart = "WHERE termino.t_index_de = '" + req.params.letra + "'"
	var queryString = "\
	SELECT \
		termino.t_id AS id, termino.t_index_es AS indice_es, termino.t_index_de AS indice_de,\
		termino.t_term_es AS expresion_es, termino.t_term_de AS expresion_de,\
		termino.t_em_es AS pretty_es, termino.t_em_de AS pretty_de from termino ";
	queryString += conditionPart
	queryString += " ORDER BY expresion_de;"
	console.log(queryString)
	res.locals.connection.query(queryString)
	.then(function(results){
		console.log(datetime + "== expresiones/todas/:letra/ | Término seleccionado por letra con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/todas/:letra/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/getAllList', function(req, res, next){
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var queryString = "\
	SELECT * FROM termino ORDER BY t_term_de;";
	console.log(queryString)
	res.locals.connection.query(queryString)
	.then(function(results){
		console.log(datetime + "== expresiones/getAllList | Lista seleccionada con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/getAllList  | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/al/:letra', function(req, res, next){
	console.log(global.rol)
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var conditionPart = ""
	conditionPart = "WHERE termino.t_index_de = '" + req.params.letra + "'"
	console.log(req.params.letra)
	var queryString = "\
	SELECT * FROM ( \
		SELECT DISTINCT \
			termino.t_id AS id, \
			termino.t_index_es AS index_es,\
                        termino.t_index_de AS index_de,\
			termino.t_term_es AS traduccion, \
			termino.t_term_de AS expresion, \
			termino.t_em_de AS pretty_e,\
			termino.t_em_es AS pretty_t,\
			termref.tr_refid AS refId, \
			termref.tr_order AS orden, \
			referencia.clave AS clave, \
			referencia.ref_libro_de AS referencia_original, \
			referencia.ref_libro_es AS referencia_traduccion  \
	FROM \
			termino LEFT JOIN \
			termino_referencia AS termref \
			ON termino.t_id = CAST(termref.tr_termid AS int)  \
			LEFT JOIN referencia  \
			ON termref.tr_refid = referencia.ref_id " + conditionPart + ") Sub ORDER BY expresion, id, orden, \
			CASE WHEN clave = 'IP' THEN 1 \
		      WHEN clave = 'PW' THEN 2 \
		      WHEN clave = 'I1' THEN 3 \
		      WHEN clave = 'I2' THEN 4 \
		      WHEN clave = 'PV' THEN 5 \
		      WHEN clave LIKE 'CM' THEN 6 \
		 	END, refid;"
	console.log(queryString)
	res.locals.connection.query(queryString)
	.then(function(results){
		console.log(datetime + "== expresiones/al/:letra | Término en aleman encontrado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/al/:letra  | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/es/:letra', function(req, res, next){
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var conditionPart = ""
	conditionPart = "WHERE termino.t_index_es = '" + req.params.letra + "'"
	var queryString = "\
	SELECT * FROM ( \
		SELECT DISTINCT \
			termino.t_id AS id, \
			termino.t_index_es AS index_es,\
			termino.t_index_de AS index_de,\
			termino.t_em_de AS pretty_t, \
			termino.t_em_es AS pretty_e,\
			termino.t_term_es AS expresion, \
			termino.t_term_de AS traduccion, \
			termref.tr_refid AS refId, \
			termref.tr_order AS orden, \
			referencia.clave AS clave, \
			referencia.ref_libro_de AS referencia_traduccion, \
			referencia.ref_libro_es AS referencia_original  \
	FROM \
			termino LEFT JOIN \
			termino_referencia AS termref \
			ON termino.t_id = CAST(termref.tr_termid AS int)  \
			LEFT JOIN referencia  \
			ON termref.tr_refid = referencia.ref_id " + conditionPart + ") Sub ORDER BY expresion, id, orden, \
			CASE WHEN clave = 'IP' THEN 1 \
		      WHEN clave = 'PW' THEN 2 \
		      WHEN clave = 'I1' THEN 3 \
		      WHEN clave = 'I2' THEN 4 \
		      WHEN clave = 'PV' THEN 5 \
		      WHEN clave LIKE 'CM' THEN 6 \
		 	END, refid;"
	console.log(queryString)
	res.locals.connection.query(queryString)
	.then(function(results){
		console.log(datetime + "== expresiones/es/:letra | Término en español encontrado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/es/:letra  | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/:lang/abuelosList/:expresion', function(req, res, next){
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	switch(req.params.lang){
		case "es":
			var queryString = "select distinct parentezco.p_padre as padre, parentezco.p_hijo as id, termino.t_term_es as expresion, termino.t_index_de as index_de, termino.t_index_es as index_es, termino.t_index_es as indice from parentezco inner join\
		termino on cast(parentezco.p_padre as int) = cast(termino.t_id as int) where parentezco.p_hijo = $1;";
			break;
		case "al":
			var queryString = "select distinct parentezco.p_padre as padre, parentezco.p_hijo as id, termino.t_term_de as expresion, termino.t_index_de as index_de, termino.t_index_es as index_es, termino.t_index_de as indice from parentezco inner join\
		termino on cast(parentezco.p_padre as int) = cast(termino.t_id as int) where parentezco.p_hijo = $1;";
			break
	}
	res.locals.connection.query(queryString, [req.params.expresion])
	.then(function(results){
		console.log(results)
		console.log(datetime + "== expresiones/abuelosList/:expresion | Término superior encontrado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/abuelosList/:expresion  | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/:lang/hijosList/:expresion', function(req, res, next){
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	// var queryString = "select distinct parentezco.p_padre as id, parentezco.p_hijo as hijo, termino.t_term_de as expresion from parentezco inner join\
	// termino on cast(parentezco.p_hijo as int) = cast(termino.t_id as int) where parentezco.p_padre = $1;";
	switch(req.params.lang){
		case "es":
			var queryString = "select distinct parentezco.p_padre as id, parentezco.p_hijo as hijo, termino.t_term_es as expresion, termino.t_index_de as index_de, termino.t_index_es as index_es, termino.t_index_es as indice from parentezco inner join\
		termino on cast(parentezco.p_hijo as int) = cast(termino.t_id as int) where parentezco.p_padre = $1;";
			break;
		case "al":
			var queryString = "select distinct parentezco.p_padre as id, parentezco.p_hijo as hijo, termino.t_term_de as expresion, termino.t_index_de as index_de, termino.t_index_es as index_es, termino.t_index_de as indice from parentezco inner join\
		termino on cast(parentezco.p_hijo as int) = cast(termino.t_id as int) where parentezco.p_padre = $1;";
			break
	}
	console.log(queryString)
	res.locals.connection.query(queryString, [req.params.expresion])
	.then(function(results){
		console.log(datetime + "== expresiones/hijosList/:expresion | Término inferior encontrado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/hijosList/:expresion | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/getHierarchy/:expresion', function(req, res, next) {
	if(global.rol != "guest"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	filter = [req.params.expresion]
	var queryString = "\
		SELECT  DISTINCT\
	    parentezco.p_hijo id,\
	    term.t_term_es AS traduccion,\
		term.t_term_de AS expresion,\
		termref.tr_refid AS refid,\
		referencia.ref_libro_de AS referencia_original,\
		referencia.ref_libro_es AS referencia_traduccion\
	 	FROM\
		termino\
	    INNER JOIN parentezco \
	    ON termino.t_id = cast(parentezco.p_padre AS INT)\
	    INNER JOIN termino as term\
		ON CAST(parentezco.p_hijo AS INT) = term.t_id\
		INNER JOIN termino_referencia as termref\
		ON parentezco.p_hijo = termref.tr_termid\
		INNER JOIN referencia\
	    ON termref.tr_refid = referencia.ref_id\
		WHERE\
		termino.t_id = $1;"
	var queryString2 = "\
		SELECT  DISTINCT\
		parentezco.p_padre AS id,\
		term.t_term_es AS traduccion,\
		term.t_term_de AS expresion,\
		termref.tr_refid AS refid,\
		referencia.ref_libro_de AS referencia_original,\
		referencia.ref_libro_es AS referencia_traduccion\
		FROM\
		termino \
		INNER JOIN parentezco \
		ON termino.t_id = cast(parentezco.p_hijo AS INT)\
		INNER JOIN termino as term\
		ON CAST(parentezco.p_padre AS INT) = term.t_id\
		INNER JOIN termino_referencia as termref\
		ON parentezco.p_hijo = termref.tr_termid\
		INNER JOIN referencia\
	    ON termref.tr_refid = referencia.ref_id\
		WHERE\
		termino.t_id = $1"
	var queryString3 = "\
		SELECT \
		termino.t_id as id,\
		termino.t_term_es as traduccion,\
		termino.t_term_de as expresion,\
		termref.tr_refid AS refid,\
		termref.tr_order AS orden\
		FROM termino\
		INNER JOIN termino_referencia as termref\
		ON termino.t_id = CAST(termref.tr_termid AS INT)\
		WHERE\
		termino.t_id = $1\
		ORDER BY orden\
		LIMIT 1;"
	res.locals.connection.query(queryString, filter)
	.then(function(results1){
		var hijos_list = results1
		console.log("hijos > ")
		console.log(hijos_list)
		res.locals.connection.query(queryString2, filter)
		.then(function(results2){
			var abuelos_list = results2
			console.log("abuelos > ")
			console.log(abuelos_list)
			res.locals.connection.query(queryString3, filter)
			.then(function(results3){
				var jerarquia = results3[0]
				console.log(jerarquia)
				jerarquia["hijos"] = hijos_list
				jerarquia["abuelos"] = abuelos_list
				console.log(datetime + "== expresiones/getHierarchy/:expresion | Jerarquia encontrada con éxito")
				res.send(JSON.stringify({"status": 200, "error": null, "response": jerarquia}));
			}).catch(function(error){
				console.log(datetime + "== expresiones/getHierarchy/:expresion | " + error)
				res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			})
		}).catch(function(error){
			console.log(datetime + "== expresiones/getHierarchy/:expresion | " + error)
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		})
	}).catch(function(error){
		console.log(datetime + "== expresiones/getHierarchy/:expresion | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.post('/agregarHijo/:id', function(req, res, next){
	if(global.rol == "admin"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var queryString = "\
	INSERT INTO parentezco (p_padre, p_hijo, p_idioma) VALUES ($1, $2, 'al');";
		var filter = [req.params.id, req.body.hijo]
		console.log(filter)
		res.locals.connection.query(queryString, filter)
		.then(function(results){
			console.log(datetime + "== expresiones/agregarHijo/:id | Término inferior agregado con éxito")
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}).catch(function(error){
			console.log(datetime + "== expresiones/agregarHijo/:id | " + error)
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		})
	}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.post('/agregarPadre/:id', function(req, res, next){
	if(global.rol == "admin"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var queryString = "\
	INSERT INTO parentezco (p_padre, p_hijo, p_idioma) VALUES ($2, $1, 'al');";
		var filter = [req.params.id, req.body.padre]
		res.locals.connection.query(queryString, filter)
		.then(function(results){
			console.log(datetime + "== expresiones/agregarPadre/:id | Término superior agregado con éxito")
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}).catch(function(error){
				console.log(datetime + "== expresiones/agregarPadre/:id | " + error)
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		})
	}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.delete('/eliminarRelacion/:hijo/:padre', function(req, res, next){
	if(global.rol == "admin"){
	var currentdate = new Date();
	var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = [req.params.hijo, req.params.padre]
	var queryString = "\
	DELETE FROM parentezco WHERE p_hijo = $1 AND p_padre = $2;";
	console.log(queryString)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		console.log(datetime + "== expresiones/eliminarRelacion/:hijo/:padre | Términos relacionados eliminados con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		console.log(datetime + "== expresiones/eliminarRelacion/:hijo/:padre | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/byId/:id', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.params.id]
	var queryString = "select distinct t_term_es as expresion_traduccion,\
	t_term_de as expresion_original, t_id as id, t_em_de as epretty,\
	t_em_es as epretty \
	from termino where t_id = $1";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
      console.log(datetime + "== referencias/:id/ | Éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        console.log(datetime + "== referencias/:id/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/busqueda/:case', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
	+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = ["%"+req.body.parametro+"%"]
	var condicion = req.params.case == "true" ? "where referencia.ref_def_de ilike $1 or referencia.ref_def_es ilike $1 order by ref_id" : "where referencia.ref_def_de like $1 or referencia.ref_def_es like $1 order by ref_id"
	var queryString="\
	select\
		referencia.ref_id as ref_id,\
		referencia.ref_libro_de as ref_libro_de,\
		referencia.ref_libro_es as ref_libro_es,\
		referencia.ref_def_de as ref_original,\
		referencia.ref_def_es as ref_traduccion,\
		termino_referencia.tr_termId as t_id,\
		termino_referencia.tr_order as orden,\
		termino.t_term_es as expresion_traduccion,\
		termino.t_term_de as expresion_original\
	from referencia\
	inner join termino_referencia on referencia.ref_id = termino_referencia.tr_refid\
	inner join termino on cast (termino_referencia.tr_termId as int) = cast(termino.t_id as int)" + condicion
	console.log(filter, queryString)
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
		console.log("resultados", results)
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
		  console.log(error)
        // console.log(datetime + "== referencias/:id/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

module.exports = router;
