var datalistContent = ""
var modalOpcion = "nuevo"
var todosTerminos = []
var todasReferencias = []

var newExpresion = () => {
    $("#exampleModalLabel").html("Nueva Expresión")
    modalOpcion = "nuevo"
    $('#traduccionEditor').val("")
    $('#expresionEditor').val("")
    $('textarea#traduccionPEditor').ckeditor();
    $('textarea#expresionPEditor').ckeditor();
    $("#traduccionPEditor").val("")
    $("#expresionPEditor").val("")
    $("#traduccionIEditor").val("A")
    $("#expresionIEditor").val("A")
    document.getElementById("pills-home-tab").click()
    $("#pills-profile-tab").hide()
    $("#pills-home-tab").hide()
    $("#expresionModalView").modal("show")
}

var editExpresion = () => {
    $("body").append("\
    <div id='loading-img' style='position:absolute;z-index: 3000; width:50px; top: calc(50vh - 25px); left: calc(50vw - 25px);'>\
        <img src='../images/Facebook-1s-200px.gif/>\
    </div>")
    $("#exampleModalLabel").html("Editar Expresión")
    modalOpcion = "editar"
    $('textarea#traduccionPEditor').ckeditor();
    $('input#traduccionEditor').val($$pasajeView.getState().expresionSeleccionada.expresion_es)
    $('textarea#expresionPEditor').ckeditor();
    $('input#expresionEditor').val($$pasajeView.getState().expresionSeleccionada.expresion_de)
    $('#traduccionPEditor').val($$pasajeView.getState().expresionSeleccionada.pretty_es)
    $('#expresionPEditor').val($$pasajeView.getState().expresionSeleccionada.pretty_de)
    $('#traduccionIEditor').val($$pasajeView.getState().expresionSeleccionada.indice_es[0])
    $('#expresionIEditor').val($$pasajeView.getState().expresionSeleccionada.indice_de[0])
    $("#expresionModalView").modal("show")
    $("#loading-img").hide()
    document.getElementById("pills-home-tab").click()
}

var editRelacion = () => {
    $("body").append("\
    <div id='loading-img' style='position:absolute;z-index: 3000; width:50px; top: calc(50vh - 25px); left: calc(50vw - 25px);'>\
        <img src='../images/Facebook-1s-200px.gif/>\
    </div>")
    fillLists()
    $("#relacionModalView").modal("show")
    $("#loading-img").hide()
}

var deleteExpresion = () => {
    var expresion_id = $$pasajeView.getState().expresionSeleccionada.id
    if(confirm("¿Quiere eliminar la expresión seleccionada?")){
        if($$pasajeView.getState().hijos.length < 1 && $$pasajeView.getState().padres.length < 1){
            if($$pasajeView.getState().lista_pasajes.length == 0){
                var service = "/expresiones/deleteExpresion/" + expresion_id
                adminService(service, "DELETE", {}, (data) => {
                    $("#expresionModalView").modal("hide")
                    getPalabras(localStore.getObject("letter"))
                })
            }else{
              alert("La expresión contiene pasajes relacionados. Por favor, elimine dichas relaciones antes de proseguir.")
            }
        }else{
            alert("La expresión tiene parentesco con otras expresiones. Por favor, elimine dichas relaciones antes de proseguir.")
        }
    }
}

var selectedRef = ""

var selectRef = (refid) => {
    $("i.fa-check-square").addClass('fa-square')
    $("i.fa-check-square").removeClass('fa-check-square')
    selectedRef = refid
    $("#check" + refid).removeClass('fa-square')
    $("#check" + refid).addClass('fa-check-square')
}

var selectedExpresion = {
    "padre" : "",
    "hijo" : ""
}

var selectExpresion = (refid, tipo) => {
    $("i.fa-check-square").addClass('fa-square')
    $("i.fa-check-square").removeClass('fa-check-square')
    selectedExpresion[tipo] = refid
    $("#check" + tipo + refid).removeClass('fa-square')
    $("#check" + tipo + refid).addClass('fa-check-square')
}

