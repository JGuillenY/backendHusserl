var express = require('express');
//var bcrypt = require('bcrypt');
var router = express.Router();
var fs = require('fs')
var htmlToText = require('html-to-text');
var conversion = require("phantom-html-to-pdf")();
var createHTML = require('create-html')
var randomstring = require("randomstring");
var os = require( 'os' );
var axios = require('axios');

// var networkInterfaces = os.networkInterfaces( );

// console.log( networkInterfaces );

var filesRoute = "/usr/share/UNAM/DH/public/files/"

function processList(id, res, lista, index, htmlRes, lang, expresion_aleman, referencia_aleman, expresion_espaniol, referencia_espaniol, hierarchy, pasaje_aleman, pasaje_espaniol, final){
    console.log("processing list ", index)
    // console.log(lista)
    // console.log(id, index, results, lang, expresion_aleman, referencia_aleman, expresion_espaniol, referencia_espaniol, hierarchy, pasaje_aleman, pasaje_espaniol)
    if(index == lista.length){
        console.log("FIN")
        htmlRes+="\
            <link rel='stylesheet' href='../public/node_modules/bootstrap/dist/css/bootstrap.min.css'>\
            <style>\
            h3{\
                font-size: 22px;\
                margin: 30px 0px;\
                text-align: center;\
            }\
            h4 {\
                font-size: 20px;\
                text-decoration: underline;\
                margin-bottom: 8px;\
            }\
            h5{\
                font-size: 14px;\
                margin-left: 14px;\
            }\
            h6{\
                font-size: 12px;\
                margin-left: 28px;\
                line-height: 5px;\
            }\
            small{\
                font-size : 10px;\
                margin-left: 56px;\
            }\
            </style></body>"
        return final(htmlRes)
    }
    switch(lang){
        case "es":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expresión en alemán:</strong> "
            var t2 = "<div><h5><strong>Expresión en español:</strong> "
            var t3 = "<div><h5><strong>Referencia en alemán:</strong> "
            var t4 = "<div><h5><strong>Referencia en español:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>Expresiones derivadas</h5>"
            var t7 = "<h5><strong>Pasaje en alemán</strong></h5>"
            var t8 = "<h5><strong>Pasaje en español</strong></h5>"
            var t9 = "No existen expresiones derivadas."
            var t10 = "No deriva de ninguna expresión."
            break;
        case "en":
            var t0 = "Lookup"
            var t1 = "<div><h5><strong>German expression:</strong> "
            var t2 = "<div><h5><strong>Spanish expression:</strong> "
            var t3 = "<div><h5><strong>German Reference:</strong> "
            var t4 = "<div><h5><strong>Spanish Reference:</strong> "
            var t5 = "<h5>Derived from</h5>"
            var t6 = "<br/><h5>Derived expressions</h5>"
            var t7 = "<h5><strong>German passage</strong></h5>"
            var t8 = "<h5><strong>Spanish passage</strong></h5>"
            var t9 = "There are no derived expressions."
            var t10 = "It derives from no expression."
            break;
        case "al":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "Es gibt keine Ableitungsausdrücke."
            var t10 = "Es leitet von keinem Ausdruck ab."
            break;
        case "fr":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "Il n’y a aucune expressions dérivées."
            var t10 = "Ne derive pas d’aucune expréssion."
            break;
        case "ca":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expressió en alemany:</strong> "
            var t2 = "<div><h5><strong>Expressió en espanyol:</strong> "
            var t3 = "<div><h5><strong>Referència en alemany:</strong> "
            var t4 = "<div><h5><strong>Referència en espanyol:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>expressions derivades</h5>"
            var t7 = "<h5><strong>Passatge en alemany</strong></h5>"
            var t8 = "<h5><strong>Passatge en espanyol</strong></h5>"
            var t9 = "No existeixen expressions derivades."
            var t10 = "No deriva de cap expressió."
            break;
    }
    var termId = id
    var filter = [id, lista[index].refid]
    var queryString0 = "\
    select distinct\
	termino.t_term_de as expresion_original,\
	termino.t_term_es as expresion_traduccion,\
	termino_referencia.tr_refid as refid,\
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
    termino.t_id = $1 AND termino_referencia.tr_refid = $2;";
    res.locals.connection.query(queryString0, filter)
    .then(function(results){
        var basics = results[0]
        var complex = results
        // console.log(complex)
        var htmlContent = ""
        if(index == 0){
            htmlContent = '<head>\
            <meta charset="UTF-8">\
            </head>\
            <body>\
            <div>\
                <h3><strong>' + t0 + '</strong></h3>\
                <hr/>\
                <div>'
            if(expresion_aleman > 0){
                htmlContent+= t1 + basics.expresion_original + "</h5>\
                    <ul>"
                if(referencia_aleman > 0){
                    for(var i in complex){
                        // console.log("complex - " + i + " - " + complex[i])
                        htmlContent+= "<small>" + complex[i].ref_original + "</small><br/>"
                    }
                }
                htmlContent+="</ul></div></div><hr/>"
            }
            if(expresion_espaniol > 0){
                htmlContent+= t2 + basics.expresion_traduccion + "</h5>\
                    <ul>"
                if(referencia_espaniol > 0){
                    for(var i in complex){
                        // console.log("complex - " + i + " - " + complex[i])
                        htmlContent+= "<small>" + complex[i].ref_traduccion + "</small><br/>"
                    }
                }
                htmlContent+="</ul></div>\</div><hr/>"
            }
        }
        htmlContent+= '<br/>'
        filter2 = [termId]
        var queryString = "\
            SELECT \
            parentezco.p_hijo id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
                FROM\
            termino\
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_padre AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_hijo AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
            WHERE\
            termino.t_id = $1;"
        var queryString2 = "\
            SELECT DISTINCT\
            parentezco.p_padre AS id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
            FROM\
            termino \
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_hijo AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_padre AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
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
            res.locals.connection.query(queryString2, filter)
            .then(function(results2){
                var abuelos_list = results2
                res.locals.connection.query(queryString3, filter)
                .then(function(results3){
                    var jerarquia = results3[0]
                    jerarquia["hijos"] = hijos_list
                    jerarquia["abuelos"] = abuelos_list
                    console.log("pns1", htmlContent)
                    if(hierarchy > 0 && index == 0){
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                htmlContent+="<div style='margin-top: 15px;'><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div style='margin-bottom: 15px'><small>"+jerarquia.abuelos[a].pasaje_original+" // " +jerarquia.abuelos[a].pasaje_traduccion+ "</small></div>"
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                htmlContent+="<div style='margin-top: 15px;'><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div style='margin-bottom: 15px;'><small>"+jerarquia.hijos[h].pasaje_original+" // " +jerarquia.hijos[h].pasaje_traduccion+ "</small></div>"
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }else if(index == 0){
                        var actual = ""
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                if(actual != jerarquia.abuelos[a].expresion){
                                    actual = jerarquia.abuelos[a].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div>"
                                }
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        actual = ""
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                if(actual != jerarquia.hijos[h].expresion){
                                    actual = jerarquia.hijos[h].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div>"
                                }
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }
                    console.log("pns", htmlContent)
                    htmlContent+='\
                        <hr/>'
                        if(pasaje_aleman > 0) htmlContent+="<div>" + t7 + "\
                                                        <div style='padding : 10px 40px;'>" + basics.pasaje_original + "</div>\
                                                    </div><br/>"
                        if(pasaje_espaniol > 0) htmlContent+="<div>" + t8 +
                                                        "<div style='padding : 10px 40px;'>" + basics.pasaje_traduccion + "</div>\
                                                        </div><br/></div>"
                    // console.log("results", htmlRes)
                    // console.log("before", htmlContent)
                    htmlRes+=htmlContent
                    // console.log("html", htmlRes)
                    return processList(id, res, lista, index+1, htmlRes, lang, expresion_aleman, referencia_aleman, expresion_espaniol, referencia_espaniol, hierarchy, pasaje_aleman, pasaje_espaniol, final)
                }).catch(function(error){
                    console.log(error)
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
                })
            }).catch(function(error){
                console.log(error)
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            })
        }).catch(function(error){
            console.log(error)
            res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        })
    }).catch(function(error){
        console.log(error)
        res.send(JSON.stringify({"status": 500, "error": null, "response": error}));
});}

