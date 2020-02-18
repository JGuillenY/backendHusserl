<?
/*
* This is a "helper" class of the snfm framework 
* So this package is made by various contributors  and Securenet Copyrights further down in the code.
* @author Original  The cake framework developers  Extended by SecureNet 
* @version 0.1
* @package snfm
* @subpackage snfm.libs
* @filesource
*/




/**
 * Object DynamicHtmlAssistant, parent class of the whole aspect of the Model in MVC in this framework.
 *
 * @package snfm
 * 
 */
class dynamicHtmlAssistant{

	/**
        * Permits the creations of a floating javascript based window on the site
	* Does not need params.
	* @example $SCRIPT[]=$this->dhtml->PremitDHtmlWindow()
	* @return string $var which is a javascript that should be called via a controller in the index()
        */
	function PermitDHtmlWindow(){
		$var="<script>
		//DHTML Window script- Copyright Dynamic Drive (http://www.dynamicdrive.com)
		//For full source code, documentation, and terms of usage,
		//Visit http://www.dynamicdrive.com/dynamicindex9/dhtmlwindow.htm
			
		var dragapproved=false
		var minrestore=0
		var initialwidth,initialheight
		var ie5=document.all&&document.getElementById
		var ns6=document.getElementById&&!document.all
		function iecompattest(){
			return (!window.opera && document.compatMode && document.compatMode!=\"BackCompat\")? document.documentElement : document.body
		}
		function drag_drop(e){
			if (ie5&&dragapproved&&event.button==1){
				document.getElementById(\"dwindow\").style.left=tempx+event.clientX-offsetx+\"px\"
					document.getElementById(\"dwindow\").style.top=tempy+event.clientY-offsety+\"px\"
			}
			else if (ns6&&dragapproved){
				document.getElementById(\"dwindow\").style.left=tempx+e.clientX-offsetx+\"px\"
					document.getElementById(\"dwindow\").style.top=tempy+e.clientY-offsety+\"px\"
			}
		}
		
		function initializedrag(e){
			offsetx=ie5? event.clientX : e.clientX
				offsety=ie5? event.clientY : e.clientY
				document.getElementById(\"dwindowcontent\").style.display=\"none\" //extra
				tempx=parseInt(document.getElementById(\"dwindow\").style.left)
				tempy=parseInt(document.getElementById(\"dwindow\").style.top)
				dragapproved=true
				document.getElementById(\"dwindow\").onmousemove=drag_drop
		}
		
		function loadwindow(url,width,height){
			if (!ie5&&!ns6)
				window.open(url,\"\",\"width=width,height=height,scrollbars=1\")
			else{
				document.getElementById(\"dwindow\").style.display=''
				document.getElementById(\"dwindow\").style.width=initialwidth=width+\"px\"
				document.getElementById(\"dwindow\").style.height=initialheight=height+\"px\"
				document.getElementById(\"dwindow\").style.left=\"30px\"
				document.getElementById(\"dwindow\").style.top=ns6? window.pageYOffset*1+30+\"px\" : iecompattest().scrollTop*1+30+\"px\"
				document.getElementById(\"cframe\").src=url
			}
		}
		
		function maximize(){
			if (minrestore==0){
				minrestore=1 //maximize window
				document.getElementById(\"maxname\").setAttribute(\"src\",\"restore.gif\")
				document.getElementById(\"dwindow\").style.width=ns6? window.innerWidth-20+\"px\" : iecompattest().clientWidth+\"px\"
				document.getElementById(\"dwindow\").style.height=ns6? window.innerHeight-20+\"px\" : iecompattest().clientHeight+\"px\"
			}
			else{
				minrestore=0 //restore window
				document.getElementById(\"maxname\").setAttribute(\"src\",\"max.gif\")
				document.getElementById(\"dwindow\").style.width=initialwidth
				document.getElementById(\"dwindow\").style.height=initialheight
			}
			document.getElementById(\"dwindow\").style.left=ns6? window.pageXOffset+\"px\" : iecompattest().scrollLeft+\"px\"
			document.getElementById(\"dwindow\").style.top=ns6? window.pageYOffset+\"px\" : iecompattest().scrollTop+\"px\"
		}
		
		function closeit(){
			document.getElementById(\"dwindow\").style.display=\"none\"
		}
		
		function stopdrag(){
			dragapproved=false;
			document.getElementById(\"dwindow\").onmousemove=null;
			document.getElementById(\"dwindowcontent\").style.display=\"\" //extra
		}
		</script>";
		return $var;
	}
	
	/**
        * Habiliates the creations of a floating javascript based window dhtml
	* Does not need params.
	* @return string $var which is a javascript that should be called when the proper windows is needed.
        */
	function habilitateDHtmlWindow(){
		$var='
		<div id="dwindow" style="position:absolute;background-color:white;cursor:hand;left:0px;top:0px;display:none" 
			onMousedown="initializedrag(event)" onMouseup="stopdrag()" onSelectStart="return false">
		<div align="right" style="background-color:navy"><img src="libs/img/close.png" onClick="closeit()"></div>
		<div id="dwindowcontent" style="height:95%">
		<iframe id="cframe" src="" width=100% height=95%></iframe>
		</div>
		</div>
		<script>';
		return $var;
	}
	
	/**
        * Generates a link for  the creations of a floating javascript based window dhtml
	* Does not need params.
	* @param string $url (url of the page)
	* @param string $text text contained in the floating window.
	* @param int $height height of the new floating window
	* @param int $width width of the new floating window
	* @return string $var which is a link that should be cliked when the window is needed.
        */
	function linkDHtmlWindow($url,$text,$height=600,$width=400){
		$var="<a href=\"javascript:loadwindow('$url',$height,$width)\">$text</a>";
		return $var;
	}
	
	/*This functions generates a window that asks for a confirmation before pressing a button
	 *@example:  <input type=submit value=delete "onclick"=>"return confirmSubmit()">
	 *@return string $var text containing the javascript.
	*/
	function permitConfirmSubmit($string="Estas seguro(a)?"){
		$var="<script LANGUAGE=\"JavaScript\">\n
			function confirmSubmit(){\n
				var agree=confirm(\"$string\");\n
				if (agree)\n
					return true ;\n
				else\n
					return false ;\n
			}\n
		</script>\n";
		return $var;
	}

	/*This functions generates a javascript that permits the use of contractible headers
	* @example SCRIPT[]=$this->dhtml->PremitDHtmlWindow() 
	*@return string $var text containing the javascript should be called within the controller class in the index function
	*/
	function permitContractibleHeaders(){
		$var="<script type=\"text/javascript\">
		/***********************************************
		* Contractible Headers script- © Dynamic Drive (www.dynamicdrive.com)
		* This notice must stay intact for legal use. Last updated Mar 23rd, 2004.
		* Visit http://www.dynamicdrive.com/ for full source code
		***********************************************/
		var enablepersist=\"on\" //Enable saving state of content structure using session cookies? (on/off)
		var collapseprevious=\"no\" //Collapse previously open content when opening present? (yes/no)

		if (document.getElementById){
			document.write('<style type=\"text/css\">')
				document.write('.switchcontent{display:none;}')
				document.write('</style>')
		}

		function getElementbyClass(classname){
			ccollect=new Array()
			var inc=0
			var alltags=document.all? document.all : document.getElementsByTagName(\"*\")
			for (i=0; i<alltags.length; i++){
				if (alltags[i].className==classname)
				ccollect[inc++]=alltags[i]
			}
		}

		function contractcontent(omit){
			var inc=0
			while (ccollect[inc]){
				if (ccollect[inc].id!=omit)
				ccollect[inc].style.display=\"none\"
				inc++
			}
		}

		function expandcontent(cid){
			if (typeof ccollect!=\"undefined\"){
				if (collapseprevious==\"yes\")
					contractcontent(cid)
				document.getElementById(cid).style.display=(document.getElementById(cid).style.display!=\"block\")? \"block\" : \"none\"
			}
		}

		function revivecontent(){
			contractcontent(\"omitnothing\")
			selectedItem=getselectedItem()
			selectedComponents=selectedItem.split(\"|\")
			for (i=0; i<selectedComponents.length-1; i++)
				document.getElementById(selectedComponents[i]).style.display=\"block\"
		}

		function get_cookie(Name){
			var search = Name + \"=\"
			var returnvalue = \"\";
			if (document.cookie.length > 0) {
				offset = document.cookie.indexOf(search)
				if (offset != -1) { 
					offset += search.length
					end = document.cookie.indexOf(\";\", offset);
					if (end == -1) end = document.cookie.length;
					returnvalue=unescape(document.cookie.substring(offset, end))
				}	
			}
			return returnvalue;
		}

		function getselectedItem(){
			if (get_cookie(window.location.pathname) != \"\"){
				selectedItem=get_cookie(window.location.pathname)
				return selectedItem
			}
			else
				return \"\"
		}

		function saveswitchstate(){
			var inc=0, selectedItem=\"\"
			while (ccollect[inc]){
				if (ccollect[inc].style.display==\"block\")
				selectedItem+=ccollect[inc].id+\"|\"
				inc++
			}
			document.cookie=window.location.pathname+\"=\"+selectedItem
		}

		function do_onload(){
			uniqueidn=window.location.pathname+\"firsttimeload\"
			getElementbyClass(\"switchcontent\")
			if (enablepersist==\"on\" && typeof ccollect!=\"undefined\"){
				document.cookie=(get_cookie(uniqueidn)==\"\")? uniqueidn+\"=1\" : uniqueidn+\"=0\" 
				firsttimeload=(get_cookie(uniqueidn)==1)? 1 : 0 //check if this is 1st page load
				if (!firsttimeload)
				revivecontent()
			}
		}


		if (window.addEventListener)
		window.addEventListener(\"load\", do_onload, false)
		else if (window.attachEvent)
		window.attachEvent(\"onload\", do_onload)
		else if (document.getElementById)
		window.onload=do_onload

		if (enablepersist==\"on\" && document.getElementById)
		window.onunload=saveswitchstate

		</script>";
		return $var;
	}
	
	
	/*This functions shows a contractible header
	*@param string $text title of the contractible header.
	*@param string $name name of the contractible header as an identification
	*@example SCRIPT[]=$this->dhtml->showCHeaders("hola mundo","nombre) 
	*@return string $var text containing the javascript should be called within the controller class in the index function
	*/
	function showCHeaders($text,$name="default"){
		$var="<p onClick=\"expandcontent('$name')\"style=\"cursor:hand;cursor:pointer\">\n";
		$var.="$text</p>\n";
		return $var;
	}
	
	/*This functions shows an open  contractible header
	*@param string $text content of the contractible header.
	*@param string $name name of the contractible header as an identification
	*@example SCRIPT[]=$this->dhtml->showCHeaders("tipo de texto","nombre) 
	*@return string $var text containing the javascript should be called within the controller class in the index function
	*/
	function showOpenCHeaders($text,$name="default"){
		$var= "<div id=\"$name\" class=\"switchcontent\">\n$text</div>";
		return $var;
	}

	/*This functions shows a fckeditor iframe
	*@param string $name of the form
	*@param string $content of the iframe
	*@example SCRIPT[]=$this->dhtml->textEditor("NombreForm","blah blah blah") 
	*@return string $var text containing the code of the iframe
	*/
	function textEditor($name,$content,$toolbar="Default",$skin="default",$width="100%",$height="100%"){
		$oFCKeditor = new FCKeditor($name) ;
		$oFCKeditor->BasePath = URL."libs/editor/";
		$oFCKeditor->Value = $content;
		$oFCKeditor->Config['SkinPath']=URL."libs/editor/editor/skins/$skin/";
		$oFCKeditor->ToolbarSet=$toolbar;
		$oFCKeditor->Width  = $width ;
		$oFCKeditor->Height =  $height ;
		return $oFCKeditor->CreateHtml();
	}
}
