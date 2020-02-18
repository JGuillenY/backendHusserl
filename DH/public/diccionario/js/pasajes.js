var todosTerminos = []

var pasajeLang = "de"
var mainView = true

var toggleMainView = () => {
    if($("div#pasaje-view").hasClass("smallHide")){
	$("div#alfabeto-view").addClass("smallHide")
	$("nav#side-view").addClass("smallHide")
	$("div#pasaje-view").removeClass("smallHide")
	mainView = true    
    }else{
	    $("div#alfabeto-view").removeClass("smallHide")
        $("nav#side-view").removeClass("smallHide")
        $("div#pasaje-view").addClass("smallHide")
  	mainView = false
    }
}

var $$menuView = $("#indicem").view({
    state : {
        opciones : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        opcionSeleccionada : "A"
    },
    selectLetter : function(letter){
        //console.log(letter)
        localStore.setItem("letter", letter)
        this.setState("opcionSeleccionada", letter)
        $$alfabetoView.setState("opcionSeleccionada", letter)
        getPalabras(letter)
    	$("#busqueda").val("")
    },
})

var getHier = (id, nombre) => {
    var service = "/expresiones/"+localStore.getItem("sublang")+"/hijosList/" + id
    webService(service, "GET", {}, (data) => {
        var service2 = "/expresiones/"+localStore.getItem("sublang")+"/abuelosList/" + id
        webService(service2, "GET", {}, (data2) => {
            $$hierView.setState("openH", {
                abuelos: data2.response,
                hijos : data.response,
                expresion : nombre
            })
            if($("#jerarquia-part").hasClass("show") == false){
                document.getElementById("jerarqplus").click()
                document.getElementById("ultimasplus").click()
            }
            $('[data-toggle="tooltip"]').tooltip("hide")
            chLang(localStore.getItem("lang"))
	})
    })
}

var getPalabras = (letra) => {
    //$(".lang").hide()
    if(letra == "#") letra = "todos"
    var service = "/expresiones/" + localStore.getItem("sublang") + "/" + letra
    $("div#expresiones").html('\
    <div id="loading">\
        <img src="images/Facebook-1s-200px.gif">\
    </div>\
    ')
    webService(service, "GET", {}, (data) => {
        if(data.error){
            alert("Error: ", data.error)
        }else{
            $("div#expresiones").html("")
            todosTerminos = data.response
	    console.log(todosTerminos)
            var palabraId = 0
            var divString = ""
            //if(localStore.getItem("sublang")=="es") var ll = data.response[y].traduccion.replace(/\s+/g, '');
		  //  else var ll = data.response[y].expresion.replace(/\s+/g, '');
            for(var y in data.response){
                //divString = ""
                if(localStore.getItem("sublang")=="es") var ll = data.response[y].traduccion.replace(/\s+/g, '');
                else var ll = data.response[y].expresion.replace(/\s+/g, '');
                if(data.response[y].id != palabraId){
                    if(y > 0){
                        divString += '\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>'
                    }
                    palabraId = data.response[y].id
                    divString += '\
                        <div class="card" id="card-'+ data.response[y].id +'">'
                    if(data.response[y].id == localStore.getObjects("pasajeActual").id){
                        divString += '<div class="card-header selected" id="heading'+data.response[y].id+'">'
                    }else{
                        divString += '<div class="card-header" id="heading'+data.response[y].id+'">'
                    }
                    divString += '<h6 class="mb-0 row" style="font-size:.8em;">\
                        <a href="#" style="color:black;" class="col-10" onclick="refreshPasaje(\'' + data.response[y].id +'\', \''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +'\', \'' + data.response[y].refid + '\')">'+data.response[y].pretty_e+' // '+data.response[y].pretty_t+'</a>\
                        <a class="arrowdown col-2" href="#" onclick="toggleArrow(this)" data-toggle="collapse" data-target="#collapse'+data.response[y].id+'" aria-expanded="true" aria-controls="collapse'+data.response[y].id+'"><i class="fas fa-angle-down"></i></a>\
                    </h6>\
                    </div>\
                    <div id="collapse'+data.response[y].id+'" class="collapse" aria-labelledby="heading'+data.response[y].id+'">\
                        <div class="card-body">\
                            <ul id="referenciasList-'+ data.response[y].id +'" style="padding-left: 15px;">'
                }   // var ll = data.response[y].expresion.split(" ")[0]            
                    if(data.response[y].refid != null){
                        if(data.response[y].orden == 1){
                            divString += '\
                            <a id="ref'+ data.response[y].refid + ll +'" href="#" class="referencias1" onclick="refreshPasaje(\'' + data.response[y].id +'\',\''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +' \', \'' + data.response[y].refid + '\')">'+ data.response[y].referencia_original +' // ' + data.response[y].referencia_traduccion +' {' + data.response[y].refid + '}</a>\
                            <br/>'
                        }else{
                            divString += '\
                            <a id="ref'+ data.response[y].refid + ll +'" href="#" class="referencias2" onclick="refreshPasaje(\''+ data.response[y].id +'\',\''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +'\', \'' + data.response[y].refid + '\')">'+ data.response[y].referencia_original +' // ' + data.response[y].referencia_traduccion + ' {' + data.response[y].refid + '}</a>\
                            <br/>'
                        }
                    }else{
                        divString += '<a class="referencias2 none">No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas.</a>'
                    }
                   // content += divString
            }
            document.getElementById('expresiones').innerHTML = divString
            // $("div#expresiones").append(content)
            $("div.card-header.selected h6 a.arrowdown").click()
	    //$(".lang").show()
           // if(localStore.getItem("lang") != "es") chLang(localStore.getItem("lang"))
            if(localStore.getItem("sublang") == "es"){
                $("#toes2").hide()
            }else{
                $("#tode2").hide()
            }
	    if(localStore.getItem('sublang') == 'es') document.getElementById("card-"+(localStore.getObjects("pasajeActual").id)).scrollIntoView()
	    else document.getElementById("card-"+(localStore.getObjects("pasajeActual").id - 1)).scrollIntoView()
	    chLang(localStore.getItem("lang"))    
	//getTo("card-"+localStore.getObjects("pasajeActual").id)
        }
    })
}