router.get('/reporteGeneralPdf/:id', function(req, res, next){
    // console.log("var-req",req.query.lang, req.query.expresion_aleman, req.query.referencia_aleman, req.query.expresion_espaniol, req.query.referencia_espaniol, req.query.hierarchy, req.query.pasaje_aleman, req.query.pasaje_espaniol)
    // if(global.rol != "guest"){
        var filter = req.params.id
        var queryString="\
        select * from\
        (select distinct\
        termino.t_term_de as expresion_original,\
        termino.t_term_es as expresion_traduccion,\
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
         END, refid;"
        res.locals.connection.query(queryString, filter)
        .then(function(results){
            // console.log("result-query", results)
            processList(req.params.id, res, results, 0, "", req.query.lang, req.query.expresion_aleman, req.query.referencia_aleman, req.query.expresion_espaniol, req.query.referencia_espaniol, req.query.hierarchy, req.query.pasaje_aleman, req.query.pasaje_espaniol, resultado => {
                var htmltitle = randomstring.generate(10);
                // console.log("resultado",resultado)
                // res.send(resultado);
                conversion({ html: resultado, }, function(err, pdf) {
                    if(err){
                        console.log(err)
                        res.send(JSON.stringify({"status": 500, "error": null, "response": err}));
                    } 
                    var output = fs.createWriteStream(filesRoute +htmltitle+'.pdf')
                    // console.log(pdf.logs);
                    // console.log(pdf.numberOfPages);
                    pdf.stream.pipe(output);
                    res.send(JSON.stringify({"status": 200, "error": null, "response": htmltitle}));
                });
            })
        }).catch(error => {
            console.log(error)
        })
    // }
})

