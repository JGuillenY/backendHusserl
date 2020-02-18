<?
/*
* This is a "helper" class of the snfm framework 
* So this package is made by various contributors and Securenet
 * needs the following table on the database:
-- --------------------------------------------------------

-- 
-- Table structure for table `acl`
-- 

CREATE TABLE `ACL` (
  `acl_username` varchar(30) NOT NULL default '',
  `acl_password` varchar (50) NOT NULL default '',
  `acl_accesslevel` int(1) NOT NULL default '0',
  PRIMARY KEY  (`username`)
) TYPE=MyISAM;

-- 
-- Dumping data for table `acl`
-- 

* @author secureNet 
* @version 0.1
* @package snfm
* @subpackage snfm.libs
* @filesource
*/


/**
 * Object aclAssistant, class that helps manage an ACL
 *
 * @package snfm
 * 
 */
class aclAssistant extends htmlAssistant{
	
	/**
	* The "themesdir" directory of the package
	* @access private
	* @var string
	*/
	var $themesdir;

        /**
        * Database connection, if available.
        * @access private
        * @var adodb
        */
        var $db=NULL;



	/**
	  *Constructor for this class
	  *sets must variables
	  *@returns void
	 */
	function aclAssistant($controller=""){
		$this->htmlAssistant($controller);
		$this->themesdir = URL.'libs/themes/';
		$this->db=new snfmModel();
	}

	/*Verifies with database if user has access permisions and sets the correct SESSION VALUES
	 *@param string $user username
	 *@param string $passwd password
	 *@access public
	 *@return bool
	 */
	function aclLoginAccess($user,$passwd){
		$query="SELECT ACL_PASSWORD,ACL_ACCESSLEVEL FROM ACL WHERE ACL_USERNAME='$user'";
		if(!($recordSet=$this->db->doQuery($query))){
			$text="Error Num ALA01-01<br>";
			$this->flashText($text);
			exit;
		}
		$line=$recordSet->FetchRow();
		if($line['ACL_PASSWORD']==md5($passwd)){
			$_SESSION['username']=$user;
			$_SESSIOM['password']=$password;
			$_SESSION['ALLOWED']=true;
			$_SESSION['LEVEL']=$line['ACL_ACCESSLEVEL'];
			return true;
		}
		else return false;
	}

	/*Verifies with database if a password corresponds with a login and sets the correct SESSION VALUES
	 *@param string $password
	 *@access public
	 *@return bool
	 */
	function aclValidatePass($passwd){
		$user=$_SESSION['username'];
		$query="SELECT ACL_PASSWORD FROM ACL WHERE ACL_USERNAME='$user'";
		if(!($recordSet=$this->db->doQuery($query))){
			$text="Error Num AVP01-01<br>";
			$this->flashText($text);
			exit;
		}
		$line=$recordSet->FetchRow();
		//echo $line['ACL_PASSWORD']." -$passwd- ".md5($passwd);
		if($line['ACL_PASSWORD']==md5($passwd))	return true;
		else return false;
	}

	
	/*Verifies with database if user has access permisions
	 *@access public
	 *@return bool
	 */
	function aclHasPermission($level=1){
		if(($_SESSION['ALLOWED'])&&($_SESSION['LEVEL']>=$level))return true;
		else return false;
	}

	/*Clears all session information from $_SESSION rendering the session useless
	*@access public
	*@returns void
	*/
	function aclLogOut(){
		$_SESSION['username']=NULL;
		$_SESSIOM['password']=NULL;
		$_SESSION['ALLOWED']=NULL;
		$_SESSION['LEVEL']=NULL;
		return true;
	}

	
	/*Displays in the screen a login page
	 *@access public
	 *@return void
	 */
	function displayLoginPage($title=NULL,$target=NULL,$errMesg=NULL){
		$array=array("style"=>"font-size:14px");
		echo "<table align=middle border=\"0\" cellpadding=\"1\" cellspacing=\"1\" width=\"30%\">\n";
		echo "<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n";
		echo "<div class=\"cutebox\">\n";
		if(isset($errMesg))echo "<div class=\"warningtext\">$errMesg</div>";
		echo "<br><div align=left><div class=\"normaltitle\">&nbsp;&nbsp;$title</div></div><br>\n";
		echo $this->formTag("aclLogin",$target);
		echo "<table><tr><td><div class=\"normaltitle\" align=\"right\">login: </div></td><td>\n";
		echo $this->inputTag("username",15,$array)."</td></tr>\n";
		echo "<tr><td><div class=\"normaltitle\"align=\"right\">password: </div></td><td>";
		echo $this->passwordTag("password",15,$array)."</td></tr></table>\n";
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		echo "<br><div align=\"right\">".$this->submitTag("Login!",$array)."&nbsp;&nbsp;</div>";
		echo $this->closeFormTag();
		echo "</div></td></tr></table>\n";		
	}
	