var changeLang = (l) => {
    $("#toes2").toggle()
    $("#tode2").toggle()
    $(".lang").tooltip("hide")
    localStore.setItem("sublang", l)
    getPalabras(localStore.getItem("letter"))
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

var $$menuView = $("#menu-view").view({
    state : {
        opciones : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    },
    selectLetter : function(letter){
        localStore.setItem("letter", letter)
        $$alfabetoView.setState("opcionSeleccionada", letter)
        getPalabras(letter)
    },
})

var $$alfabetoView = $("div#alfabeto-view").view({
    state : {
        opcionSeleccionada : "",
        expresiones : [],
        currentLang : "es"
    }
})

var $$pasajeView = $("div#pasaje-view").view({
    state: {
        lista_pasajes : [],
        pasaje_seleccionado : {},
        lang : "de",
        posicion_seleccionada : 0
    },
    changeLang : function(l){
	//console.log(l)
	localStore.setObject("pasajeLang", l)
        if(l == "es"){
		$("#tode").show()
		$("#toes").hide()
		$("#closed-pasajes div.pasaje-original").hide()
        $("#closed-pasajes div.pasaje-traduccion").show()
	}else{
		$("#tode").hide()
        $("#toes").show()
        $("#closed-pasajes div.pasaje-original").show()
        $("#closed-pasajes div.pasaje-traduccion").hide()		
	}
	$('[data-toggle="tooltip"]').tooltip("hide")
    }
})

var descargarRef = () => {
    $('[data-toggle="tooltip"]').tooltip("hide")
    $("#download-modal").modal("show")
}

var $$hierView = $("div#hierarchy-view").view({
    state : {
        openH : {
            abuelos: [],
            hijos : [],
            expresion : ""
        },
    },
    goToPasage : function(ultima) {
        var letra = ultima.expresion.slice(0,1)
        localStore.setItem("letter", letra)
    }
})

var topasajewtid = (id, i) => {
    var service = "/referencias/obtieneReferenciasByTerm/" + id
    webService(service, "GET", {}, (data) => {
        localStore.setItem("letter", i)
        if(localStore.getItem("sublang") == "es") toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_traduccion), data.response[0].ref_original, data.response[0].refid)
        else toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
	//toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
    })
}