router.get('/reporteGeneralTxt/:id', function(req, res, next){
    // console.log("var-req",req.query.lang, req.query.expresion_aleman, req.query.referencia_aleman, req.query.expresion_espaniol, req.query.referencia_espaniol, req.query.hierarchy, req.query.pasaje_aleman, req.query.pasaje_espaniol)
    // if(global.rol != "guest"){
        var filter = req.params.id
        var queryString="\
        select * from\
        (select distinct\
        termino.t_term_de as expresion_original,\
        termino.t_term_es as expresion_traduccion,\
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
         END, refid;"
        res.locals.connection.query(queryString, filter)
        .then(function(results){
            // console.log("result-query", results)
            processList(req.params.id, res, results, 0, "", req.query.lang, req.query.expresion_aleman, req.query.referencia_aleman, req.query.expresion_espaniol, req.query.referencia_espaniol, req.query.hierarchy, req.query.pasaje_aleman, req.query.pasaje_espaniol, resultado => {
                // console.log("resultado",resultado)
                // res.send(resultado);
                var htmltitle = randomstring.generate(10);
                var text = htmlToText.fromString(resultado,{
                    wordwrap: 130
                });
                console.log(text);
                fs.writeFile(filesRoute+htmltitle+'.txt', text, function (err) {
                    if (err) console.log(err)
                    else res.send(JSON.stringify({"status": 200, "error": null, "response": htmltitle}));
                })
            })
        }).catch(error => {
            console.log(error)
        })
    // }
})