	/*Displays Headers for the screen a login page
	 *@access public
	 *@return void
	 */
	function displayHeaders($siteLogo="",$baseCss="default",$pageTitle="",$scripts="",$target=""){
		?>
		<html>
		<?
		if($target) echo "<base target=main>";
		?>
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></meta>
		<?
		if($scripts){
			foreach ($scripts as $value){
				echo $value;
			}
		}
		?>	
		<link rel="stylesheet" href="<?echo $this->themesdir.$baseCss;?>.css" type="text/css"></link>
		<link rel="shortcut icon" href="<?echo $this->configs['superglobals']['baseurl']."img/".$siteLogo;?>"></link>
		<title><?echo ("$pageTitle");?></title>
	
		</head><body>
		<?
	}
	
	/*Displays Footers for the screen a login page
	 *@access public
	 *@return void
	 */
	function displayFooters(){
		echo "</body></html>";
	}
	
	/*Displays An html form to change a password
	 *@param string $formname name of the form.
	 *@param string $title title of the form
	 *@return string $var html code of the form
	 */
	function changePassForm($formname="changePass",$title=NULL){
		$array=array("style"=>"font-size:14px");
		$var="<table  cellpadding=\"1\" cellspacing=\"1\" width=\"100%\">\n
			<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n";
		if(isset($titlte))echo "<br><div align=left><div class=\"normaltitle\">&nbsp;&nbsp;$title</div></div><br>\n";
		$var.= $this->formTag($formname)."
			<table  width=\"100%\"><tr><td width=\"50%\">
			<div class=\"normaltitle\" align=\"left\">Password Actual: </div></td><td>\n"
			.$this->passwordTag("$formname/origpass",25,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Password Nuevo: </div></td><td>\n"
			.$this->passwordTag("$formname/pass1",25,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Password Nuevo: </div></td><td>\n"
			.$this->passwordTag("$formname/pass2",25,$array)."</td></tr></table>\n";		
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		$var.="<br><div align=\"right\">".$this->submitTag("Cambiar!",$array)."&nbsp;&nbsp;</div>
			</td></tr></table>\n".$this->closeFormTag();
		return $var;
	}

	/*Displays An html form to change the password of other users from an administrator
	 *@param string $formEdit name of the form.
	 *@param string $user the name of the user to be changed 
	 *@return string $var html code
	 */
	function changePassOtherUserForm($formEdit="changePassOther",$user){
		$array=array("style"=>"font-size:14px");
		$var= "<table  border=\"0\" cellpadding=\"1\" cellspacing=\"1\" width=\"100%\">\n";
		$var.= "<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n";
		$var.= "<br><div align=left><div class=\"normaltitle\">&nbsp;&nbsp;Nuevo password para: $user</div></div><br>\n";
		$var.= $this->formTag($formEdit);
		$var.= "<table width=\"100%\"><tr><td width=\"50%\">";
		$var.="<div class=\"normaltitle\" align=\"left\">Password: </div></td><td>\n";
		$var.= $this->passwordTag("$formEdit/pass1",30,$array)."</td></tr>\n";
		$var.= "<tr><td width=\"50%\"><div class=\"normaltitle\"align=\"left\">Repetir Password: </div></td><td>\n";
		$var.= $this->passwordTag("$formEdit/pass2",30,$array)."</td></tr></table>\n";
		$var.=$this->hiddenTag("$formEdit/username_fixed",$user);
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		$var.= "<br><div align=\"right\">".$this->submitTag("Cambiar!",$array)."&nbsp;&nbsp;</div>";
		$var.= $this->closeFormTag();
		$var.= "</td></tr></table>\n";
		return $var;
	}
	
	/*Displays An html form to add a user to the acl table
	 *@param string $formname name of the form.
	 *@param string $title Title of the Form 
	 *@return string $var html code
	 */
	function addUserForm($formname,$title=NULL){
		$array=array("style"=>"font-size:14px");
		$var="<table style=\"border: 1px solid #000088;\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" width=\"30%\">\n
		<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n";
		if(isset($titlte))$var.= "<br><div align=left><div class=\"normaltitle\">&nbsp;&nbsp;$title</div></div><br>\n";
		$var.= $this->formTag($formname)."
			<table><tr><td><div class=\"normaltitle\" align=\"left\">Login: </div></td><td>\n"
			.$this->inputTag("login",15,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Nombre: </div></td><td>\n"
			.$this->inputTag("name",15,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Apellido: </div></td><td>\n"
			.$this->inputTag("surname",15,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Email: </div></td><td>\n"
			.$this->inputTag("email",15,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Nivel de Acceso: </div></td><td>\n";
		$options=array("1"=>"nivel 1","2"=>"nivel 2","3"=>"nivel 3","4"=>"nivel 4");
		$var.= $this->selectTag("accesslevel",$options,1)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Password: </div></td><td>\n"
			.$this->passwordTag("newpass1",15,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">Password Nuevo: </div></td><td>\n"
			.$this->passwordTag("newpass2",15,$array)."</td></tr></table>\n";
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		$var.="<br><div align=\"right\">".$this->submitTag("Agegar!",$array)."&nbsp;&nbsp;</div>\n"
			.$this->closeFormTag()."</td></tr></table>\n";
		return $var;
	}

	/*Displays An html form for an admin tables that can create users, modify them, etc.
	 *@param string $formEdit name of the form when editing
	 *@param string $formAdd name of the form when adding
	 *@param string $formPass name of the form when changing passwords
	 *@return string $var html code
	 */
	function aclUserTable($formEdit="editUser",$formAdd="addUser",$formPass="showChangePass"){
		$var='<script LANGUAGE="JavaScript">
			function confirmSubmit(){
				var agree=confirm("Estas seguro que quieres borrar el dato?");
				if (agree)
					return true ;
				else
					return false ;
			}
		</script>';
		$var.="<table class=\"acltable\">\n";
		$var.="<tr class=\"aclth\"><th>Login</th><th>Nombre</th>\n
			<th>Apellido</th><th>Email</th>\n
			<th>Nivel</th><th>-</th><th>-</th></tr>\n";
		$query="select 	ACL_USERNAME,ACL_ACCESSLEVEL,ACL_NAME,ACL_SURNAME,ACL_EMAIL FROM ACL";
		//echo $query;
		$set=$this->db->doQuery($query);
		for($i=0;$line = $set->FetchRow();$i++){
			$var.= $this->formTag($formEdit)."\n";
			$var.="<tr class=\"acltr\"><td>$line[ACL_USERNAME]</td>";
			$array=array("style"=>"font-size:9px","value"=>"$line[ACL_NAME]","maxsize"=>"30");
			$var.="<td>".$this->inputTag("$formEdit/name",18,$array)."</td>";
			$array=array("style"=>"font-size:9px","value"=>"$line[ACL_SURNAME]","maxsize"=>"30");
			$var.="<td>".$this->inputTag("$formEdit/surname",18,$array)."</td>";
			$array=array("style"=>"font-size:9px","maxsize"=>"60","value"=>"$line[ACL_EMAIL]");
			$var.="<td>".$this->inputTag("$formEdit/email",27,$array)."</td>";
			$sumbit=array("1"=>"1","2"=>"2","3"=>"3","4"=>"4");
			$array=array("style"=>"font-size:9px");
			$var.="<td>".$this->selectTag("$formEdit/accesslevel",$sumbit,$line['ACL_ACCESSLEVEL'],$array,$array)."</td>\n";
			$var.=$this->hiddenTag("$formEdit/username_fixed",$line['ACL_USERNAME']);
			$array=array("style"=>"font-size:9px","name"=>"edit");
			$var.="<td>\n".$this->submitTag("Editar",$array)."</td>\n";
			$array=array("style"=>"font-size:9px","name"=>"del","onclick"=>"return confirmSubmit()");
			$var.="<td>\n".$this->submitTag("Borrar",$array)."</td>\n";
			$var.= $this->closeFormTag();
			$var.= $this->formTag($formPass)."\n";
			$array=array("style"=>"font-size:9px","name"=>"edit");
			$var.=$this->hiddenTag("$formEdit/username_fixed",$line['ACL_USERNAME']);
			$var.="<td>\n".$this->submitTag("Clave",$array)."</td></tr>\n";
			$var.= $this->closeFormTag();
		}
		$var.= $this->formTag($formAdd)."\n";
		$array=array("style"=>"font-size:9px","maxsize"=>"30");
		$var.="<tr class=\"acltr\"><td>".$this->inputTag("$formAdd/username",18,$array)."</td>";
		$var.="<td>".$this->inputTag("$formAdd/name",18,$array)."</td>";
		$var.="<td>".$this->inputTag("$formAdd/surname",18,$array)."</td>";
		$array=array("style"=>"font-size:9px","maxsize"=>"60");
		$var.="<td>".$this->inputTag("$formAdd/email",27,$array)."</td>";
		$sumbit=array("1"=>"1","2"=>"2","3"=>"3","4"=>"4");
		$array=array("style"=>"font-size:9px");
		$var.="<td>".$this->selectTag("$formAdd/accesslevel",$sumbit,1,$array,$array)."</td><td></td>\n";
		$array=array("style"=>"font-size:9px");
		$var.="<td>\n".$this->submitTag("Agregar",$array)."</td>\n</tr>";
		$var.= $this->closeFormTag();
		$var.="</table>\n";
		return $var;
	}

	/*Displays An html form to change the password of self user
	*@param string $formEdit name of the form.
	*@return string $var html code
	*/
	function aclUserPass($formEdit="changePass"){
		$var="<table class=\"acltable\">\n";
		$var.="<tr class=\"aclth\"><th>Login</th><th>Password</th>\n
			<th>Password</th><th>-</th></tr>\n";
		$query="SELECT ACL_USERNAME FROM ACL";
		//echo $query;
		$set=$this->db->doQuery($query);
		for($i=0;$line = $set->FetchRow();$i++){
			$var.= $this->formTag($formEdit)."\n";
			$var.="<tr class=\"acltr\"><td>$line[ACL_USERNAME]</td>";
			$array=array("style"=>"font-size:9px","value"=>"$line[name]","maxsize"=>"30");
			$var.="<td>".$this->passwordTag("$formEdit/pass1",30,$array)."</td>";
			$var.="<td>".$this->passwordTag("$formEdit/pass2",30,$array)."</td>";
			$var.=$this->hiddenTag("$formEdit/username_fixed",$line['username']);
			$array=array("style"=>"font-size:9px","name"=>"edit");
			$var.="<td>\n".$this->submitTag("Cabmiar",$array)."</td>\n</tr>";
			$var.= $this->closeFormTag();
		}
		return $var;
	}

	/*Displays An html form to close a session
	 *@param string $formname name of the form.
	 *@return string $var html code
	 */
	function logoutUserForm($formname="logout"){
		$var= $this->formTag($formname);
		$var.="<a id=\"a$formname\" href=\"javascript:document.$formname.submit()\">Salir</a>";
		$var.= $this->closeFormTag();
		return $var;
	}

	/*changes a user password form acl table
	 *@param string $user username 
	 *@param string $pass password
	 *@return bool
	 */
	function aclUpdatePassword($user,$pass){
		$pass=md5($pass);
		$query="UPDATE ACL SET 
			acl_password='$pass' 
			where acl_username='$user'"; 
		if((!$this->db->doQuery($query))){
			return false;
		}
		else return true;
	}

	/*Edits user parameters from acl table
	 *@param string $accesslevel
	 *@param string $name
	 *@param string $surname
	 *@param string $mail
	 *@return string $var html code
	 */
	function aclEditUser($accesslevel,$name,$surname,$mail,$username){
		$query="UPDATE ACL SET 
		acl_accesslevel='$accesslevel',
		acl_name='$name',
		acl_surname='$surname',
		acl_email='$mail'
			where acl_username='$username'"; 
		if((!$this->db->doQuery($query))){
			return false;
		}
		else return true;
	}

	/*Deletes a user from acl table
	 *@param string $name user name to be deleted
	 *@return bool
	 */
	function aclDelUser($user){
		$query="DELETE  from ACL where
			acl_username='$user'";
		if((!$this->db->doQuery($query))){
			return false;
		}
		else return true;
	}

	function aclAddUser(){
		//notyetdone
	}
	
}