var topasajewid = (refid) => {
    var service = "/referencias/obtieneReferenciasByRef/" + refid
    webService(service, "GET", {}, (data) => {
        toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
    })
}

var getInitial = (word) => {
    if(word[0] == ".") var letra = word.slice(4,5)
    else if(word[0] == "'") var letra = word.slice(1,2)
    else var letra = word.slice(0,1)
    switch(letra){
    	case 'á':case 'ä': case 'Á': case 'Ä': letra = 'A'; break;
	case 'é':case 'Ë': case 'É': case 'Ë': letra = 'E'; break;
	case 'í':case 'ï': case 'Í': case 'Ï': letra = 'I'; break;
	case 'ó':case 'ö': case 'Ó': case 'Ö': letra = 'O'; break;
	case 'ú':case 'ü': case 'Ú': case 'Ü': letra = 'U'; break;
	default : letra = letra.toUpperCase()
    }
    return letra
}

var toPasaje = (id, expresion, referencia, refid) => {
    var lista = localStore.getObjects("sesion").ultimasVisitadas
    lista.push({
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid,
    	"lang" : localStore.getItem("sublang")
    })
    var pasajeActual = {
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid
    }
    // var letra = expresion.slice(0,1)
    // localStore.setItem("letter", letra)
    localStore.setObjects("pasajeActual", pasajeActual)
    var sesion = localStore.getObjects("sesion")
    sesion.ultimasVisitadas = lista
    localStore.setObjects("sesion", sesion)
    $$ultimosView.setState("ultimasVisitadas", lista.reverse())
    changeView("pasajes")
}

var refreshPasaje = (id, expresion, referencia, refid) => {
    //console.log("id: " + id + ", expresion: " + expresion + ", referencia: " + referencia + ", refid: " + refid)
    var lista = localStore.getObjects("sesion").ultimasVisitadas
    lista.push({
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid,
    	"lang" : localStore.getItem("sublang")
    })
    var pasajeActual = {
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid,
    	"lang" : localStore.getItem("sublang")
    }
    localStore.setObjects("pasajeActual", pasajeActual)
    if(refid != 'null'){
    var sesion = localStore.getObjects("sesion")
    sesion.ultimasVisitadas = lista
    localStore.setObjects("sesion", sesion)
    $$ultimosView.setState("ultimasVisitadas", lista.reverse())
    service = "/referencias/obtieneReferencias/" + localStore.getObjects("pasajeActual").id
    webService(service, "GET", {}, (data) => {
        //console.log(data)
	    getHier(localStore.getObjects("pasajeActual").id, localStore.getObjects("pasajeActual").expresion)
        $$pasajeView.setState("lista_pasajes", data.response)
        for(var i in data.response){
            if(data.response[i].refid == localStore.getObjects("pasajeActual").refid){
                var selPos = i
                selectPasaje(i)
                if(!$("a.left-arrowL").hasClass('open') || !$("a.right-arrowL").hasClass('open')){
                    $("#langs").hide()
                    $("#closed-pasajes").removeClass('open')
                    $("#closed-pasajes").addClass('closed')
                    $("#open-pasajes").addClass('open')
                    $("#open-pasajes").removeClass('closed')
                }
            }
        }
        $('[data-toggle="tooltip"]').tooltip()
        $(".selected").removeClass("selected")
        $("#heading" + localStore.getObjects("pasajeActual").id).addClass("selected")
        
	if(localStore.getItem("sublang")=="es")
			var ll = data.response[selPos].expresion_traduccion.replace(/\s+/g, '');
		else
            var ll = data.response[selPos].expresion_original.replace(/\s+/g, '');
        $("#ref" + data.response[selPos].refid + ll).addClass("visited")
        //console.log("#ref" + data.response[selPos].refid + ll)
        //$$pasajeView.changeLang(localStore.getObject("pasajeLang"))
        $(".smallView").removeClass("smallView")
        if(mainView){
            $("div#alfabeto-view").removeClass("smallHide")
            $("nav#side-view").removeClass("smallHide")
            $("div#pasaje-view").addClass("smallHide")
        }else{
            $("div#alfabeto-view").addClass("smallHide")
            $("nav#side-view").addClass("smallHide")
            $("div#pasaje-view").removeClass("smallHide")
        }
        repaint()
	chLang(localStore.getItem('lang'))
    })}else{
	$(".selected").removeClass("selected")
	$("div#pasajeContent").html("<div style='text-align : center'><strong>No hay ninguna referencia para esta expresión.<br/> Ver por favor la lista de expresiones derivadas</strong></div>")
	getHier(localStore.getObjects("pasajeActual").id, localStore.getObjects("pasajeActual").expresion)
        switch(localStore.getItem('lang')){
        case "es":
        alert("No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas")
        break
        case "en":
        alert("The selected expression has no passage. Please look the list of derived expressions.")
        break
        case "al":
        alert("Der ausgewählte Ausdruck hat keine Passage. Siehe bitte die Liste der Ableitungsausdrücke.")
        break
        case "fr":
        alert("L'expression sélectionnée n'a pas de passage. Voir la liste d’expressions dérivées.")
        break}

    }
}

