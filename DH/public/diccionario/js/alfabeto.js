var todosTerminos = []

var refOrder = ["IP", "PW", "I1", "I2", "PV", "CM"]

var topasajewid = (refid) => {
    var service = "/referencias/obtieneReferenciasByRef/" + refid
    //console.log(service)
    webService(service, "GET", {}, (data) => {
       // console.log("respuesta: ")
	    //console.log(data)
	    toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
    })
}

var topasajewtid = (id, i) => {
    //console.log(id + " " + i)
    var service = "/referencias/obtieneReferenciasByTerm/" + id
    webService(service, "GET", {}, (data) => {
        //console.log(data)
	    localStore.setItem("letter", i)
        if(localStore.getItem("sublang") == "es") toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_traduccion), data.response[0].ref_original, data.response[0].refid)
        else toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
	//toPasaje(data.response[0].id, window.btoa(data.response[0].expresion_original), data.response[0].ref_original, data.response[0].refid)
    })
}

var toggleSmallSide = () => {
    if($("a#down-arr").hasClass("full")){
	$("a#down-arr").removeClass("full")
	$("a#down-arr i").removeClass("fa-chevron-circle-up")
	$("a#down-arr i").addClass("fa-chevron-circle-down")
	$("div#alfabeto-view").removeClass("full")
    }else{
    	$("a#down-arr").addClass("full")
        $("a#down-arr i").removeClass("fa-chevron-circle-down")
        $("a#down-arr i").addClass("fa-chevron-circle-up")
	$("div#alfabeto-view").addClass("full")
    }
}

var getHier = (id, nombre) => {
    $("div.selected").removeClass("selected")
    $("#heading" + id).addClass("selected")
    var service = "/expresiones/"+localStore.getItem("sublang")+"/hijosList/" + id
    webService(service, "GET", {}, (data) => {
        //console.log(data)
	var service2 = "/expresiones/"+localStore.getItem("sublang")+"/abuelosList/" + id
        webService(service2, "GET", {}, (data2) => {
            //console.log(data2)
	        $$hierView.setState("openH", {
                abuelos: data2.response,
                hijos : data.response,
                expresion : nombre
            })
            if($("#jerarquia-part").hasClass("show") == false){
                document.getElementById("jerarqplus").click()
            }
            $('[data-toggle="tooltip"]').tooltip("hide")
            chLang(localStore.getItem("lang"))
	})
    })
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
        $("#busqueda").val("")
	getPalabras(letter)
    },
})

