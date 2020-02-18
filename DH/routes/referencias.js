var express = require('express');
//var bcrypt = require('bcrypt');
var router = express.Router();
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'queryprincipal');

router.post('/agregarReferencia', function(req, res, next){
    if(global.rol == "admin"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString2 = "insert into termino_referencia(tr_termid, tr_refid, tr_order) values($1,$2,$3);";
    // console.log(queryString2)
    var filter2 = [req.body.termId, req.body.referencia, req.body.orden]
    // console.log(filter2)
    res.locals.connection.query(queryString2, filter2).then(function(response){
        // console.log(datetime + "== referencias/agregarReferencia/ | Referencia agregada con éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": "DONE!"}));
    }).catch(function(error){
        // console.log(datetime + "== referencias/agregarReferencia/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    })}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.get('/lista', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var queryString = "select distinct ref_id, ref_libro_de, ref_libro_es, clave from referencia order by ref_libro_de;";
    res.locals.connection.query(queryString)
    .then(function (results) {
        // console.log(datetime + "== referencias/lista/ | Éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        console.log(datetime + "== referencias/lista/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.get('/:id', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    filter = [req.params.id]
    var queryString = "select distinct * from referencia where ref_id = $1";
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
    //   console.log(datetime + "== referencias/:id/ | Éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        // console.log(datetime + "== referencias/:id/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.get('/obtieneReferencias/:id', function(req, res, next) {
    // console.log("ENTRA")
  if(global.rol != "guest"){
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var filter = [req.params.id]
    var queryString = "\
    select * from\
    (select distinct\
	termino.t_term_de as expresion_original,\
    termino.t_term_es as expresion_traduccion,\
    termino.t_id as id,\
    termino.t_em_de as epretty,\
    termino.t_em_es as tpretty,\
    termino.t_index_de as index_de,\
    termino.t_index_es as index_es,\
    termino_referencia.tr_refid as refid,\
    termino_referencia.tr_order as orden,\
    referencia.clave as clave,\
	referencia.ref_libro_de as ref_original,\
	referencia.ref_libro_es as ref_traduccion,\
	referencia.ref_def_de as pasaje_original,\
	referencia.ref_def_es as pasaje_traduccion\
    from\
        termino\
        inner join termino_referencia\
        on termino.t_id = CAST(termino_referencia.tr_termid AS INT)\
        inner join referencia\
        on termino_referencia.tr_refid = referencia.ref_id\
    where\
    termino.t_id = $1) Sub order by expresion_original, orden, \
    CASE WHEN clave = 'IP' THEN 1 \
      WHEN clave = 'PW' THEN 2 \
      WHEN clave = 'I1' THEN 3 \
      WHEN clave = 'I2' THEN 4 \
      WHEN clave = 'PV' THEN 5 \
      WHEN clave = 'CM' THEN 6 \
     END, refid;";
    //  console.log(queryString)
	res.locals.connection.query(queryString, filter)
    .then(function(results){
        // console.log("results  ",results)
        // console.log(datetime + "== referencias/obtieneReferencias/:id/ | Referencia obtenida con éxito")
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }).catch(function(error){
        // console.log(datetime + "== referencias/obtieneReferencias/:id/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
    })}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/obtieneReferenciasByRef/:refid', function(req, res, next) {
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
      + "/" + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var filter = [req.params.refid]
    var queryString = "\
    SELECT * FROM \
    (select distinct\
    termino.t_id as id,\
	termino.t_term_de as expresion_original,\
    termino.t_term_es as expresion_traduccion,\
    termino.t_em_de as epretty,\
	termino.t_em_es as tpretty,\
    termino_referencia.tr_refid as refid,\
    termino_referencia.tr_order as orden,\
	referencia.clave as clave,\
	referencia.ref_libro_de as ref_original,\
	referencia.ref_libro_es as ref_traduccion,\
	referencia.ref_def_de as pasaje_original,\
	referencia.ref_def_es as pasaje_traduccion\
    from\
        termino\
        inner join termino_referencia\
        on termino.t_id = CAST(termino_referencia.tr_termid AS INT)\
        inner join referencia\
        on termino_referencia.tr_refid = referencia.ref_id\
    where\
    termino_referencia.tr_refid = $1) Sub order by expresion_original, orden, \
    CASE WHEN clave = 'IP' THEN 1 \
      WHEN clave = 'PW' THEN 2 \
      WHEN clave = 'I1' THEN 3 \
      WHEN clave = 'I2' THEN 4 \
      WHEN clave = 'PV' THEN 5 \
      WHEN clave = 'CM' THEN 6 \
     END, refid;";
	res.locals.connection.query(queryString, filter)
    .then(function(results){
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }).catch(function(error){
        res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
    })}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/obtieneReferenciasIdRefId/:id/:refid', function(req, res, next) {
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
      + "/" + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var filter = [req.params.refid,req.params.id]
    var queryString = "\
    SELECT * FROM \
    (select distinct\
    termino.t_id as id,\
	termino.t_term_de as expresion_original,\
    termino.t_term_es as expresion_traduccion,\
    termino.t_em_de as epretty,\
	termino.t_em_es as tpretty,\
    termino_referencia.tr_refid as refid,\
    termino_referencia.tr_order as orden,\
	referencia.clave as clave,\
	referencia.ref_libro_de as ref_original,\
	referencia.ref_libro_es as ref_traduccion,\
	referencia.ref_def_de as pasaje_original,\
	referencia.ref_def_es as pasaje_traduccion\
    from\
        termino\
        inner join termino_referencia\
        on termino.t_id = CAST(termino_referencia.tr_termid AS INT)\
        inner join referencia\
        on termino_referencia.tr_refid = referencia.ref_id\
    where\
    termino_referencia.tr_refid = $1 AND termino.t_id = $2) Sub order by expresion_original, orden, \
    CASE WHEN clave = 'IP' THEN 1 \
      WHEN clave = 'PW' THEN 2 \
      WHEN clave = 'I1' THEN 3 \
      WHEN clave = 'I2' THEN 4 \
      WHEN clave = 'PV' THEN 5 \
      WHEN clave = 'CM' THEN 6 \
     END, refid;";
	res.locals.connection.query(queryString, filter)
    .then(function(results){
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }).catch(function(error){
        res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
    })}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/obtieneReferenciasByTerm/:id', function(req, res, next) {
    if(global.rol != "guest"){
        var currentdate = new Date();
        var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
        + "/" + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = [req.params.id]
        var queryString = "\
        SELECT * FROM\
        (select distinct\
        termino.t_id as id,\
        termino.t_term_de as expresion_original,\
        termino.t_term_es as expresion_traduccion,\
        termino.t_em_de as epretty,\
	    termino.t_em_es as tpretty,\
        termino_referencia.tr_refid as refid,\
        termino_referencia.tr_order as orden,\
        referencia.clave as clave,\
        referencia.ref_libro_de as ref_original,\
        referencia.ref_libro_es as ref_traduccion,\
        referencia.ref_def_de as pasaje_original,\
        referencia.ref_def_es as pasaje_traduccion\
        from\
            termino\
            inner join termino_referencia\
            on termino.t_id = CAST(termino_referencia.tr_termid AS INT)\
            inner join referencia\
            on termino_referencia.tr_refid = referencia.ref_id\
        where\
        termino_referencia.tr_termid = $1) Sub order by expresion_original, orden, \
        CASE WHEN clave = 'IP' THEN 1 \
        WHEN clave = 'PW' THEN 2 \
        WHEN clave = 'I1' THEN 3 \
        WHEN clave = 'I2' THEN 4 \
        WHEN clave = 'PV' THEN 5 \
        WHEN clave = 'CM' THEN 6 \
        END, refid;";
        res.locals.connection.query(queryString, filter)
        .then(function(results){
            // console.log(datetime + "== referencias/obtieneReferenciasByRef/:refid/ | Referencia obtenida con éxito")
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }).catch(function(error){
            // console.log(datetime + "== referencias/obtieneReferenciasByRef/:refid/ | " + error)
            res.send(JSON.stringify({"status": 500, "error": null, "response": null}));
        })
    }else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

router.post('/new/nuevoPasaje/', function(req, res) {
    // console.log("Nuevo")
    if(global.rol == "admin"){
        var ref_id = Buffer.from(req.body.ref_id, 'base64').toString('ascii')
        var pas_de = Buffer.from(req.body.pasaje_de, 'base64').toString('ascii')
        var pas_es = Buffer.from(req.body.pasaje_es, 'base64').toString('ascii');
        var ref_de = Buffer.from(req.body.ref_de, 'base64').toString('ascii');
        var ref_es = Buffer.from(req.body.ref_es, 'base64').toString('ascii');
        res.locals.connection.query("select * from referencia where ref_id=$1;", [ref_id])
        .then(function(result){
            // console.log(result)
            if(result.length <= 0){
                var filter = [req.body.clave, pas_de, pas_es, ref_de, ref_es, ref_id]
                // console.log(filter)
                var queryString = "\
                INSERT INTO referencia (clave, ref_def_de, ref_def_es, ref_libro_es, ref_libro_de, ref_id) VALUES ($1, $2, $3, $4, $5, $6);"
                res.locals.connection.query(queryString, filter)
                .then(function(results){
                    // console.log(results)
                    res.send(JSON.stringify({"status": 200, "error": null, "response": "Hey"}));
                }).catch(function(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                })
            }else{
                res.send(JSON.stringify({"status": 502, "error": "Ya existe el id que quiere guardar.", "response": null}));
            }
        }).catch(function(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        })
    }else{
        res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}))
    }
})

router.post('/editarPasaje/:refid', function(req, res, next){
    if(global.rol == "admin"){
    // console.log("Editar")
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    // console.log(req.body.pasaje_de)
    var pas_de = Buffer.from(req.body.pasaje_de, 'base64').toString('ascii')
    var pas_es = Buffer.from(req.body.pasaje_es, 'base64').toString('ascii');
    var ref_de = Buffer.from(req.body.ref_de, 'base64').toString('ascii');
    var ref_es = Buffer.from(req.body.ref_es, 'base64').toString('ascii');
	var filter = [pas_de, pas_es, ref_es, ref_de, req.params.refid, req.body.clave]
    // console.log(filter)
    var queryString = "\
	UPDATE referencia SET clave = $6, ref_def_de = $1, ref_def_es = $2, ref_libro_es = $3, ref_libro_de = $4 WHERE ref_id = $5;";
	// console.log(queryString)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		//   console.log(datetime + "== referencias/editarPasaje/:refid/ | Pasaje editado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		// console.log(datetime + "== referencias/editarPasaje/:refid/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/buscarPasaje/:refid', function(req, res, next){
    if(global.rol != "guest"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = [req.params.refid]
	var queryString = "\
	SELECT * FROM termino_referencia WHERE tr_refid = $1;";
	// console.log(queryString)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		// console.log(datetime + "== referencias/buscarPasaje/:refid/ | Pasaje encontrado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		// console.log(datetime + "== referencias/buscarPasaje/:refid/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.delete('/eliminarPasaje/:refid', function(req, res, next){
    if(global.rol == "admin"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = [req.params.refid]
	var queryString = "\
	DELETE FROM referencia WHERE ref_id = $1;";
	// console.log(queryString)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		// console.log(datetime + "== referencias/eliminarPasaje/"+ req.params.refid +" | Pasaje eliminado con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		// console.log(datetime + "== referencias/eliminarPasaje/"+ req.params.refid +" | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.delete('/quitarPasaje/:refid/:termid', function(req, res, next){
    if(global.rol == "admin"){
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var filter = [req.params.refid, req.params.termid]
	var queryString = "\
	DELETE FROM termino_referencia WHERE tr_refid = $1 AND tr_termid = $2;";
	// console.log(queryString)
	res.locals.connection.query(queryString, filter)
	.then(function(results){
		// console.log(datetime + "== referencias/quitarPasaje/:refid/ | Pasaje removido con éxito")
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}).catch(function(error){
		// console.log(datetime + "== referencias/quitarPasaje/:refid/ | " + error)
		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	})}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.post('/busquedaExpresion', function(req, res, next){
    if(global.rol != "guest"){
        // console.log("case  ",req.body.case)
        var currentdate = new Date();
        var datetime = currentdate.getDay() + "/"+(currentdate.getMonth() + 1)
        + "/" + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var filter = ["%"+req.body.parametro+"%"]
        var condicion = req.body.case == "true" ? "where termino.t_term_de ilike $1 or termino.t_term_es ilike $1 order by ref_id" : "where termino.t_term_de like $1 or termino.t_term_es like $1 order by ref_id"
        // console.log("condicion ", condicion)
        var queryString="\
        select\
        termino.t_term_de as term_de,\
        termino.t_term_es as term_es,\
        termino.t_index_de as index_de,\
        termino.t_index_es as index_es,\
        termino_referencia.tr_termid as term_id,\
        referencia.ref_id as ref_id,\
        referencia.ref_libro_de as ref_libro_de,\
        referencia.ref_libro_es as ref_libro_es,\
        referencia.ref_def_de as ref_def_de,\
        referencia.ref_def_es as ref_def_es\
        from termino\
        inner join termino_referencia on cast (termino_referencia.tr_termId as int) = cast(termino.t_id as int)\
        inner join referencia on referencia.ref_id = termino_referencia.tr_refid " + condicion
    res.locals.connection.query(queryString, filter)
    .then(function (results) {
        // console.log("results",results)
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
		//   console.log(error)
        // console.log(datetime + "== referencias/:id/ | " + error)
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
})

const fixPasajes = (res, pasaje) =>{
    console.log(pasaje)
    // res.send(pasaje)
    if(pasaje.indexOf("onclick")>-1){
        var posicionInicial = pasaje.indexOf("onclick")-12
        var posicion = posicionInicial + 1
        var posicionFinal = 0
        // console.log(pasajeACortar[posicionInicial])
        while (posicion<pasaje.length){
            if(pasaje[posicion]==">"){
                posicionFinal = posicion
                posicion = pasaje.length
                // console.log("posicion Inicial   ", posicionInicial)
                // console.log("posicion Final  ", posicionFinal)
                var pedazo = pasaje.slice(posicionInicial, posicionFinal+1)
                // console.log("========================================")
                // console.log("pedazo  ", pedazo)
                if(pedazo.indexOf("onclick")>-1){
                    var posicionClick = pedazo.indexOf("onclick")
                    var pedazoClick = pedazo.slice(posicionClick, posicionFinal+1)
                    var refid = pedazoClick.split("'")[1]
                    // console.log(results[i].ref_def_de)
                    res.locals.connection.query("\
                    select referencia.ref_id,\
                    referencia.ref_def_de,\
                    referencia.ref_def_es,\
                    termino_referencia.tr_termid\
                    from referencia\
                    inner join termino_referencia on (termino_referencia.tr_refid) = referencia.ref_id\
                    where referencia.ref_id = $1",[refid]).
                    then(function(resulton){
                        // console.log("========================================")
                        // console.log("PEDAZO",pedazo)
                        // console.log("REFID",refid)
                        // console.log("RESULTON",resulton)
                        // console.log(pedazo)
                        // console.log(results[i].ref_def_de.split(pedazo))
                        // // res.send(resulton)
                        // console.log("========================================")
                        var reemplazo = pasaje.split(pedazo)[0] + "<a href='https://diccionariohusserl.org/#/husserl/pasaje/"+ resulton[0].tr_termid + "/" + refid + "'>" + pasaje.split(pedazo)[1]
                        return fixPasajes(res, reemplazo)
                    })
                }
            }
            posicion++
        }
    }else return pasaje
}

router.post('/reemplazo',function(req,res){
    // console.log('pitos');
    res.locals.connection.query("\
    select referencia.ref_id,\
    referencia.ref_def_de,\
    referencia.ref_def_es\
    from referencia\
    where referencia.ref_def_de like '%onclick%' or referencia.ref_def_es like '%onclick%';",
    []).
    then(function(results){
        // res.send(results)
        for(var i in results){
            var pasajeResuelto = results[i]
            // console.log(results[i].ref_def_de)
            pasajeResuelto.ref_def_de = fixPasajes(res, results[i].ref_def_de)
            pasajeResuelto.ref_def_es = fixPasajes(res, results[i].ref_def_es)
            console.log(pasajeResuelto)
            res.send(pasajeResuelto)
            // res.locals.connection.query("UPDATE referencia SET ref_def_de = $1, ref_def_es = $2 where ref_id = $3;"),
            // [pasajeResuelto.ref_def_de, pasajeResuelto.ref_def_es, results[i].ref_id]
        }
        // res.send(pasajeResuelto)
    })
})

module.exports = router;