var $$ultimosView = $("div#ultimos-view").view({
    state : {
        ultimasVisitadas : localStore.getObjects("sesion").ultimasVisitadas.reverse()
    },
    goToPasage : function(ultima) {
	//console.log(ultima)
	console.log(ultima)
        localStore.setItem("sublang", ultima.lang)
	var letra = getInitial(ultima.expresion)
	//console.log(letra)
        localStore.setItem("letter", letra)
        //toPasaje(ultima.id, ultima.expresion, ultima.referencia, ultima.refid)
	toPasaje(ultima.id, window.btoa(ultima.expresion), ultima.referencia, ultima.refid)    
	//refreshPasaje(ultima.id, ultima.expresion, ultima.referencia, ultima.refid)    
    }
})

var selectPosicion = (pos) => {
    selectPasaje(pos)
}

var sigPosicion = (pos) => {
    selectPasaje(pos+1)
}

var antPosicion = (pos) => {
    selectPasaje(pos-1)
}

var repaint = () => {
    var currentPos = parseInt($$pasajeView.getState().posicion_seleccionada)
    var pasajesList = $$pasajeView.getState().lista_pasajes
    var pagination = '\
    <nav aria-label="Page navigation example">\
    <ul class="pagination justify-content-center" style="margin: 0;">'
    pagination += '<li class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[0].ref_original+'">'
    pagination += '\
        <a class="page-link" href="#" onclick="selectPasaje(0)" tabindex="-1"><i class="fas fa-angle-double-left"></i></a>\
        </li>'
    if(currentPos == 0)
        pagination += '<li class="page-item disabled">'
    else
        pagination += '<li class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[currentPos-1].ref_original+'">'
    pagination += '\
        <a class="page-link" href="#" onclick="antPosicion('+ currentPos +')" tabindex="-1"><i class="fas fa-angle-left"></i></a>\
        </li>'
        var page = 1
    var back = 0
    var front = 0
    if(pasajesList.length > 5){
        if(currentPos - 2 >= 0)
	    back = 2
        else if(currentPos - 1 == 0)
            back = 1
        if(currentPos + 2 < pasajesList.length)
	    front = 2
        else if(currentPos + 1 < pasajesList.length){
	    front = 1
            back += 1
        }else
            back += 2
        for(var x=currentPos - back; x<currentPos; x++){
	    page = 1 + parseInt(x)
            pagination += '\
                        <li id="pos'+x+'" onclick="selectPosicion('+ x +')" class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[x].ref_original+'"><a class="page-link" href="#">'+ page +'</a></li>'
	}
        page = 1 + parseInt(currentPos)
        pagination += '\
                    <li id="pos'+currentPos+'" onclick="selectPosicion('+ currentPos +')" class="page-item selected" data-toggle="tooltip" data-placement="top" title="'+pasajesList[currentPos].ref_original+'"><a class="page-link" href="#">'+ page +'</a></li>\
                    '
        for(var y=parseInt(currentPos) + 1; y<=parseInt(currentPos) + front; y++){
            page = 1 + parseInt(y)
            pagination += '\
                        <li id="pos'+y+'" onclick="selectPosicion('+ y +')" class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[y].ref_original+'"><a class="page-link" href="#">'+ page +'</a></li>\
                        '
        }
    }else{
        for(var i in pasajesList){
            page = 1 + parseInt(i)
            if(i == currentPos){
                pagination += '\
                        <li id="pos'+i+'" onclick="selectPosicion('+ i +')" class="page-item selected" data-toggle="tooltip" data-placement="top" title="'+pasajesList[i].ref_original+'"><a class="page-link" href="#">'+ page +'</a></li>\
                        '
            }else{
                pagination += '\
                        <li id="pos'+i+'" onclick="selectPosicion('+ i +')" class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[i].ref_original+'"><a class="page-link" href="#">'+ page +'</a></li>\
                        '
            }
        }
    }
    var reach = pasajesList.length - 1
    if(currentPos == reach)
        pagination += '<li class="page-item disabled">'
    else
        pagination += '<li class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[parseInt(currentPos)+1].ref_original+'">'
    pagination += '\
            <a class="page-link" href="#" onclick="sigPosicion('+ currentPos +')" ><i class="fas fa-angle-right"></i></a>\
        </li>'
    pagination += '<li class="page-item" data-toggle="tooltip" data-placement="top" title="'+pasajesList[reach].ref_original+'">'
    pagination += '\
        <a class="page-link" href="#" onclick="selectPasaje('+ reach +')" tabindex="-1"><i class="fas fa-angle-double-right"></i></a>\
        </li>\
        </ul>'
        if(pasajesList.length == 1)
            pagination+='<small style="top: -5px;position: relative;left: 5px;"><span id="hay">Hay</span> '+ pasajesList.length +' <span id="pasajeen">pasaje en total.</span></small>'
        else
            pagination+='<small style="top: -5px;position: relative;left: 5px;"><span id="hay">Hay</span> '+ pasajesList.length +' <span id="pasajesen">pasajes en total.</span></small>'
        pagination+='</nav>'
    $("#pagination").html(pagination)
    if($$pasajeView.getState().lang == 'es'){
        $("#closed-original div.pasaje-traduccion").hide()
    }else{
        $("#closed-pasajes div.pasaje-traduccion").hide()
        $("#tode").hide()
    }
    $(".page-item").tooltip()
    $$pasajeView.changeLang(localStore.getObject("pasajeLang"))
}

