<?

if($this->access){
	if ($_GET['exec']=="admin"){
		//echo "<div class=\"normaltitle\">Administraci&oacute;n de usuarios:</div><br>";
		//echo "<div class=\"titlebox\"><table border=\"0\"><tr><td>";
		if($this->acl->aclHasPermission()) echo $this->acl->aclUserTable("editUser","addUser");
		//echo "</td></tr></table></div>";
	}
	elseif ($_GET['exec']=="users"){
		echo "<div class=\"normaltitle\">Vista de usuarios:</div><br>";
		echo "<div class=\"titlebox\" align=\"center\"><table border=\"0\"><tr><td>";
		if($this->acl->aclHasPermission()) echo $this->genteTable();
		echo "</td></tr></table></div>";
	
	}
	elseif ($_GET['exec']=="pass"){
		echo "<div class=\"normaltitle\">Control de passwords:</div><br>";
		echo "<div class=\"titlebox\"><table border=\"0\"><tr><td>";
		if($this->acl->aclHasPermission()) echo $this->acl->aclUserPass("changePass");
		echo "</td></tr></table></div>";
	
	}
	elseif ($this->exec=="userpass"){
		echo "<div class=\"normaltitle\">Control de passwords:</div><br>";
		echo "<div class=\"titlebox\"><table border=\"0\"><tr><td>";
		if($this->acl->aclHasPermission(1)){
			echo $this->acl->changePassOtherUserForm("changePassOther",$this->data['editUser']['username_fixed']);
		}
		echo "</td></tr></table></div>";
	}
	elseif ($_GET['exec']=="addItem"){
		echo "<div align=center>";
		echo "<div class=\"normaltitle\">Agregar T&eacute;rminos:</div><br>";
		echo "<div class=\"titlebox\"><table border=\"0\"><tr><td align=\"center\">";
		if($this->acl->aclHasPermission()) echo $this->addItem();
		echo "</td></tr></table></div></div>";
	}
	elseif($_GET['exec']){}
	else{
		echo "<table border=\"0\" width=99%><tr><td width=100%>";
		$code="<br><div class=\"maintitle\">Acceso autorizado!!!</div><br>\n";
		$this->drawTitle($code);
		echo "</td></tr></table>";
		echo "<table border=\"0\" width=\"99%\"><tr><td width=\"20%\" valign=\"top\">";
		$this->showAdminMenu();
		echo "</td><td border=\"1\" align=\"left\" valign=\"left\" class=\"datatbl\">";
		$url=$this->html->here."&ESCAPE=1&exec=default";
		echo "<iframe name=\"datamain\" src=\"$url\" width=\"745\" height=\"498\" 
			marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"auto\"></iframe>";
		echo "</td></tr></table>";
	}
}
else $this->acl->displayLoginPage("Acceso al sistema :","",$this->errMesg);
?>
