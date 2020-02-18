const localStore = new storage()

if(!localStore.getObjects("admin_sesion")){
    // document.location.href = "login.html"
    linkTo("login.html")
}