var selectPasaje = (pos) => {
    $('[data-toggle="tooltip"]').tooltip("hide")
    localStore.setItem("refId", pos)
    $$pasajeView.setState("posicion_seleccionada", pos)
    $$pasajeView.setState("pasaje_seleccionado", $$pasajeView.getState().lista_pasajes[pos])
    console.log($$pasajeView.getState().lista_pasajes[pos])
    var lp = localStore.getObjects("pasajeActual")
    lp.refid = $$pasajeView.getState().lista_pasajes[pos].refid
    console.log(lp)
    localStore.setObjects("pasajeActual", lp) 
    repaint()
    $(".pasaje-orig").html($$pasajeView.getState().lista_pasajes[pos].pasaje_original)
    $(".pasaje-trad").html($$pasajeView.getState().lista_pasajes[pos].pasaje_traduccion)
    if(!$("a.left-arrowL").hasClass('open') || !$("a.right-arrowL").hasClass('open')){
        $("#langs").hide()
        $("#closed-pasajes").removeClass('open')
	$("#closed-pasajes").addClass('closed')
        $("#open-pasajes").addClass('open')
        $("#open-pasajes").removeClass('closed')
    }
    $("#ref" + $$pasajeView.getState().lista_pasajes[pos].refid + $$pasajeView.getState().lista_pasajes[pos].expresion_original).addClass("visited")
}

