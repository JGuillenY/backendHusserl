var whole = {}

$(document).ready(function(){
    webService("/manual/get", "GET", {}, (data) => {
        //$("#home").html(data.response[0].contenido)
        //$("#profile").html(data.response[0].contenido_de)
        whole = data
        changeTheLang(localStore.getItem("lang"))
	if(localStore.getItem("lang") != "es"){
            chLang(localStore.getItem("lang"))
        }
    })
    $("#indicem").hide()
    $("#sub-loading").hide()
    $("#main-content").show()
})

var changeTheLang = (lang) => {
    switch(lang){
            case "al":
                $("#myTabContent").html(whole.response[0].contenido_de)
                break;
            case "es":
                $("#myTabContent").html(whole.response[0].contenido)
                break;
            case "en":
                $("#myTabContent").html(whole.response[0].contenido_en)
                break;
            case "fr":
                $("#myTabContent").html(whole.response[0].contenido_fr)
                break;
            case "ca":
                $("#myTabContent").html(whole.response[0].contenido_ca)
                break;
     }

}

$("#btn-es").on("click", function(e){
    changeTheLang("es")
})

$("#btn-de").on("click", function(e){
    changeTheLang("al")
})

$("#btn-en").on("click", function(e){
    changeTheLang("en")
})

$("#btn-fr").on("click", function(e){
    changeTheLang("fr")
})

$("#btn-ca").on("click", function(e){
    changeTheLang("ca")
})