var getPalabras = (letra) => {
    var service = "/expresiones/todas/" + letra
    $("div#expresiones").html('\
    <div id="loading">\
        <img src="images/Facebook-1s-200px.gif">\
    </div>\
    ')
    adminService(service, "GET", {}, (data) => {
        if(data.error){
            createAlert("Error: ", data.error)
        }else{
            adminService("/referencias/lista", "GET", {}, (datar) => {
                if(datar.error){
                    createAlert("Error: ", datar.error)
                }else{
                    datalistContent = ""
                    for(var i in datar.response){
                        datalistContent += "<li id='li"+ datar.response[i].ref_id +"' class='row'><a href='#' class='col-2' onclick='selectRef(\""+ datar.response[i].ref_id +"\")'><i class='far fa-square' id='check"+ datar.response[i].ref_id +"'></i></a><span class='col-10'>"+ datar.response[i].ref_id + " - " + datar.response[i].ref_libro_de + " // " + datar.response[i].ref_libro_es  + "</span></li>"
                    }
                    document.getElementById('referenciasList').innerHTML = datalistContent
                    // $("#referenciasList").html(datalistContent)
                    todosTerminos = data.response
                    todasReferencias = datar.response
                    $$alfabetoView.setState("expresiones", data.response)
                    $$alfabetoView.selectExpresion(data.response[0])
                    selectRef(datar.response[0].ref_id)
                }
            })
        }
    })
}

var toggleArrow = (e) => {
    if($(e).children("i").hasClass("fa-angle-down")){
        $(e).children("i").removeClass("fa-angle-down")
        $(e).children("i").addClass("fa-angle-up")
    }else{
        $(e).children("i").removeClass("fa-angle-up")
        $(e).children("i").addClass("fa-angle-down")
    }
}

var $$menuView = $("#letras").view({
    state : {
        opciones : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    },
    selectLetter : function(letter){
        localStore.setObject("letter", letter)
        $$alfabetoView.setState("opcionSeleccionada", letter)
        getPalabras(letter)
    },
})

var $$alfabetoView = $("div#alfabeto-view").view({
    state : {
        opcionSeleccionada : "",
        expresiones : [],
        expresionSeleccionada : {'id' : ''}
    },
    selectExpresion : function(expresion){
        $$pasajeView.setState("expresionSeleccionada", expresion)
        // this.setState("expresionSeleccionada", expresion)
        adminService("/expresiones/al/abuelosList/" + expresion.id, "GET", {}, (data) => {
            $$pasajeView.setState("padres", data.response)
            $$padresModalView.setState("padres", data.response)
            adminService("/expresiones/al/hijosList/" + expresion.id, "GET", {}, (datah) => {
                $$pasajeView.setState("hijos", datah.response)
                $$hijosModalView.setState("hijos", datah.response)
                adminService("/referencias/obtieneReferencias/" + expresion.id, "GET", {}, (datar) => {
                    console.log(datar)
                    $$pasajeView.setState("referencias", datar.response)
                    $(".pasaje-login").hide()
                })
            })
        })
    }
})

var $$pasajeView = $("div#pasaje-view").view({
    state: {
        lista_pasajes : [],
        pasaje_seleccionado : {},
        lang : "de",
        posicion_seleccionada : 0,
        expresionSeleccionada : {},
        hijos : [],
        padres : [],
        referencias : []
    },
    changeLang : function(){
        if(this.getState().lang == 'de') this.setState("lang", 'es')
        else this.setState("lang", 'de')
    },editarPasaje : function(pasaje){
        // $$pasajeModalView.setState("title", "Editar Pasaje")
        $("#exampleModalLabel").html("Editar Expresión")
        $("#pasajeModal").modal("show")
        $('textarea#traduccionPEditor').ckeditor();
        $('textarea#traduccionPEditor').val(pasaje.pasaje_traduccion)
        $('textarea#expresionPEditor').ckeditor();
        $('textarea#expresionPEditor').val(pasaje.pasaje_original)
    },
    deletePasaje : function(referencia){
        if(confirm("¿Desea realmente eliminar la relación?")){
            var service2 = "/referencias/quitarPasaje/" + referencia.refid + "/" + $$pasajeView.getState().expresionSeleccionada.id
            adminService(service2, "DELETE", {}, (data) => {
                var service3 = "/referencias/obtieneReferencias/" + $$pasajeView.getState().expresionSeleccionada.id
                adminService(service3, "GET", {}, (datar) => {
                    $$pasajeView.setState("referencias", datar.response)
                    $(".pasaje-login").hide()
                })
            })
        }
    }
})

