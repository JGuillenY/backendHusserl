const localStore = new storage()

//Vistas
var $$vistaIngreso = $("#ingreso").view({
    state : {

    },
    login : function(e) {
        e.preventDefault()
        var as = {"email" : this.data.user, "user_password" : this.data.password}
        localStore.setObjects("admin_sesion", as)
        var service = "/login/admin?userId=" + this.data.user + "&password=" + this.data.password
        adminService(service, "GET", {}, (data) => {
            console.log(data)
            if(data.error == null){
                console.log("Passed")
                localStorage.removeItem("admin_sesion")
                localStore.setObjects("admin_sesion", data.response)                  
                linkTo("main.html")
            }else{
                localStorage.removeItem("admin_sesion")
            }
        })
    },
    toggleLoginView : function(){
        $(".login-card").toggle()
    }
})
