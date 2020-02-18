var todosPasajes = []

var nuevoPasaje = {
    "ref_id" : "",
    "ref_def_de" : "",
    "ref_def_es" : "",
    "ref_libro_de" : "",
    "ref_libro_es" : ""
}

var newPasaje = () => {
    $$pasajeView.setState("option", "nuevo")
    $$pasajeView.setState("expresionSeleccionada", nuevoPasaje)
    $(".expresion-selected").removeClass('expresion-selected')
    $('textarea#mainEditar').val(nuevoPasaje.ref_def_de);
    $('textarea#mainDEditar').val(nuevoPasaje.ref_def_es);
    $('textarea#mainEditar').ckeditor();
    $('textarea#mainDEditar').ckeditor();
    $("#ref_id").prop("disabled", false)
    $(".pasaje-login").hide()
}

var deletePasaje = () => {
    if(confirm("¿Está seguro de querer eliminar el pasaje seleccionado?")){
        console.log($$pasajeView.getState().expresionSeleccionada)
        adminService("/referencias/buscarPasaje/" + $$pasajeView.getState().expresionSeleccionada.ref_id, "GET", {}, (data) => {
            if(data.error){
                createAlert("Error: ", data.error)
            }else{
                if(data.response.length > 0){
                    alert("Este pasaje está relacionado con expresiones del diccionario. Por favor, elimine dichas relaciones antes de continuar.")
                }else{
                    console.log($$pasajeView.getState().expresionSeleccionada)
                    adminService("/referencias/eliminarPasaje/" + $$pasajeView.getState().expresionSeleccionada.ref_id, "DELETE", {}, (datad) => {
                        if(data.error){
                            createAlert("Error: ", data.error)
                        }else{
                            console.log(datad)
                            location.reload()
                        }
                    })
                }
            }
        })
    }
}

var init = () => {
    var service = "/referencias/lista"
    $("div#expresiones").html('\
    <div id="loading">\
        <img src="images/Facebook-1s-200px.gif">\
    </div>')
    adminService(service, "GET", {}, (data) => {
        if(data.error){
            createAlert("Error: ", data.error)
        }else{
            todosPasajes = data.response
            $$alfabetoView.setState("expresiones", data.response)
            $$alfabetoView.selectExpresion(data.response[0])
            // $$alfabetoView.setState("opcionSeleccionada", data.response[0])
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

var guardar = () => {
    var servicio = ""
    if($$pasajeView.getState().option == "nuevo"){
        servicio = "/referencias/new/nuevoPasaje"
    }else servicio = "/referencias/editarPasaje/" + $$pasajeView.getState().expresionSeleccionada.ref_id
    var params = {
        "ref_id": btoa($("ref_id").val()).toString(),
        "pasaje_de" : btoa($("#mainEditar").val()).toString(),
        "ref_de" : btoa($("#ref_libro_de").val()).toString(),
        "pasaje_es" : btoa($("#mainDEditar").val()).toString(),
        "ref_es" : btoa($("#ref_libro_es").val()).toString(),
        "clave" : $("#clave").val()
    }
    adminService(servicio, "POST", JSON.stringify(params), (data) => {
        console.log(data)
        if(data.status == 502){
            alert("El id que intenta guardar ya existe.")
        }else{
            alert("Se ha guardado correctamente.")
            if($$pasajeView.getState().option == "nuevo"){
                location.reload()
            }
        }
    })
}

var $$menuView = $("#menu-view").view({
    state : {
    }
})

var $$alfabetoView = $("div#alfabeto-view").view({
    state : {
        opcionSeleccionada : "",
        expresiones : [],
        // expresionSeleccionada : {'id' : ''}
    },
    selectExpresion : function(expresion){
        $$pasajeView.setState("expresionSeleccionada", expresion)
        $(".expresion-selected").removeClass('expresion-selected')
        $$pasajeView.setState("option", "editar")
        $("#expresion" + expresion.ref_id).addClass('expresion-selected')
        // this.setState("expresionSeleccionada", expresion)
        var service = "/referencias/" + expresion.ref_id
        adminService(service, "GET", {}, (data) => {
            $('textarea#mainEditar').val(data.response[0].ref_def_de);
            $('textarea#mainDEditar').val(data.response[0].ref_def_es);
            $("#clave").val(data.response[0].clave)
            $("#clave_es").val(data.response[0].clave)
            $('textarea#mainEditar').ckeditor();
            $('textarea#mainDEditar').ckeditor();
            $("#ref_id").prop("disabled", true)
            $(".pasaje-login").hide()
        })
    }
})

var $$pasajeView = $("div#pasaje-view").view({
    state: {
        option : "",
        pasaje_seleccionado : {},
        lang : "de",
        posicion_seleccionada : 0,
        expresionSeleccionada : {},
        referencias : []
    }
})

init()

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
    console.log(aplicaBusqueda)
    $(".hidden").removeClass("hidden")
    for(var y in todosPasajes){
        var patron = todosPasajes[y].ref_id + " " + todosPasajes[y].ref_libro_de + " " + todosPasajes[y].ref_libro_es
        if (!patron.includes(valorBusqueda)){
            $("#pasaje" + todosPasajes[y].ref_id).addClass("hidden")
        }
    }
    $(".jerarq").tooltip()
}

$("document").ready(function(){
    $("#main-content").show()
})