var nuevaExpresion = {
    "expresion" : "",
    "traduccion" : ""
}

var searchRelacionPadre = () => {
    var padres = $$padresModalView.getState().padres
    for(var i in padres){
        if(selectedExpresion['padre'] == padres[i].padre){
            return true
        }
    }
    return false
}

var searchRelacionHijo = () => {
    var hijos = $$hijosModalView.getState().hijos
    for(var i in hijos){
        if(selectedExpresion['hijo'].id == hijos[i].hijo){
            return true
        }
    }
    return false
}

var $$padresModalView = $("#padreView").view({
    state:{
        padres :[]
    },
    addPadre: function(){
        if(searchRelacionPadre()){
            alert("Esa relacion ya existe, no se pueden duplicar.")
        }else{
            $("#padresSqr").hide()
            $("#padres-loading").show()
            service = "/expresiones/agregarPadre/" + $$pasajeView.getState().expresionSeleccionada.id
            adminService(service, "POST", JSON.stringify({"padre" : selectedExpresion['padre']}), (datax) => {
                var service2 = "/expresiones/al/abuelosList/" + $$pasajeView.getState().expresionSeleccionada.id
                adminService(service2, "GET", {}, (data) => {
                    $$pasajeView.setState("padres", data.response)
                    $$padresModalView.setState("padres", data.response)
                    fillLists()
                    $("#padresSqr").show()
                    $("#padres-loading").hide()
                    $(".pasaje-login").hide()
                })
            })
        }
    },
    deletePadre : function(padre){
        if(confirm("¿Desea realmente eliminar la relación?")){
            $("#padresSqr").hide()
            $("#padres-loading").show()
            var service = "/expresiones/eliminarRelacion/" + padre.id + "/" + padre.padre
            adminService(service, "DELETE", {}, (datax) => {
                var service2 = "/expresiones/al/abuelosList/" + $$pasajeView.getState().expresionSeleccionada.id
                adminService(service2, "GET", {}, (data) => {
                    $$pasajeView.setState("padres", data.response)
                    $$padresModalView.setState("padres", data.response)
                    fillLists()
                    $("#padresSqr").show()
                    $("#padres-loading").hide()
                    $(".pasaje-login").hide()
                })
            })
        }
    },
})

var $$hijosModalView = $("#parentescoM").view({
    state:{
        hijos : [],
    },
    addHijo : function(){
        if(searchRelacionHijo()){
            alert("Esa relacion ya existe, no se pueden duplicar.")
        }else{
            $("#hijosSqr").hide()
            $("#hijos-loading").show()
            service = "/expresiones/agregarHijo/" + $$pasajeView.getState().expresionSeleccionada.id
            adminService(service, "POST", JSON.stringify({"hijo" : selectedExpresion['hijo'].split(" // ")[0]}), (datax) => {
                var service2 = "/expresiones/al/hijosList/" + $$pasajeView.getState().expresionSeleccionada.id
                adminService(service2, "GET", {}, (data) => {
                    $$pasajeView.setState("hijos", data.response)
                    $$hijosModalView.setState("hijos", data.response)
                    fillLists()
                    $("#hijosSqr").show()
                    $("#hijos-loading").hide()
                    $(".pasaje-login").hide()
                })
            })
        }
    },
    deleteHijo : function(hijo){
        if(confirm("¿Desea realmente eliminar la relación?")){
            $("#hijosSqr").hide()
            $("#hijos-loading").show()
            var service = "/expresiones/eliminarRelacion/" + hijo.hijo + "/" + hijo.id
            adminService(service, "DELETE", {}, (datax) => {
                var service2 = "/expresiones/al/hijosList/" + $$pasajeView.getState().expresionSeleccionada.id
                adminService(service2, "GET", {}, (data) => {
                    console.log(data)
                    $$pasajeView.setState("hijos", data.response)
                    $$hijosModalView.setState("hijos", data.response)
                    fillLists()
                    $("#hijosSqr").show()
                    $("#hijos-loading").hide()
                    $(".pasaje-login").hide()
                })
            })
        }
    }
})