if(!localStore.getItem("sublang")){
    localStore.setItem("sublang", "al")
}else{
    $$alfabetoView.setState("lang", localStore.getItem("sublang"))
}

if(localStore.getItem("letter")) $$menuView.selectLetter(localStore.getItem("letter"))
else $$menuView.selectLetter("A")

if(localStore.getObjects("pasajeActual")){
    service = "/referencias/obtieneReferencias/" + localStore.getObjects("pasajeActual").id
    webService(service, "GET", {}, (data) => {
	getHier(localStore.getObjects("pasajeActual").id, localStore.getObjects("pasajeActual").expresion)
        $$pasajeView.setState("lista_pasajes", data.response)
        for(var i in data.response){
            if(data.response[i].refid == localStore.getObjects("pasajeActual").refid){
                var posSel = i
                selectPasaje(i)
            }
        }
        $('[data-toggle="tooltip"]').tooltip()
        repaint()
	if(localStore.getItem("lang") != "es") chLang(localStore.getItem("lang"))
        $(".selected").removeClass(".selected")
        $("#heading" + localStore.getObjects("pasajeActual").id).addClass(".selected")
    })
}else{
    $$pasajeView.setState("pasaje_seleccionado", nuevoPasaje)
    $$pasajeView.setState("lista_pasajes", [nuevoPasaje])
}

var keep = 0

var hideNav = (side) => {
    switch(side){
        case 'left':
            if($("a.left-arrowL").hasClass('open')) {
                $("a.left-arrowL").removeClass('open')
                $("a.left-arrowL").addClass('closed')
                $("a.left-arrowL i").removeClass('fa-angle-left')
                $("a.left-arrowL i").addClass('fa-angle-right')
                $("div#indice").hide()
                $("div#alfabeto-view").removeClass("col-sm-3")
                $("#langs").hide()
                $("#closed-pasajes").removeClass('open')
                if(!$("#closed-pasajes").hasClass('closed')) $("#closed-pasajes").addClass('closed')
                if(!$("#open-pasajes").hasClass('closed')) $("#open-pasajes").addClass('open')
                $("#open-pasajes").removeClass('closed')
            }else{
                if($("a.right-arrowL").hasClass('open')){
                    $("#langs").show()
                    if(!$("#closed-pasajes").hasClass('open')) $("#closed-pasajes").addClass('open')
                    $("#closed-pasajes").removeClass('closed')
                    $("#open-pasajes").removeClass('open')
                    if(!$("#open-pasajes").hasClass('closed')) $("#open-pasajes").addClass('closed')
                }
                $("a.left-arrowL").removeClass('closed')
                $("a.left-arrowL").addClass('open')
                $("a.left-arrowL i").removeClass('fa-angle-right')
                $("a.left-arrowL i").addClass('fa-angle-left')
                $("div#indice").show()
                $("div#alfabeto-view").addClass("col-sm-3")
            }
            break;
        case 'right':
            if($("a.right-arrowL").hasClass('open')) {
                $("#langs").hide()
                $("a.right-arrowL").removeClass('open')
                $("a.right-arrowL").addClass('closed')
                $("a.right-arrowL i").removeClass('fa-angle-right')
                $("a.right-arrowL i").addClass('fa-angle-left')
                $("div.side-view-body").hide()
                $("nav#side-view").removeClass("col-sm-3")
                $("#closed-pasajes").removeClass('open')
                if(!$("#closed-pasajes").hasClass('closed')) $("#closed-pasajes").addClass('closed')
                if(!$("#open-pasajes").hasClass('open')) $("#open-pasajes").addClass('open')
                $("#open-pasajes").removeClass('closed')
            }else{
                if($("a.left-arrowL").hasClass('open')){
                    $("#langs").show()
                    if(!$("#closed-pasajes").hasClass('open')) $("#closed-pasajes").addClass('open')
                    $("#closed-pasajes").removeClass('closed')
                    $("#open-pasajes").removeClass('open')
                    if(!$("#open-pasajes").hasClass('closed')) $("#open-pasajes").addClass('closed')
                }
                $("a.right-arrowL").removeClass('closed')
                $("a.right-arrowL").addClass('open')
                $("a.right-arrowL i").removeClass('fa-angle-left')
                $("a.right-arrowL i").addClass('fa-angle-right')
                $("div.side-view-body").show()
                $("nav#side-view").addClass("col-sm-3")
            }
            break;
        case 'open-both':
            if(!$("a.left-arrowL").hasClass('open')){
                hideNav("left")
            }
            if(!$("a.left-arrowR").hasClass('open')){
                hideNav("right")
            }
            break;
        case 'close-both':
            if($("a.left-arrowL").hasClass('open')){
                hideNav("left")
            }
            if($("a.left-arrowR").hasClass('open')){
                hideNav("right")
            }
            break;
    }
}

