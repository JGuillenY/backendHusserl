var todosTerminos=[],refOrder=["IP","PW","I1","I2","PV","CM"],topasajewid=e=>{webService("/referencias/obtieneReferenciasByRef/"+e,"GET",{},e=>{toPasaje(e.response[0].id,window.btoa(e.response[0].expresion_original),e.response[0].ref_original,e.response[0].refid)})},topasajewtid=(e,a)=>{webService("/referencias/obtieneReferenciasByTerm/"+e,"GET",{},e=>{localStore.setItem("letter",a),"es"==localStore.getItem("sublang")?toPasaje(e.response[0].id,window.btoa(e.response[0].expresion_traduccion),e.response[0].ref_original,e.response[0].refid):toPasaje(e.response[0].id,window.btoa(e.response[0].expresion_original),e.response[0].ref_original,e.response[0].refid)})},toggleSmallSide=()=>{$("a#down-arr").hasClass("full")?($("a#down-arr").removeClass("full"),$("a#down-arr i").removeClass("fa-chevron-circle-up"),$("a#down-arr i").addClass("fa-chevron-circle-down"),$("div#alfabeto-view").removeClass("full")):($("a#down-arr").addClass("full"),$("a#down-arr i").removeClass("fa-chevron-circle-down"),$("a#down-arr i").addClass("fa-chevron-circle-up"),$("div#alfabeto-view").addClass("full"))},getHier=(e,a)=>{$("div.selected").removeClass("selected"),$("#heading"+e).addClass("selected");var s="/expresiones/"+localStore.getItem("sublang")+"/hijosList/"+e;webService(s,"GET",{},s=>{var o="/expresiones/"+localStore.getItem("sublang")+"/abuelosList/"+e;webService(o,"GET",{},e=>{$$hierView.setState("openH",{abuelos:e.response,hijos:s.response,expresion:a}),0==$("#jerarquia-part").hasClass("show")&&document.getElementById("jerarqplus").click(),$('[data-toggle="tooltip"]').tooltip("hide")})})},$$menuView=$("#indicem").view({state:{opciones:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],opcionSeleccionada:"A"},selectLetter:function(e){localStore.setItem("letter",e),this.setState("opcionSeleccionada",e),$$alfabetoView.setState("opcionSeleccionada",e),$("#busqueda").val(""),getPalabras(e)}}),getPalabras=e=>{"#"==e&&(e="todos");var a="/expresiones/"+localStore.getItem("sublang")+"/"+e;$("div#expresiones").html('    <div id="loading">        <img src="images/Facebook-1s-200px.gif">    </div>    '),webService(a,"GET",{},e=>{if(e.error)createAlert("Error: ",e.error);else{$("div#expresiones").html(""),todosTerminos=e.response;var a=0,s="";for(var o in e.response)e.response[o].id!=a&&(o>0&&(s+="                                    </ul>                                </div>                            </div>                        </div>"),a=e.response[o].id,s+='                    <div class="card">                        <div class="card-header" id="heading'+e.response[o].id+'">                        <h6 class="mb-0 row" style="font-size:1.1em;">                            <a href="#" style="color:black; padding-right: 0;" class="col-10" onclick="toPasaje(\''+e.response[o].id+"', '"+window.btoa(e.response[o].expresion)+"','"+e.response[o].referencia_original+"', '"+e.response[o].refid+"')\">"+e.response[o].pretty_e+" // "+e.response[o].pretty_t+'</a>                            <a class="arrowdown col-1" href="#" onclick="toggleArrow(this)" data-toggle="collapse" data-target="#collapse'+e.response[o].id+'" aria-expanded="true" aria-controls="collapse'+e.response[o].id+'"><i class="fas fa-angle-down"></i></a>                            <a class="col-1 jerarq" href="#" onclick="getHier(\''+e.response[o].id+"','"+e.response[o].expresion+'\')" data-toggle="tooltip" data-placement="top" title="Mostrar Jerarquía"><i class="fas fa-sitemap"></i></a>                        </h6>                        </div>                        <div id="collapse'+e.response[o].id+'" class="collapse" aria-labelledby="heading'+e.response[o].id+'">                            <div class="card-body">                                <ul id="referenciasList-'+e.response[o].id+'">'),null!=e.response[o].refid?1==e.response[o].orden?s+='                        <a href="#" class="referencias1" onclick="toPasaje(\''+e.response[o].id+"', '"+window.btoa(e.response[o].expresion)+"','"+e.response[o].referencia_original+"', '"+e.response[o].refid+"')\">"+e.response[o].referencia_original+" // "+e.response[o].referencia_traduccion+" {"+e.response[o].refid+"}</a>                        <br/>":s+='                        <a href="#" class="referencias2" onclick="toPasaje(\''+e.response[o].id+"', '"+window.btoa(e.response[o].expresion)+"','"+e.response[o].referencia_original+"', '"+e.response[o].refid+"')\">"+e.response[o].referencia_original+" // "+e.response[o].referencia_traduccion+" {"+e.response[o].refid+"}</a>                        <br/>":s+='<a class="referencias2">No hay ninguna referencia para esta expresión.</a>';document.getElementById("expresiones").innerHTML=s,$(".jerarq").tooltip(),"es"==localStore.getItem("sublang")?$("#toes").hide():$("#tode").hide(),$("a#down-arr").hasClass("full")&&$("div#alfabeto-view").addClass("full"),"es"!=localStore.getItem("lang")&&chLang(localStore.getItem("lang"))}})},toggleArrow=e=>{$(e).children("i").hasClass("fa-angle-down")?($(e).children("i").removeClass("fa-angle-down"),$(e).children("i").addClass("fa-angle-up")):($(e).children("i").removeClass("fa-angle-up"),$(e).children("i").addClass("fa-angle-down"))},$$alfabetoView=$("div#alfabeto-view").view({state:{opcionSeleccionada:"",expresiones:[],currentLang:"es"}}),$$hierView=$("div#hierarchy-view").view({state:{openH:{abuelos:[],hijos:[],expresion:""}},goToPasage:function(e){var a=e.expresion.slice(0,1);localStore.setItem("letter",a),toPasaje(e.id,window.btoa(e.expresion),e.referencia,e.refid)}}),toPasaje=(e,a,s,o)=>{var r=localStore.getObjects("sesion").ultimasVisitadas;r.push({id:e,expresion:window.atob(a),referencia:s,refid:o});var i={id:e,expresion:window.atob(a),referencia:s,refid:o};localStore.setObjects("pasajeActual",i);var t=localStore.getObjects("sesion");t.ultimasVisitadas=r,localStore.setObjects("sesion",t),$$ultimosView.setState("ultimasVisitadas",r.reverse()),changeView("pasajes")},getInitial=e=>{if("."==e[0])var a=e.slice(4,5);else if("'"==e[0])a=e.slice(1,2);else a=e.slice(0,1);switch(a){case"á":case"ä":case"Á":case"Ä":a="A";break;case"é":case"Ë":case"É":case"Ë":a="E";break;case"í":case"ï":case"Í":case"Ï":a="I";break;case"ó":case"ö":case"Ó":case"Ö":a="O";break;case"ú":case"ü":case"Ú":case"Ü":a="U";break;default:a=a.toUpperCase()}return a},$$ultimosView=$("div#ultimos-view").view({state:{ultimasVisitadas:localStore.getObjects("sesion").ultimasVisitadas.reverse()},goToPasage:function(e){var a=getInitial(e.expresion);localStore.setItem("letter",a),toPasaje(e.id,window.btoa(e.expresion),e.referencia,e.refid)}}),langg="de",changeLang=e=>{$("#toes").toggle(),$("#tode").toggle(),$(".lang").tooltip("hide"),localStore.setItem("sublang",e),getPalabras(localStore.getItem("letter"))};localStore.getItem("sublang")?$$alfabetoView.setState("lang",localStore.getItem("sublang")):localStore.setItem("sublang","al"),localStore.getItem("letter")?$$menuView.selectLetter(localStore.getItem("letter")):$$menuView.selectLetter("A");var tutorial2=()=>{setTimeout(function(){new Audio("sounds/click.mp3").play(),$("#dropdownMenuButton").click(),$("#dropdownMenuButton").click(),setTimeout(function(){localStore.setObject("notN","true")},3e3)},100)},togglepart=function(e){$("#"+e).hasClass("fa-plus")?($("#"+e).removeClass("fa-plus"),$("#"+e).addClass("fa-minus")):($("#"+e).removeClass("fa-minus"),$("#"+e).addClass("fa-plus"))},aplicaBusqueda=()=>{var e=$("#busqueda").val();for(var a in $(".hidden").removeClass("hidden"),todosTerminos){(todosTerminos[a].expresion+" "+todosTerminos[a].traduccion).includes(e)||$("#heading"+todosTerminos[a].id).addClass("hidden")}$(".jerarq").tooltip()};$("document").ready(function(){$(".lang").tooltip(),localStore.getObject("notN")||$("#Bienvenida").modal("show"),"es"==localStore.getItem("sublang")?$("#toes").hide():$("#tode").hide(),$("#indicem").show(),$("#sub-loading").hide(),$("#main-content").show()});