var getRawContent = (word) => {
    if(word.indexOf("<p>") > -1) return getRawContent(word.replace("<p>", ""))
    else if(word.indexOf("</p>") > -1) return getRawContent(word.replace("</p>", ""))
    else if(word.indexOf("\\n") > -1) return getRawContent(word.replace("\\n", ""))
    else return word
}

var $$basicoModalView = $("#basicM").view({
    state : {expresionesList : []},
    guardarExpresion : function(e){
        e.preventDefault()
        var params = {
            // 'expresion' : getRawContent($('textarea#expresionEditor').val()),
            // 'traduccion' : getRawContent($('textarea#traduccionEditor').val())
            'indice_es' : $('#traduccionIEditor').val(),
            'indice_de' : $('#expresionIEditor').val(),
            'pretty_es' : $('textarea#traduccionPEditor').val() === "" ? $('#traduccionIEditor').val() : $('textarea#traduccionPEditor').val(),
            'pretty_de' : $('textarea#expresionPEditor').val() == "" ? $('#expresionIEditor').val() : $('textarea#expresionPEditor').val(),
            'expresion' : $('#expresionEditor').val(),
            'traduccion' : $('#traduccionEditor').val()
        }
        var service = "/expresiones/"
        if(modalOpcion == "editar"){
            service += "updateExpresion/" + $$pasajeView.getState().expresionSeleccionada.id
        }else{
            service += "nuevaExpresion"
        }
        adminService(service, "POST", JSON.stringify(params), (data) => {
            localStore.getObject("letter")
            $("#expresionModalView").modal("hide")
            getPalabras(localStore.getObject("letter"))
        })
    },
})

var nuevoPasaje = () =>{
    // $$pasajeModalView.setState("title", "Nuevo Pasaje")
    $("#pasajeModal").modal("show")
    // $('textarea#traduccionPEditor').ckeditor();
    // $('textarea#expresionPEditor').ckeditor();
}

var searchPasajeIn = (id) => {
    var pasajes = $$pasajeView.getState("referencias")
    for(var i in pasajes){
	if(pasajes[i].refid == id){
	    return true
	}
    }
    return false
}

var $$pasajeModalView = $("#pasajeModalView").view({
    state : {
        title : "Agregar Pasaje",
        opcion : "",
        hijos : [],
        padres : []
    },

    asociarReferencia : function(e){
        e.preventDefault()
        var params = {
            'termId' : $$pasajeView.getState().expresionSeleccionada.id,
            'orden' : parseInt(this.data.orden),
            'referencia' : selectedRef
        }
        var service = "/referencias/agregarReferencia"
	if(searchPasajeIn(selectedRef)){
	    alert("Esa relacion ya existe, no puede duplicarse.")
	}else{
        adminService(service, "POST", JSON.stringify(params), (data) => {
            // $$alfabetoView.selectExpresion()
            alert("Se ha asociado exitosamente!")
            var service2 = "/referencias/obtieneReferencias/" + $$pasajeView.getState().expresionSeleccionada.id
            adminService(service2, "GET", {}, (datar) => {
                $$pasajeView.setState("referencias", datar.response)
                $(".pasaje-login").hide()
            })
        })}
    },
})

var expresionesList = []