router.get('/reportePdf/:id', function(req, res, next){
    if(global.rol != "guest"){
    console.log(req.query.lang)
    switch(req.query.lang){
        case "es":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expresión en alemán:</strong> "
            var t2 = "<div><h5><strong>Expresión en español:</strong> "
            var t3 = "<div><h5><strong>Referencia en alemán:</strong> "
            var t4 = "<div><h5><strong>Referencia en español:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>Expresiones derivadas</h5>"
            var t7 = "<h5><strong>Pasaje en alemán</strong></h5>"
            var t8 = "<h5><strong>Pasaje en español</strong></h5>"
            var t9 = "No existen expresiones derivadas."
            var t10 = "No deriva de ninguna expresión."
            break;
        case "en":
            var t0 = "Lookup"
            var t1 = "<div><h5><strong>German expression:</strong> "
            var t2 = "<div><h5><strong>Spanish expression:</strong> "
            var t3 = "<div><h5><strong>German Reference:</strong> "
            var t4 = "<div><h5><strong>Spanish Reference:</strong> "
            var t5 = "<h5>Derived from</h5>"
            var t6 = "<br/><h5>Derived expressions</h5>"
            var t7 = "<h5><strong>German passage</strong></h5>"
            var t8 = "<h5><strong>Spanish passage</strong></h5>"
            var t9 = "There are no derived expressions."
            var t10 = "It derives from no expression."
            break;
        case "al":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "Es gibt keine Ableitungsausdrücke."
            var t10 = "Es leitet von keinem Ausdruck ab."
            break;
        case "fr":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "Il n’y a aucune expressions dérivées."
            var t10 = "Ne derive pas d’aucune expréssion."
            break;  
        case "ca":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expressió en alemany:</strong> "
            var t2 = "<div><h5><strong>Expressió en espanyol:</strong> "
            var t3 = "<div><h5><strong>Referència en alemany:</strong> "
            var t4 = "<div><h5><strong>Referència en espanyol:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>expressions derivades</h5>"
            var t7 = "<h5><strong>Passatge en alemany</strong></h5>"
            var t8 = "<h5><strong>Passatge en espanyol</strong></h5>"
            var t9 = "No existeixen expressions derivades."
            var t10 = "No deriva de cap expressió."
            break;  
    }
    console.log("REPORTE")
    var termId = req.params.id
    var filter = [req.params.id, req.query.refid]
    var queryString0 = "\
    select distinct\
	termino.t_term_de as expresion_original,\
	termino.t_term_es as expresion_traduccion,\
	termino_referencia.tr_refid as refid,\
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
    termino.t_id = $1 AND termino_referencia.tr_refid = $2;";
    console.log(queryString0)
    res.locals.connection.query(queryString0, filter)
    .then(function(results){
        var basics = results[0]
        var complex = results
        console.log("-------------------------------------------------------")
	console.log(results)
        // console.log(req.query.expresion_aleman > 0)
        // var hierarchy = req.query.hierarchy
        // var htmlContent = "<p>estoyprobandolol</p>"
        var htmlContent = '<head>\
        <meta charset="UTF-8">\
        </head>\
        <body>\
        <div>\
            <h3><strong>' + t0 + '</strong></h3>\
            <hr/>\
            <div>'
        if(req.query.expresion_aleman > 0){
            htmlContent+= t1 + basics.expresion_original + "</h5>\
                <ul>"
            if(req.query.referencia_aleman > 0){
                for(var i in complex){
                    console.log("complex - " + i + " - " + complex[i])
                    htmlContent+= "<small>" + complex[i].ref_original + "</small><br/>"
                }
            }
            htmlContent+="</ul></div></div><hr/>"
        }
        htmlContent+="<div>"
        if(req.query.expresion_espaniol > 0){
            htmlContent+= t2 + basics.expresion_traduccion + "</h5>\
                <ul>"
            if(req.query.referencia_espaniol > 0){
                for(var i in complex){
                    console.log("complex - " + i + " - " + complex[i])
                    htmlContent+= "<small>" + complex[i].ref_traduccion + "</small><br/>"
                }
            }
            htmlContent+="</ul></div>\</div><hr/>"
        }  
        // if(req.query.expresion_espaniol > 0) htmlContent+= t2 + basics.expresion_traduccion + "</h5></div></div><hr/>"
        // htmlContent+="<div>"
        // if(req.query.referencia_aleman > 0) htmlContent+= t3 + basics.ref_original + "</h5></div></div><hr/>"
        // if(req.query.referencia_espaniol > 0) htmlContent+= t4 + basics.ref_traduccion + "</h5></div></div><hr/>"
        htmlContent+= '<br/>'
        filter2 = [termId]
        var queryString = "\
            SELECT \
            parentezco.p_hijo id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
                FROM\
            termino\
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_padre AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_hijo AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
            WHERE\
            termino.t_id = $1;"
        var queryString2 = "\
            SELECT DISTINCT\
            parentezco.p_padre AS id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
            FROM\
            termino \
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_hijo AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_padre AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
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
            res.locals.connection.query(queryString2, filter)
            .then(function(results2){
                var abuelos_list = results2
                res.locals.connection.query(queryString3, filter)
                .then(function(results3){
                    var jerarquia = results3[0]
                    jerarquia["hijos"] = hijos_list
                    jerarquia["abuelos"] = abuelos_list
                    if(req.query.hierarchy > 0){
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                htmlContent+="<div style='margin-top: 15px;'><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div style='margin-bottom: 15px'><small>"+jerarquia.abuelos[a].pasaje_original+" // " +jerarquia.abuelos[a].pasaje_traduccion+ "</small></div>"
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                htmlContent+="<div style='margin-top: 15px;'><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div style='margin-bottom: 15px;'><small>"+jerarquia.hijos[h].pasaje_original+" // " +jerarquia.hijos[h].pasaje_traduccion+ "</small></div>"
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }else{
                        var actual = ""
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                if(actual != jerarquia.abuelos[a].expresion){
                                    actual = jerarquia.abuelos[a].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div>"
                                }
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        actual = ""
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                if(actual != jerarquia.hijos[h].expresion){
                                    actual = jerarquia.hijos[h].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div>"
                                }
                                // htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia  .hijos[h].traduccion+ "</strong> </h6></div>"
                            }
                        }else{
                            htmlContent+= "<div style='margin-top: 15px;'><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }
                    htmlContent+='\
                        <hr/>'
                        if(req.query.pasaje_aleman > 0) htmlContent+="<div>" + t7 + "\
                                                        <div style='padding : 10px 40px;'>" + basics.pasaje_original + "</div>\
                                                    </div><br/>"
                        if(req.query.pasaje_espaniol > 0) htmlContent+="<div>" + t8 +
                                                        "<div style='padding : 10px 40px;'>" + basics.pasaje_traduccion + "</div>\
                                                        </div><br/></div>"
                    htmlContent+="\
                    <link rel='stylesheet' href='../public/node_modules/bootstrap/dist/css/bootstrap.min.css'>\
                    <style>\
                    h3{\
                        font-size: 22px;\
                        margin: 30px 0px;\
                        text-align: center;\
                    }\
                    h4 {\
                        font-size: 20px;\
                        text-decoration: underline;\
                        margin-bottom: 8px;\
                    }\
                    h5{\
                        font-size: 14px;\
                        margin-left: 14px;\
                    }\
                    h6{\
                        font-size: 12px;\
                        margin-left: 28px;\
                        line-height: 5px;\
                    }\
                    small{\
                        font-size : 10px;\
                        margin-left: 56px;\
                    }\
                    </style></body>"
                    // console.log(opciones)
                    console.log(htmlContent)
                    var htmltitle = randomstring.generate(10);
                    conversion({ html: htmlContent, }, function(err, pdf) {
                        var output = fs.createWriteStream(filesRoute +htmltitle+'.pdf')
                        console.log(pdf.logs);
                        console.log(pdf.numberOfPages);
                        pdf.stream.pipe(output);
                        res.send(JSON.stringify({"status": 200, "error": null, "response": htmltitle}));
                      });
                }).catch(function(error){
                    console.log(error)
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
                })
            }).catch(function(error){
                console.log(error)
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            })
        }).catch(function(error){
            console.log(error)
            res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        })
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        res.send(JSON.stringify({"status": 500, "error": null, "response": error}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});

router.get('/reporteText/:id', function(req, res, next){
    if(global.rol != "guest"){
    console.log("REPORTE")
    switch(req.query.lang){
        case "es":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expresión en alemán:</strong> "
            var t2 = "<div><h5><strong>Expresión en español:</strong> "
            var t3 = "<div><h5><strong>Referencia en alemán:</strong> "
            var t4 = "<div><h5><strong>Referencia en español:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>Expresiones derivadas</h5>"
            var t7 = "<h5><strong>Pasaje en alemán</strong></h5>"
            var t8 = "<h5><strong>Pasaje en español</strong></h5>"
            var t9 = "No existen expresiones derivadas."
            var t10 = "No deriva de ninguna expresión."
            break;
        case "en":
            var t0 = "Lookup"
            var t1 = "<div><h5><strong>German expression:</strong> "
            var t2 = "<div><h5><strong>Spanish expression:</strong> "
            var t3 = "<div><h5><strong>German Reference:</strong> "
            var t4 = "<div><h5><strong>Spanish Reference:</strong> "
            var t5 = "<h5>Derived from</h5>"
            var t6 = "<br/><h5>Derived expressions</h5>"
            var t7 = "<h5><strong>German passage</strong></h5>"
            var t8 = "<h5><strong>Spanish passage</strong></h5>"
            var t9 = "There are no derived expressions."
            var t10 = "It does not derives from other expressions."
            break;
        case "al":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "No existen expresiones derivadas."
            var t10 = "No deriva de ninguna expresión."
            break;
        case "fr":
            var t0 = "Suche"
            var t1 = "<div><h5><strong>Deutsch ausdruck:</strong> "
            var t2 = "<div><h5><strong>Spanisch ausdruck:</strong> "
            var t3 = "<div><h5><strong>Deutsch referenz:</strong> "
            var t4 = "<div><h5><strong>Spanisch referenz:</strong> "
            var t5 = "<h5>Abgeleitet von</h5>"
            var t6 = "<br/><h5>Ableitungsausdrücke</h5>"
            var t7 = "<h5><strong>Deutsch vorhergehender</strong></h5>"
            var t8 = "<h5><strong>Spanisch vorhergehender</strong></h5>"
            var t9 = "Il n’y a aucune expressions dérivées."
            var t10 = "Ne derive pas d’aucune expréssion."
            break;  
        case "ca":
            var t0 = "Consulta"
            var t1 = "<div><h5><strong>Expressió en alemany:</strong> "
            var t2 = "<div><h5><strong>Expressió en espanyol:</strong> "
            var t3 = "<div><h5><strong>Referència en alemany:</strong> "
            var t4 = "<div><h5><strong>Referència en espanyol:</strong> "
            var t5 = "<h5>Deriva de</h5>"
            var t6 = "<br/><h5>expressions derivades</h5>"
            var t7 = "<h5><strong>Passatge en alemany</strong></h5>"
            var t8 = "<h5><strong>Passatge en espanyol</strong></h5>"
            var t9 = "No existeixen expressions derivades."
            var t10 = "No deriva de cap expressió."
            break;      
    }
    var termId = req.params.id
    var filter = [req.params.id, req.query.refid]
    console.log("filtros  ", filter)
    var queryString0 = "\
    select distinct\
	termino.t_term_de as expresion_original,\
	termino.t_term_es as expresion_traduccion,\
	termino_referencia.tr_refid as refid,\
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
    termino.t_id = $1 AND termino_referencia.tr_refid = $2";
    res.locals.connection.query(queryString0, filter)
    .then(function(results) {
        var basics = results[0]
        var complex = results
        console.log("-------------------------------------------------------")
        // console.log(req.query.expresion_aleman > 0)
        // var hierarchy = req.query.hierarchy
        // var htmlContent = "<p>estoyprobandolol</p>"
        var htmlContent = '<head>\
        <meta charset="UTF-8">\
        </head>\
        <body>\
        <div>\
            <h3><strong>' + t0 + '</strong></h3>\
            <hr/>\
            <div>'
        //if(req.query.expresion_aleman > 0){
            htmlContent+= t1 + basics.expresion_original + "</h5>\
                <ul>"
            //if(req.query.referencia_aleman > 0){
                for(var i in complex){
                    console.log("complex - " + i + " - " + complex[i])
                    htmlContent+= "<small>" + complex[i].ref_original + "</small><br/>"
                }
            //}
            htmlContent+="</ul></div></div><hr/>"
        //}
        htmlContent+="<div>"
        //if(req.query.expresion_espaniol > 0){
            htmlContent+= t2 + basics.expresion_traduccion + "</h5>\
                <ul>"
           // if(req.query.referencia_espaniol > 0){
                for(var i in complex){
                    console.log("complex - " + i + " - " + complex[i])
                    htmlContent+= "<small>" + complex[i].ref_traduccion + "</small><br/>"
                }
            //}
            htmlContent+="</ul></div>\</div><hr/>"
       // }  
        htmlContent+= '<br/>'
        filter2 = [termId]
        var queryString = "\
            SELECT \
            parentezco.p_hijo id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
                FROM\
            termino\
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_padre AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_hijo AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
            WHERE\
            termino.t_id = $1;"
        var queryString2 = "\
            SELECT \
            parentezco.p_padre AS id,\
            term.t_term_es AS traduccion,\
            term.t_term_de AS expresion,\
            termref.tr_refid AS refid,\
            referencia.ref_libro_de AS pasaje_original,\
            referencia.ref_libro_es AS pasaje_traduccion\
            FROM\
            termino \
            INNER JOIN parentezco \
            ON termino.t_id = cast(parentezco.p_hijo AS INT)\
            INNER JOIN termino as term\
            ON CAST(parentezco.p_padre AS INT) = term.t_id\
            INNER JOIN termino_referencia as termref\
            ON parentezco.p_hijo = termref.tr_termid\
            INNER JOIN referencia\
            ON referencia.ref_id = termref.tr_refid\
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
            res.locals.connection.query(queryString2, filter)
            .then(function(results2){
                var abuelos_list = results2
                res.locals.connection.query(queryString3, filter)
                .then(function(results3){
                    var jerarquia = results3[0]
                    jerarquia["hijos"] = hijos_list
                    jerarquia["abuelos"] = abuelos_list
                    if(req.query.hierarchy > 0){
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                htmlContent+="<div><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div><small>"+jerarquia.abuelos[a].pasaje_original+" // " +jerarquia.abuelos[a].pasaje_traduccion+ "</small></div><br/>"
                            }
                        }else{
                            htmlContent+= "<div><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div>"
                                htmlContent+="<div><small>"+jerarquia.hijos[h].pasaje_original+" // " +jerarquia.hijos[h].pasaje_traduccion+ "</small></div><br/>"
                            }
                        }else{
                            htmlContent+= "<div><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }else{
                        var actual = ""
                        htmlContent+= t5
                        if(jerarquia.abuelos.length > 0){
                            for(var a in jerarquia.abuelos){
                                if(actual != jerarquia.abuelos[a].expresion){
                                    actual = jerarquia.abuelos[a].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.abuelos[a].expresion+" // " +jerarquia.abuelos[a].traduccion+ "</strong> </h6></div><br/>"
                                }
                            }
                        }else{
                            htmlContent+= "<div><h6><strong>"+ t10 +"</strong></h6></div>"
                        }
                        actual = ""
                        htmlContent+= t6
                        if(jerarquia.hijos.length > 0){
                            for(var h in jerarquia.hijos){
                                if(actual != jerarquia.hijos[h].expresion){
                                    actual = jerarquia.hijos[h].expresion
                                    htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia.hijos[h].traduccion+ "</strong> </h6></div><br/>"
                                }
                                // htmlContent+="<div><h6><strong>"+jerarquia.hijos[h].expresion+" // " +jerarquia  .hijos[h].traduccion+ "</strong> </h6></div>"
                            }
                        }else{
                            htmlContent+= "<div><h6><strong>"+ t9 +"</strong></h6></div>"
                        }
                    }
                    htmlContent+='\
                        <hr/>'
                        if(req.query.pasaje_aleman > 0) htmlContent+="<div>" + t7 +
                                                        "<div style='padding : 10px 40px;'>" + basics.pasaje_original + "</div>\
                                                    </div><br/><hr/><br/>"
                        if(req.query.pasaje_espaniol > 0) htmlContent+="<div>" + t8 +
                                                        "<div style='padding : 10px 40px;'>" + basics.pasaje_traduccion + "</div>\
                                                        </div><br/></div>"
                    htmlContent+="\
                    <link rel='stylesheet' href='../public/node_modules/bootstrap/dist/css/bootstrap.min.css'>\
                    <style>\
                    h3{\
                        font-size: 22px;\
                        margin: 30px 0px;\
                        text-align: center;\
                    }\
                    h4 {\
                        font-size: 20px;\
                        text-decoration: underline;\
                        margin-bottom: 8px;\
                    }\
                    h5{\
                        font-size: 14px;\
                        margin-left: 14px;\
                    }\
                    h6{\
                        font-size: 12px;\
                        margin-left: 28px;\
                        line-height: 5px;\
                    }\
                    small{\
                        font-size : 10px;\
                        margin-left: 56px;\
                    }\
                    </style></body>"
                    // console.log(opciones)
                    // console.log(htmlContent)
                    var htmltitle = randomstring.generate(10);
                    var text = htmlToText.fromString(htmlContent, {
                        wordwrap: 130
                      });
                    console.log(htmltitle);
                    fs.writeFile(filesRoute+htmltitle+'.txt', text, function (err) {
                        if (err) console.log(err)
                        else res.send(JSON.stringify({"status": 200, "error": null, "response": htmltitle}));
                    })
                }).catch(function(error){
                    console.log(error)
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
                })
            }).catch(function(error){
                console.log(error)
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            })
        }).catch(function(error){
            console.log(error)
            res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        })
        //If there is no error, all is good and response is 200OK.
  	}).catch(function(error){
        res.send(JSON.stringify({"status": 500, "error": null, "response": error}));
      });}else{res.send(JSON.stringify({"status": 401, "error": "Está prohibido para este usuario.", "response": null}));}
});


module.exports = router;
