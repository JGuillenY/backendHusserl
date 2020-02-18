const localStore = new storage()

if(!localStore.getObjects("sesion")){
    linkTo("login.html")
}