var downloadFile = (file, type) => {
    $("#toDownloadDiv").html("<a href='/files/"+file+"."+type+"' id='fileToDownload' download></a>")
}

var modalView = $("div#modal-view").view({
    state: {
    },
    submitDw : function(e){
        e.preventDefault()
        var opciones = []
        this.data['ev-aleman'] ? opciones.push(1) : opciones.push(0)
        this.data['ev-espaniol'] ? opciones.push(1) : opciones.push(0)
        this.data['rf-aleman'] ? opciones.push(1) : opciones.push(0)
        this.data['rf-espaniol'] ? opciones.push(1) : opciones.push(0)
        this.data['ps-aleman'] ? opciones.push(1) : opciones.push(0)
        this.data['ps-espaniol'] ? opciones.push(1) : opciones.push(0)
        this.data['jq-rf'] ? opciones.push(1) : opciones.push(0)
        if(this.data.opcionTexto){
            var serviceR = "/reporte/reporteText/" + localStore.getObjects("pasajeActual").id + "?expresion_aleman=1expresion_espaniol=1&referencia_aleman=1\
            &referencia_espaniol=1&pasaje_aleman=" + opciones[4] + "&pasaje_espaniol=" + opciones[5] +
            "&hierarchy=" + opciones[6] + "&lang=" + localStore.getItem("lang") + "&refid=" + localStore.getObjects("pasajeActual").refid
            webService(serviceR, "GET", {}, (data) => {
                downloadFile(data.response, "txt")
                $("#download-modal").modal("hide")
                document.getElementById("fileToDownload").click()
            })
        }else{
            var serviceR = "/reporte/reportepdf/" + localStore.getObjects("pasajeActual").id + "?expresion_aleman=1&expresion_espaniol=1&referencia_aleman=1\
            &referencia_espaniol=1&pasaje_aleman=" + opciones[4] + "&pasaje_espaniol=" + opciones[5] +
            "&hierarchy=" + opciones[6] + "&lang=" + localStore.getItem("lang") + "&refid=" + localStore.getObjects("pasajeActual").refid
            webService(serviceR, "GET", {}, (data) => {
                downloadFile(data.response, "pdf")
                $("#download-modal").modal("hide")
                document.getElementById("fileToDownload").click()
            })
        }
    }
})

$("document").ready(function(){
    $("#sub-loading").hide()
    $("#main-content").show() 
    //$$pasajeView.changeLang(localStore.getObject("pasajeLang"))
    if(!localStore.getObject("pasajeLang")) localStore.setObject("pasajeLang", "de")
    $$pasajeView.changeLang(localStore.getObject("pasajeLang"))  
})

var togglepart = (id) => {
    if($("#" + id).hasClass("fa-plus")){
        $("#" + id).removeClass("fa-plus")
        $("#" + id).addClass("fa-minus")
    }else{
        $("#" + id).removeClass("fa-minus")
        $("#" + id).addClass("fa-plus")
    }
}

var aplicaBusqueda = () =>{
  var valorBusqueda = $("#busqueda").val()
  $(".hidden").removeClass("hidden")
  for(var y in todosTerminos){
    var patron = todosTerminos[y].expresion + " " + todosTerminos[y].traduccion
    if (!patron.includes(valorBusqueda)){
      $("#heading" + todosTerminos[y].id).parent().addClass("hidden")
      }
  }
  $(".jerarq").tooltip()
}

