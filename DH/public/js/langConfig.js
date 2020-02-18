// Primero definimos los lenguajes.
// Create language switcher instance
var lang = new Lang()
lang.dynamic('al', 'lang/al.json')

lang.dynamic('en', 'lang/en.json')

lang.dynamic('fr', 'lang/fr.json')

lang.dynamic('ca', 'lang/ca.json')
    
lang.init({
    defaultLang: 'es',
    currentLang: 'es',

})

var chLang = (lang) => {
  console.log("changing to " + lang)
  switch(lang){
    case "es":
      toSpanish(false)
      break;
    case "en":
      toEnglish(false)
      break;
    case "al":
      toDeutsch(false)
      break;
    case "fr":
      toFrench(false)
      break;
    case "ca":
      toCatalan(false)
      break;
  }
}

var toSpanish = (flag) => {
  if(flag) $(".lang-icon").click()
  window.lang.change('es')
  localStore.setItem("lang", 'es')
  // $("a.lang-icon").toggle()
  $("#busqueda").attr("placeholder", "Búsqueda por letra")
  try{document.getElementById("jj").innerHTML = "Jerarquía"}catch(error){console.log(error)}
  try{document.getElementById("derivade").innerHTML = "Deriva de:"}catch(error){console.log(error)}
  try{document.getElementById("jerarexpresion").innerHTML = "Expresión:"}catch(error){console.log(error)}
  try{document.getElementById("jderivadas").innerHTML = "Expresiones derivadas:"}catch(error){console.log(error)}
  $("#toes").attr("data-original-title", "Cambiar a Español")
  $("#tode").attr("data-original-title", "Cambiar a Alemán")
  $("#toes2").attr("data-original-title", "Cambiar a Español")
  $("#tode2").attr("data-original-title", "Cambiar a Alemán")
  try{document.getElementById("maintitle").innerHTML = "Diccionario Husserl"}catch(error){console.log(error)}
  try{document.getElementById("hay").innerHTML = "Hay"}catch(error){console.log(error)}
  try{document.getElementById("pasajeen").innerHTML = "pasaje en total."}catch(error){console.log(error)}
  try{document.getElementById("pasajesen").innerHTML = "pasajes en total."}catch(error){console.log(error)}
  $("a.jerarq").attr("data-original-title", "Mostrar Jerarquía")
  $("#descargarR").attr("data-original-title", "Descargar Consulta")
  $(".referencias2.none").html("No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas.")
  try{document.getElementById("dict").innerHTML = "Diccionario"}catch(error){console.log(error)}
  try{document.getElementById("acer").innerHTML = "Acerca del Diccionario"}catch(error){console.log(error)}
  try{document.getElementById("gui").innerHTML = "Guía"}catch(error){console.log(error)}
  try{document.getElementById("sali").innerHTML = "Salir"}catch(error){console.log(error)}
}

var toFrench = (flag) => {
  if(flag) $(".lang-icon").click()
  window.lang.change('fr')
  localStore.setItem("lang", 'fr')
  // $("a.lang-icon").toggle()
  $("#busqueda").attr("placeholder", "Recherche par lettre")
  try{document.getElementById("jj").innerHTML = "Hiérarchie"}catch(error){console.log(error)}
  try{document.getElementById("derivade").innerHTML = "Dérivé de:"}catch(error){console.log(error)}
  try{document.getElementById("jerarexpresion").innerHTML = "Expression:"}catch(error){console.log(error)}
  try{document.getElementById("jderivadas").innerHTML = "Expresions Dérivées:"}catch(error){console.log(error)}
  $("#toes").attr("data-original-title", "Passer à l'espagnol")
  $("#tode").attr("data-original-title", "Passer en allemand")
  $("#toes2").attr("data-original-title", "Passer à l'espagnol")
  $("#tode2").attr("data-original-title", "Passer en allemand")
  try{document.getElementById("maintitle").innerHTML = "Dictionnaire Husserl"}catch(error){console.log(error)}
  try{document.getElementById("hay").innerHTML = "Il y a"}catch(error){console.log(error)}
  try{document.getElementById("pasajeen").innerHTML = "passage au total."}catch(error){console.log(error)}
  try{document.getElementById("pasajesen").innerHTML = "passages au total."}catch(error){console.log(error)}
  $("a.jerarq").attr("data-original-title", "Montrer la hiérarchie")
  $("#descargarR").attr("data-original-title", "Requête de téléchargement")
  $(".referencias2.none").html("Il n’y a aucune référence pour cette expression. Voir la liste d’expressions dérivées.")
  try{document.getElementById("dict").innerHTML = "Dictionnaire"}catch(error){console.log(error)}
  try{document.getElementById("acer").innerHTML = "A propos du dictionnaire"}catch(error){console.log(error)}
  try{document.getElementById("gui").innerHTML = "Guide"}catch(error){console.log(error)}
  try{document.getElementById("sali").innerHTML = "Sortie"}catch(error){console.log(error)}
}