var fillLists = () => {
    var datalistContentP = ""
    var datalistContentH = ""
    for(var i in expresionesList){
        datalistContentP += "<li style='width: 100%;' id='Pli"+ expresionesList[i].t_id +"' class='row'><a href='#' class='col-2' onclick='selectExpresion(\""+ expresionesList[i].t_id +"\", \"padre\")'><i class='far fa-square' id='checkpadre"+ expresionesList[i].t_id +"'></i></a><span class='col-10'>"+ expresionesList[i].t_id + " - " + expresionesList[i].t_term_de + " // " + expresionesList[i].t_term_es  + "</span></li>"
    }
    for(var i in expresionesList){
        datalistContentH += "<li style='width: 100%;' id='Hli"+ expresionesList[i].t_id +"' class='row'><a href='#' class='col-2' onclick='selectExpresion(\""+ expresionesList[i].t_id +"\", \"hijo\")'><i class='far fa-square' id='checkhijo"+ expresionesList[i].t_id +"'></i></a><span class='col-10'>"+ expresionesList[i].t_id + " - " + expresionesList[i].t_term_de + " // " + expresionesList[i].t_term_es  + "</span></li>"
    }
    document.getElementById('expresionesListH').innerHTML = datalistContentH
    document.getElementById('expresionesListP').innerHTML = datalistContentP
    // $("#expresionesListH").html(datalistContentH)
    // $("#expresionesListP").html(datalistContentP)
}

var getAllList = () => {
    var service = "/expresiones/getAllList"
    adminService(service, "GET", {}, (data) => {
        expresionesList = data.response
    })
}

getPalabras("A")
getAllList()

var selectPasaje = (pos) => {
    $$pasajeView.setState("posicion_seleccionada", pos)
    $$pasajeView.setState("pasaje_seleccionado", $$pasajeView.getState().lista_pasajes[pos])
    document.getElementById('pasaje-orig').innerHTML = $$pasajeView.getState().lista_pasajes[pos].pasaje_original
    document.getElementById('pasaje-trad').innerHTML = $$pasajeView.getState().lista_pasajes[pos].pasaje_traduccion
    // $("#pasaje-orig").html($$pasajeView.getState().lista_pasajes[pos].pasaje_original)
    // $("#pasaje-trad").html($$pasajeView.getState().lista_pasajes[pos].pasaje_traduccion)
}

var aplicaBusqueda = () =>{
    var valorBusqueda = $("#busqueda").val()
    $(".hidden").removeClass("hidden")
    for(var y in todosTerminos){
      var patron = todosTerminos[y].expresion_de + " " + todosTerminos[y].expresion_es
      if (!patron.includes(valorBusqueda)){
        $("#heading" + todosTerminos[y].id).addClass("hidden")
        }
    }
    $(".jerarq").tooltip()
}

var aplicaBusquedaRef = () =>{
    var valorBusqueda = $("#busquedaR").val()
    $("li.hidden").removeClass("hidden")
    for(var y in todasReferencias){
        var patron = todasReferencias[y].ref_id + " " + todasReferencias[y].ref_libro_de + " " + todasReferencias[y].ref_libro_es
        if (!patron.includes(valorBusqueda)){
            $("#li" + todasReferencias[y].ref_id).addClass("hidden")
        }
    }
}

var aplicaBusquedaE = (e, option) =>{
    var valorBusqueda = $("#busqueda" + option).val()
    if(e.keyCode == 13 || valorBusqueda == ""){
        $("ul#expresionesList" + option).hide()
        $("div#"+option+"-loading-2").show()
        $("li.hidden").removeClass("hidden")
        for(var y in expresionesList){
            var patron = expresionesList[y].t_id + " " + expresionesList[y].t_term_de + " " + expresionesList[y].t_term_es
            if (!patron.includes(valorBusqueda)){
                $("#"+option+"li" + expresionesList[y].t_id).addClass("hidden")
            }
        }
        $("ul#expresionesList" + option).show()
        $("div#"+option+"-loading-2").hide()
    }
}

$("document").ready(function(){
     $("#main-content").show()
})