var getPalabras = (letra) => {
    if(letra == "#") letra = "todos"
    var service = "/expresiones/" + localStore.getItem("sublang") + "/" + letra
    $("div#expresiones").html('\
    <div id="loading">\
        <img src="images/Facebook-1s-200px.gif">\
    </div>\
    ')
    if(localStore.getItem("sublang") == "es"){
        $("#toes").hide()
        }else{
        $("#tode").hide()
    }
    // console.log("calling service...")
    webService(service, "GET", {}, (data) => {
        if(data.error){
            alert("Error: ", data.error)
        }else{
            $("div#expresiones").html("")
            todosTerminos = data.response
	    //console.log(todosTerminos)
	    // console.log("Before process...")
            var palabraId = 0
            var c = ""
            for(var y in data.response){
                //if(y > 0 && data.response[y].id != palabraId)
                if(data.response[y].id != palabraId){
                    if(y > 0){
                        c += '\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>'
                    }
                    palabraId = data.response[y].id
                    c += '\
                    <div class="card">\
                        <div class="card-header" id="heading'+data.response[y].id+'">\
                        <h6 class="mb-0 row" style="font-size:1.1em;">\
                            <a href="#" style="color:black; padding-right: 0;" class="col-10" onclick="toPasaje(\'' + data.response[y].id +'\', \''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +'\', \'' + data.response[y].refid + '\')">'+data.response[y].pretty_e+' // '+data.response[y].pretty_t+'</a>\
                            <a class="arrowdown col-1" href="#" onclick="toggleArrow(this)" data-toggle="collapse" data-target="#collapse'+data.response[y].id+'" aria-expanded="true" aria-controls="collapse'+data.response[y].id+'"><i class="fas fa-angle-down"></i></a>\
                            <a class="col-1 jerarq" href="#" onclick="getHier(\''+ data.response[y].id +'\',\''+ data.response[y].expresion +'\')" data-toggle="tooltip" data-placement="top" title="Mostrar Jerarquía"><i class="fas fa-sitemap"></i></a>\
                        </h6>\
                        </div>\
                        <div id="collapse'+data.response[y].id+'" class="collapse" aria-labelledby="heading'+data.response[y].id+'">\
                            <div class="card-body">\
                                <ul id="referenciasList-'+ data.response[y].id +'">'
                }
                if(data.response[y].refid != null){
                    if(data.response[y].orden == 1){
                        c+= '\
                        <a href="#" class="referencias1" onclick="toPasaje(\'' + data.response[y].id +'\', \''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +'\', \'' + data.response[y].refid + '\')">'+ data.response[y].referencia_original +' // ' + data.response[y].referencia_traduccion + " {" + data.response[y].refid + '}</a>\
                        <br/>'
                    }else{
                        c+= '\
                        <a href="#" class="referencias2" onclick="toPasaje(\'' + data.response[y].id +'\', \''+ window.btoa(data.response[y].expresion) +'\',\''+ data.response[y].referencia_original +'\', \'' + data.response[y].refid + '\')">' + data.response[y].referencia_original +' // ' + data.response[y].referencia_traduccion + " {" + data.response[y].refid + '}</a>\
                        <br/>'
                    }
                }else{
                    c+='<a class="referencias2 none">No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas.</a>'	
                }
                
            }
	    // console.log(c)
            document.getElementById("expresiones").innerHTML = c
            //$("div#expresiones").html(c)
            $(".jerarq").tooltip()
           // if(localStore.getItem("sublang") == "es"){
           //     $("#toes").hide()
           // }else{
           //     $("#tode").hide()
           // }
	    if($("a#down-arr").hasClass("full"))
        	$("div#alfabeto-view").addClass("full")
            if(localStore.getItem("lang") != "es")
                chLang(localStore.getItem("lang"))
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

var $$alfabetoView = $("div#alfabeto-view").view({
    state : {
        opcionSeleccionada : "",
        expresiones : [],
        currentLang : "es"
    }
})

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
        toPasaje(ultima.id, window.btoa(ultima.expresion), ultima.referencia, ultima.refid)
    }
})

var toPasaje = (id, expresion, referencia, refid) => {
    if(refid != 'null'){
    var lista = localStore.getObjects("sesion").ultimasVisitadas
    lista.push({
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid,
        "lang" : localStore.getItem("sublang")
    })
    localStore.getItem("sublang")
    var pasajeActual = {
        "id" : id,
        "expresion" : window.atob(expresion),
        "referencia" : referencia,
        "refid" : refid
    }
    localStore.setObjects("pasajeActual", pasajeActual)
    var sesion = localStore.getObjects("sesion")
    sesion.ultimasVisitadas = lista
    localStore.setObjects("sesion", sesion)
    $$ultimosView.setState("ultimasVisitadas", lista.reverse())
   //console.log(pasajeActual)
    changeView("pasajes")
    }else{
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
    	getHier(id, window.atob(expresion))
    }
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

var $$ultimosView = $("div#ultimos-view").view({
    state : {
        ultimasVisitadas : localStore.getObjects("sesion").ultimasVisitadas.reverse()
    },
    goToPasage : function(ultima) {
        localStore.setItem("sublang", ultima.lang)
	var letra = getInitial(ultima.expresion)
        localStore.setItem("letter", letra)
        toPasaje(ultima.id, window.btoa(ultima.expresion), ultima.referencia, ultima.refid)
    }
})

var langg = 'de'

var changeLang = (l) => {
    $("#toes").toggle()
    $("#tode").toggle()
    $(".lang").tooltip("hide")
    localStore.setItem("sublang", l)
    getPalabras(localStore.getItem("letter"))
}

if(!localStore.getItem("sublang")){
    localStore.setItem("sublang", "al")
}else{
    $$alfabetoView.setState("lang", localStore.getItem("sublang"))
}

//if(localStore.getItem("lang") != "es") chLang(localStore.getItem("lang"))

if(localStore.getItem("letter")) $$menuView.selectLetter(localStore.getItem("letter"))
else $$menuView.selectLetter("A")

var tutorial2 = () => {
    setTimeout(function(){
        var audio = new Audio('sounds/click.mp3');
        audio.play();
        $("#dropdownMenuButton").click()
        $("#dropdownMenuButton").click()
	setTimeout(function(){
            // var sesion = localStore.getObjects("sesion")
            // sesion["notN"] = "true"
            localStore.setObject("notN", "true")
        }, 3000)
    }, 100)
}

var togglepart = function(id){
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
        $("#heading" + todosTerminos[y].id).addClass("hidden")
        }
    }
    $(".jerarq").tooltip()
}

$("document").ready(function(){
    $(".lang").tooltip()
    if(localStore.getItem("lang") != "es"){
        chLang(localStore.getItem("lang"))
    }
    if(!localStore.getObject("notN")){
        $("#Bienvenida").modal("show")
    }
    if(localStore.getItem("sublang") == "es"){
        $("#toes").hide()
    }else{
        $("#tode").hide()
    }
    $("#indicem").show()
    $("#sub-loading").hide()
    $("#main-content").show()
})
