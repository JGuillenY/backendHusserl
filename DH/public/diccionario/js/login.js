lang.loadPack('al')
lang.loadPack('en')

const localStore = new storage()

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []   
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)              
    linkTo("main.html")
}

//Vistas
var $$vistaIngreso = $("#ingreso").view({
    state : {},
    login : function() {
        // e.preventDefault()
        var password = this.data.password
        var service = "/login/usuario"
        // var service = "/login/usuario?userId=" + this.data.user + "&password=" + this.data.password
        var params = JSON.stringify({'userId' : this.data.user, 'password' : this.data.password})
        loginService(service, "POST", params, (data) => {
	    console.log(data)
            if(data.error){
                createAlert("Error: ", data.error)
            }else{
                setStore(data.response, password)
            }
	})
    },
    toggleLoginView : function(){
        $(".login-card").toggle()
    }
})

var $$vistaRegistro = $("#registro").view({
    state : {
        
    },
    signup : function() {
        // e.preventDefault()
        var comprobacion = this.data.comprobacion
        console.log(comprobacion)
        var params = {
            'nombre' : this.data.nombre,
            'apellidos' : this.data.apellidoS,
            'email' : this.data.email,
            'institucion' : this.data.institucion,
            'grado' : this.data.grado,
            'pais' : this.data.pais,
            'password' : this.data.password
        }
        console.log(params)
        if(params.password == comprobacion){
            var service = "/login/registrar"
            loginService(service, "POST", JSON.stringify(params), (data) => {
		        if(data.response){
                    var serviceh = "/login/sendRegistroEmail/" + localStore.getItem("lang")
                    console.log(serviceh)
                    loginService(serviceh, "GET", {"nombre" : params.nombre,"email" : params.email,"pass" : params.password}, (data) => {
				        if(data.response){
                            alert("Su registro ha concluido con exito!")
                            setStore(params.email, params.password)
                        }else{
                            alert("Hubo un error al enviar el correo electrónico de notificación.")
                        }
			        })                                                           
                }else{
                    alert("El correo que intentó registrar ya ha sido ocupado.")
                }
	        })
        }else{
            createAlert("Error: ", "El password no coincide con la comprobación.")
        }
        
    },
    toggleLoginView : function(){
        $(".login-card").toggle()
    }
})

setTimeout(function(){
    $(".lang-icon").click()
    $(".lang-icon").mouseover()
}, 1000)

$('form input[type=text]').on('change invalid', function() {
    var textfield = $(this).get(0);
    if (!textfield.validity.valid) {
      textfield.setCustomValidity('Este campo es requerido.');  
    }
});

var restaurarPwd = (e) => {
    e.preventDefault()
    var email = $("#exampleInputEmail").val()
    service = "/login/recoverPassword/" + localStore.getItem("lang") + "?email=" + email
    $("#olvidoPasswordModal").modal("hide")
    $("#loadingModal").modal("show")
    loginService(service, "GET", {}, (data) => {
	if(data.response){
            $("#loading-content").html("<span>Se ha enviado una liga a su correo para reestablecer la contraseña.</span>")
            setTimeout(function(){
                $("#loading-content").html('<img src="images/Facebook-1s-200px.svg" style="width:75px;"/><br/><span>Validando Correo Electrónico</span>')
                $("#loadingModal").modal("hide")
            }, 3000)
        }else{
            $("#loading-content").html("<span>Hubo un error con el servicio de correo, intente mas tarde.</span>")
            setTimeout(function(){
                $("#loading-content").html('<img src="images/Facebook-1s-200px.svg" style="width:75px;"/><br/><span>Validando Correo Electrónico</span>')
                $("#loadingModal").modal("hide")
            }, 3000)
        }
    })
}

var validate = (e) => {
    e.preventDefault()
    var list = ["exampleInputEmail1", "regInputApellidoS", "regInputInstitucion", "regInputGrado", "regInputPais", "regInputEmail", "regInputPassword", "regInputConfirm"]
    switch(localStore.getItem("lang")){
        case "es":
            var msj0 = "Debe llenar todos los campos."
            var msj1 = "El correo electrónico ingresado no es correcto."
            var msj2 = "La confirmación no coincide con la contraseña ingresada."
            var msj3 = "La contraseña es muy corta. Debe contener al menos 5 caracteres."
            break;
        case "en":
            var msj0 = "You must fill all the fields."
            var msj1 = "The email entered is not correct."
            var msj2 = "The confirmation does not match the password entered."
            var msj3 = "The password is very short. It must contain at least 5 characters."
            break;
        case "fr":
            var msj0 = "Vous devez remplir tous les champs."
            var msj1 = "L'e-mail entré n'est pas correct."
            var msj2 = "La confirmation ne correspond pas au mot de passe entré."
            var msj3 = "Le mot de passe est très court. Il doit contenir au moins 5 caractères."
            break;
        case "al":
            var msj0 = "Sie müssen alle Felder ausfüllen."
            var msj1 = "Die eingegebene E-Mail ist nicht korrekt."
            var msj2 = "Die Bestätigung stimmt nicht mit dem eingegebenen Passwort überein."
            var msj3 = "Das Passwort ist sehr kurz. Es muss mindestens 5 Zeichen enthalten."
            break;
    }
    for(var i in list){
        if($("#" + list[i]).val() == ""){
            createAlert("Error: ", msj0)
            document.getElementById(list[i]).focus()
            return false
        }
    }
    if($("#regInputEmail").val().indexOf("@") < 0){
        createAlert("Error: ", msj1)
        document.getElementById("regInputEmail").focus()
        return false
    }
    if($("#regInputPassword").val() != $("#regInputConfirm").val()){
        createAlert("Error: ", msj2)
        document.getElementById("regInputPassword").focus()
        return false
    }else if($("#regInputPassword").val().length < 5){
        createAlert("Error: ", msj3)
        document.getElementById("regInputPassword").focus()
        return false
    }
    else{
        $$vistaRegistro.signup()
    }
}

localStore.setItem("lang", 'es')
if(localStore.getObjects("sesion")){
    linkTo("main.html")
}
