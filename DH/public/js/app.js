// Funcion que redirecciona a otra pagina de la aplicacion
var linkTo = (url) => {
    $("body").append("<a id='goto' href='"+ url +"' hidden></a>")
    document.getElementById("goto").click()
}

var saveInSesion = (newData, name) => {
    var sesion = localStore.getObjects("sesion")
    sesion[name] = newData
    localStorage.removeItem("sesion")
    localStore.setObject("sesion", sesion)
}

var createAlert = (title, message) => {
    $(".alertT").html('<div class="alert alert-warning alert-dismissible fade show" role="alert">\
    <strong>'+ title +'</strong>' + message + '\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
      <span aria-hidden="true">&times;</span>\
    </button>\
  </div>')
    $("div.alertT div").alert("show")
}

var signOut = () => {
    localStorage.removeItem("sesion")
    location.reload()   
}

var signOutAdmin = () => {
  localStorage.removeItem("admin_sesion")
  location.reload()   
}

var webService = (service, method, params, next) => {
  var serverUsername = localStore.getObjects("sesion").user
  var serverPassword = localStore.getObjects("sesion").password
  var auth = "Basic " + btoa(serverUsername + ":" + serverPassword)
  $.ajax({
      url : serverUrl + service,
      type: method,
      dataType : 'json',
      contentType : 'application/json',
      data: params,
      jsonp : false,
      cache: 'true',
      headers : {
      	  "Authorization" : auth
      },
      success : function(response){
          return next(response)
      },
      error : function(error){
          console.log(error)
	  alert("Ha habido un error " + error.status + " : " + error.statusText)
      }
  })
}

var adminService = (service, method, params, next) => {
  var serverUsername = localStore.getObjects("admin_sesion").email
  var serverPassword = localStore.getObjects("admin_sesion").user_password
  var auth = "Basic " + btoa(serverUsername + ":" + serverPassword)
  $.ajax({
      url : serverUrl + service,
      type: method,
      dataType : 'json',
      contentType : 'application/json',
      data: params,
      jsonp : false,
      cache: 'true',
      headers : {
	        "Authorization" : auth
      },
      success : function(response){
          return next(response)
      },
      error : function(error){
          console.log(error)
        //   alert(error)
          return error
      }
  })
}

var loginService = (service, method, params, next) => {
  var serverUsername = " guest"
  var serverPassword = "abcde"
  var auth = "Basic " + btoa(serverUsername + ":" + serverPassword)
  $.ajax({
      url : serverUrl + service,
      type: method,
      dataType : 'json',
      contentType : 'application/json',
      data: params,
      jsonp : false,
      cache: 'true',
      headers : {
          "Authorization" : auth
      },
      success : function(response){
          return next(response)
      },
      error : function(error){
          alert(error.statusText)
      }
  })
}
