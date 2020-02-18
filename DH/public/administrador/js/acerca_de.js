var guardar = function(){
    console.log($('textarea#mainEditar').val())
    service = "/acerca_de/update"
    adminService(service, "POST", JSON.stringify({"content" : $('textarea#mainEditar').val()}), (data) => {
        console.log(data)
        alert("Guardado!")
    })
}

var guardarD = function(){
    console.log($('textarea#mainDEditar').val())
    service = "/acerca_de/updateD"
    adminService(service, "POST", JSON.stringify({"content" : $('textarea#mainDEditar').val()}), (data) => {
        console.log(data)
        alert("Guardado!")
    })
}

var guardarE = function(){
    console.log($('textarea#mainEEditar').val())
    service = "/acerca_de/updateE"
    adminService(service, "POST", JSON.stringify({"content" : $('textarea#mainEEditar').val()}), (data) => {
        console.log(data)
        alert("Guardado!")
    })
}

var guardarF = function(){
    console.log($('textarea#mainFEditar').val())
    service = "/acerca_de/updateF"
    adminService(service, "POST", JSON.stringify({"content" : $('textarea#mainFEditar').val()}), (data) => {
        console.log(data)
        alert("Guardado!")
    })
}

var guardarC = function(){
    console.log($('textarea#mainCEditar').val())
    service = "/acerca_de/updateC"
    adminService(service, "POST", JSON.stringify({"content" : $('textarea#mainCEditar').val()}), (data) => {
        console.log(data)
        alert("Guardado!")
    })
}

var init = function(){
    console.log("hola")
    service = "/acerca_de/get"
    adminService(service, "GET", {}, (data) => {
        var contenido = data.response[0].contenido
        //console.log(contenido)
        // $('textarea#acercaEditar').ckeditor();
        $('textarea#mainEditar').val(contenido);
        $('textarea#mainDEditar').val(data.response[0].contenido_de);
        $('textarea#mainEEditar').val(data.response[0].contenido_en);
        $('textarea#mainFEditar').val(data.response[0].contenido_fr);
        $('textarea#mainCEditar').val(data.response[0].contenido_ca);
        //$('.text').text(JSON.stringify(data));
    })
}

init()

$("document").ready(function(){
    $('textarea#mainEditar').ckeditor();
    $('textarea#mainDEditar').ckeditor();
    $('textarea#mainEEditar').ckeditor();
    $('textarea#mainFEditar').ckeditor();
    $('textarea#mainCEditar').ckeditor();
    $("#main-content").show()
})