var toDeutsch = (flag) => {
  if(flag) $(".lang-icon").click()
  window.lang.change('al')
  localStore.setItem("lang", 'al')
  // $("a.lang-icon").toggle()
  $("#busqueda").attr("placeholder", "Suche nach Buchstabe")
  try{document.getElementById("jj").innerHTML = "Rangordnung"}catch(error){console.log(error)}
  try{document.getElementById("derivade").innerHTML = "Abgeleitet von:"}catch(error){console.log(error)}
  try{document.getElementById("jerarexpresion").innerHTML = "Ausdruck:"}catch(error){console.log(error)}
  try{document.getElementById("jderivadas").innerHTML = "Ableitungsausdrücke:"}catch(error){console.log(error)}
  $("#toes").attr("data-original-title", "Zum Spanish wechseln")
  $("#tode").attr("data-original-title", "Zum Deutsch wechseln")
  $("#toes2").attr("data-original-title", "Zum Spanish wechseln")
  $("#tode2").attr("data-original-title", "Zum Deutsch wechseln")
  $("a.jerarq").attr("data-original-title", "Hierarchie anzeigen")
  try{document.getElementById("maintitle").innerHTML = "Husserl Wörterbuch"}catch(error){console.log(error)}
  try{document.getElementById("hay").innerHTML = "Es gibt"}catch(error){console.log(error)}
  try{document.getElementById("pasajeen").innerHTML = "Textauszüge."}catch(error){console.log(error)}
  try{document.getElementById("pasajesen").innerHTML = "Textauszüge."}catch(error){console.log(error)}
  $("#descargarR").attr("data-original-title", "Suche Herunterladen")
  $(".referencias2.none").html("Es gibt keine Hinweise für diesen Ausdruck. Siehe bitte die Liste der Ableitungsausdrücke.")
  try{document.getElementById("dict").innerHTML = "Wörterbuch"}catch(error){console.log(error)}
  try{document.getElementById("acer").innerHTML = "Über das Wörterbuch"}catch(error){console.log(error)}
  try{document.getElementById("gui").innerHTML = "Handbuch"}catch(error){console.log(error)}
  try{document.getElementById("sali").innerHTML = "Logout"}catch(error){console.log(error)}

}

var toEnglish = (flag) => {
  console.log(flag)
  if(flag) $(".lang-icon").click()
  window.lang.change('en')
  localStore.setItem("lang", 'en')
  // $("a.lang-icon").toggle()
  $("#busqueda").attr("placeholder", "Search by letter")
  try{document.getElementById("jj").innerHTML = "Hierarchy"}catch(error){console.log(error)}
  try{document.getElementById("derivade").innerHTML = "Derived from:"}catch(error){console.log(error)}
  try{document.getElementById("jerarexpresion").innerHTML = "Expression:"}catch(error){console.log(error)}
  try{document.getElementById("jderivadas").innerHTML = "Derived Expressions:"}catch(error){console.log(error)}
  $("#toes").attr("data-original-title", "Change to Spanish")
  $("#tode").attr("data-original-title", "Change to German")
  $("#toes2").attr("data-original-title", "Change to Spanish")
  $("#tode2").attr("data-original-title", "Change to German")
  $("a.jerarq").attr("data-original-title", "Show Hierarchy")
  try{document.getElementById("maintitle").innerHTML = "Husserl Dictionary"}catch(error){console.log(error)}
  try{document.getElementById("hay").innerHTML = "There is a total of "}catch(error){console.log(error)}
  try{document.getElementById("pasajeen").innerHTML = "passage."}catch(error){console.log(error)}
  try{document.getElementById("pasajesen").innerHTML = "passages."}catch(error){console.log(error)}
  $("#descargarR").attr("data-original-title", "Lookup Download")
  $(".referencias2.none").html("There are no references for this expression. Please look the list of derived expressions.")
  try{document.getElementById("dict").innerHTML = "Dictionary"}catch(error){console.log(error)}
  try{document.getElementById("acer").innerHTML = "About the Dictionary"}catch(error){console.log(error)}
  try{document.getElementById("gui").innerHTML = "Guide"}catch(error){console.log(error)}
  try{document.getElementById("sali").innerHTML = "Exit"}catch(error){console.log(error)}
}

var toCatalan = (flag) => {
  if(flag) $(".lang-icon").click()
  window.lang.change('ca')
  localStore.setItem("lang", 'ca')
  // $("a.lang-icon").toggle()
  $("#busqueda").attr("placeholder", "Cerca per lletra")
  try{document.getElementById("jj").innerHTML = "Jerarquia"}catch(error){console.log(error)}
  try{document.getElementById("derivade").innerHTML = "Deriva de:"}catch(error){console.log(error)}
  try{document.getElementById("jerarexpresion").innerHTML = "Expressió:"}catch(error){console.log(error)}
  try{document.getElementById("jderivadas").innerHTML = "Expressions derivades:"}catch(error){console.log(error)}
  $("#toes").attr("data-original-title", "Canviar a Espanyol")
  $("#tode").attr("data-original-title", "Canviar a Alemany")
  $("#toes2").attr("data-original-title", "Canviar a Espanyol")
  $("#tode2").attr("data-original-title", "Canviar a Alemany")
  try{document.getElementById("maintitle").innerHTML = "Diccionari Husserl"}catch(error){console.log(error)}
  try{document.getElementById("hay").innerHTML = "Hi ha"}catch(error){console.log(error)}
  try{document.getElementById("pasajeen").innerHTML = "passatge en total."}catch(error){console.log(error)}
  try{document.getElementById("pasajesen").innerHTML = "passatges en total."}catch(error){console.log(error)}
  $("a.jerarq").attr("data-original-title", "Mostra Jerarquia")
  $("#descargarR").attr("data-original-title", "Descarregar Consulta")
  $(".referencias2.none").html("No hi ha cap referència per a aquesta expressió. Veure per favor la llista d'expressions derivades.")
  try{document.getElementById("dict").innerHTML = "Diccionari"}catch(error){console.log(error)}
  try{document.getElementById("acer").innerHTML = "Sobre el Diccionari"}catch(error){console.log(error)}
  try{document.getElementById("gui").innerHTML = "Guia"}catch(error){console.log(error)}
  try{document.getElementById("sali").innerHTML = "Sortir"}catch(error){console.log(error)}
}
