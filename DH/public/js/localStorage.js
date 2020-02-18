//Contiene las funciones para guardar datos encriptados en el local Storage y obtenerlos de vuelta.
class storage {
    getObject(name){
        if(localStorage.getItem(name)) 
            return atob(localStorage.getItem(name))
        else return false
    }

    setObject(name, object){
       localStorage.setItem(name, btoa(object))
    }

    getObjects(name){
        if(localStorage.getItem(name))
            return JSON.parse(atob(localStorage.getItem(name)))
        else return false
    }

    setObjects(name, objects){
        localStorage.setItem(name, btoa(JSON.stringify(objects)))
    }

    getItem(name){
        if(sessionStorage.getItem(name)) 
            return atob(sessionStorage.getItem(name))
        else return false
    }

    setItem(name, object){
       sessionStorage.setItem(name, btoa(object))
    }
}

// export default storage
