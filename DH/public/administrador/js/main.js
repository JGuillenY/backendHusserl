var changeView = (view) => {
    $("#main-content").hide()
    $("#sub-loading").show()
    $("#main-content").html("")
  //  $$headerView.setState("sense", 1)
    $("#main-content").load("./" + view + ".html")
}

/*var $$headerView = $("#menu-view").view({
    state : {
    	sense : 0
    },
})*/

var getTo = (id) => {
	    console.log(id)
    document.getElementById(id).scrollIntoView()
}	

$("document").ready(function(){
    // if(localStorage.getObjects("session").ultimaVisitada)
    changeView('expresiones')
    $("#sub-loading").hide()
})
