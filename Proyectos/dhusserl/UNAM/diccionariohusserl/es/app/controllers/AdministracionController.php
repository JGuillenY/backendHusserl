<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class Administracion extends helperController{

	var $access;
	var $errMesg;
	var $text;
	var $addUser;
					
	function index(){
		$this->isAllowed();
		$this->validateGets();
		if($_POST['edit'])$_GET['ESCAPE']=1;
		require_once  APPLIBSROOT."lang.php";
		$this->scripts[]=$this->dhtml->permitContractibleHeaders();
		//$this->scripts[]=$this->dhtml->permitConfirmSubmit();
		$this->controller="Administracion";
		$this->lang="es";
		$this->text=$LANG[$this->lang];
		$this->errMesg=NULL;
		$this->access=$this->acl->aclHasPermission();
	}

	function aclLoginForm(){
		$this->access=$this->acl->aclLoginAccess($this->data['username'][0],$this->data['password'][0]);
		if(!($this->access))$this->errMesg="Login incorrecto!";
	}

	function logoutForm(){
		if($this->acl->aclLogOut()){
			$this->access=false;
			$this->errMesg="Salida del sistema exitosamente";
		}
	}
	
	function addItem(){
		$array=array("style"=>"font-size:14px");
		$var= $this->html->formTag("addItem")."
			<table  border=\"0\" cellpadding=\"1\" cellspacing=\"1\" width=\"30%\">\n
			<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n
		 	<table border=\"0\" cellpadding=\"1\" cellspacing=\"1\">
			<tr><td><div class=\"normaltitle\" align=\"left\">".$this->text['word'].":</div></td><td>\n"
			.$this->html->inputTag("addItem/wordde",35,$array)."</td></tr>
		 	<tr><td><div class=\"normaltitle\" align=\"left\">".$this->text['translation'].":</div></td><td>\n"
			.$this->html->inputTag("addItem/wordes",35,$array)." </td></tr>
			</table>\n";
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		$var.="<br><div align=\"right\">".$this->html->submitTag($this->text['add'],$array)."&nbsp;&nbsp;</div>"
			.$this->html->closeFormTag()."</td></tr></table>\n";
		return $var;
	}

	function showAdminMenu($target="datamain"){
		echo "<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" class=\"datatbl\" width=\"100%\" valing=\"top\">";
		echo "<tr><td align=\"left\">";
	
		echo "<ul><br><div class=\"cutetext\">";
		echo "<li>".$this->acl->logoutUserForm("logout")."</li></ul><hr></div>";
		$url=$this->html->here."&ESCAPE=1&exec=admin";
		echo "<ul><div class=\"cutetext\">";
		echo "<br><li><a href=\"$url\" target=\"$target\">Administradores</a></li>";
		$url=$this->html->here."&ESCAPE=1&exec=users";
		echo "<br><li><a href=\"$url\" target=\"$target\">Usuarios</a></li>";		
		$url=$this->html->here."&ESCAPE=1&exec=addItem";
		echo "<br><li><a href=\"$url\" target=\"$target\">Agregar T&eacute;rminos</a></li></div></ul></td></tr></table>";
	}

	function addUserForm(){
		if($this->access){
			$url=$this->html->here."&exec=admin&ESCAPE=1";
			if(!($this->html->validateErrors($this->data['addUser']))){
				$text="Error: datos incompletos  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			//somehow validate emails with .yyy.xx at the end
			$query="SELECT ACL_USERNAME from acl where
				ACL_USERNAME='".$this->data['addUser']['username']."'";
			$set=$this->db->doQuery($query);
			$line=$set->FetchRow();
			if($line['ACL_USERNAME']!=NULL){
				$text="Error: ya existe el usuario  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$query="INSERT INTO ACL (acl_username,acl_accesslevel,acl_name,acl_surname,acl_email) values
				('".$this->data['addUser']['username']."',
				 '".$this->data['addUser']['accesslevel']."',
				 '".$this->data['addUser']['name']."',
				 '".$this->data['addUser']['surname']."',
				 '".$this->data['addUser']['email']."')";
			if((!$this->db->doQuery($query))){
				$text="Error num #auf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$text="Modificaci&oacute;n exitosa... <a href=\"$url\"=>Continuar</a>";
			$this->html->flashText($text);					
		}
	}

	function editUserForm(){
		if($this->acl->aclHasPermission(1)){
			$url=$this->html->here."&exec=admin&ESCAPE=1";
			if($_POST['del']){
				if(!($this->acl->aclDelUser($this->data['editUser']['username_fixed']))){
					$text="Error num #euf01-01 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				else{
					$text="Modificaci&oacute;n exitosa... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
			}
			if($_POST['edit']){
				if(!($this->html->validateErrors($this->data['editUser']))){
					$text="Faltan Datos... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				else{
					if(!($this->acl->aclEditUser($this->data[editUser][accesslevel],$this->data[editUser][name],
							$this->data[editUser][surname],$this->data[editUser][email],
							$this->data[editUser][username_fixed]))){
						$text="Error num #euf01-02 <a href=\"$url\"=>Continuar</a>";
						$this->html->flashText($text);
					}
					else{
						$text="Modificaci&oacute;n exitosa... <a href=\"$url\"=>Continuar</a>";
						$this->html->flashText($text);
					}
				}
			}
		}
	}


	function changePassOtherForm(){
		if($this->acl->aclHasPermission(1)){
			$url=$this->html->here."&exec=admin&ESCAPE=1";
			if((!($this->data['changePassOther']['pass1']))or(!($this->data['changePassOther']['pass2']))){
				$text="Error: datos incompletos...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if($this->data['changePassOther']['pass1'] != $this->data['changePassOther']['pass2']){
				$text="Error: Las claves no coinciden...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if(!($this->acl->aclUpdatePassword($this->data['changePassOther']['username_fixed'],
							$this->data['changePassOther']['pass1']))){
				$text="Error num #cpof01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{
				$text="Modificaci&oacute;n exitosa... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);	
			}
		}
	}
	
	function showChangePassForm(){
		$this->exec="userpass";
	}


	function changePassForm(){
		if($this->acl->aclHasPermission(1)){
			$url=$this->html->here."&exec=changepass&ESCAPE=1";
			if(!($this->acl->aclValidatePass($this->data['changePass']['origpass']))){
				$text="Error: Password Original no valido...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if((!($this->data['changePass']['pass1']))or(!($this->data['changePass']['pass2']))){
				$text="Error: datos incompletos...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if($this->data['changePass']['pass1'] != $this->data['changePass']['pass2']){
				$text="Error: Las claves no coinciden...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if(!($this->acl->aclUpdatePassword($_SESSION['username'],$this->data['changePass']['pass1']))){
				$text="Error num #auf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{
				$text="Modificaci&oacute;n exitosa... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);	
			}
		}
	}

	function addItemForm(){
		if($this->access){
			$url=$this->html->here."&ESCAPE=1&exec=addItem";
			if((!($this->data['addItem']['wordde']))or(!($this->data['addItem']['wordes']))){
				$text="Error: datos incompletos...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$query="select t_term_de from termino where t_term_de='".$this->data['addItem']['wordde']."'";
			$set=$this->localFetch($query);	
			$line=$set->FetchRow();
			if($line['t_term_de']!=""){
				$text="Error: El t&eacute;rmino en alem&aacute;n ya existe...  <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$query="INSERT INTO termino (t_term_de,t_term_es) values
				('".$this->data['addItem']['wordde']."','".$this->data['addItem']['wordes']."')";
			//echo $query;
			if((!$this->db->doQuery($query))){
				$text="Error num #auf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
			$this->html->flashText($text);	
		}
	}
	
	
	
	function genteTable(){
		$size=25;
		$formEdit="editgente";
		$var='<script LANGUAGE="JavaScript">
			function confirmSubmit(){
				var agree=confirm("Estas seguro de que quieres borrar el usuario?");
				if (agree)
					return true ;
				else
					return false ;
			}
		</script>';

		$var.="<table border='0' cellpadding='1' cellspacing='1' width=\"470\" ><tr>";
		$var.="<td valign=\"top\" align=\"right\" >".$this->searchBar()."</td>";
		$var.="</tr></table>";		
		$var.="<table width=\"620\" class=\"crud\">\n";
		$var.="<tr class=\"crud\"><th>Mail</th><th>Nombre</th>\n
			<th>Apellido</th><th>Institucion</th>\n
			<th>Pa&iacute;s</th><th>&Uacute;ltimo acceso</th><th>-</th>\n";
		$set=$this->prepareQuery();
		$flag=0;
		while($line=$set->FetchRow()){
			if($flag==0){
				$flag=1;
				$class="even";
			}
			else{
				$flag=0;
				$class="odd";
			}
			$var.="<tr class=\"$class\">\n";
			$var.=$this->html->formTag($formEdit);
			for($i=0;$i<count($line)/2;$i++){
				$var.="<td class=\"$class\">$line[$i]</td>\n";
			}
			$var.=$this->html->hiddenTag("$formEdit/id",$line['mail_usuario']);
			$array=array("onclick"=>"return confirmSubmit()","class"=>"smallbutton"); 			
			$var.="<td align='center' class=\"$class\">".$this->html->submitTag2("Borrar",$array,"sub")."</td>\n";
			$var.="</form></tr>\n\n";
		}
		$var.= "</table><br>\n\n";
		$var.="<table border=\"0\" align=\"center\"><tr>\n";
		if($_SESSION['nxcrd']!=$size){
			$var.="<td><a class=\"crud\" href=\"?action=".$_GET['action']
			."&is=1&ESCAPE=1&exec=users&pvcrd=".$_SESSION['pvcrd']."\"><< Anterior</a></td>\n";
			$var.="<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>\n";
			$var.="<td><a class=\"crud\" href=\"?action=".$_GET['action']."&is=1&ESCAPE=1&exec=users\">Inicio</a></td>\n";
			$var.="<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
		}
		
		if($this->moreRecords($_SESSION['nxcrd'])) 
			$var.="<td><a class=\"$this->crudClass\" href=\"?action=".$_GET['action']."&is=1&ESCAPE=1&exec=users&nxcrd=".$_SESSION['nxcrd']."\">Siguiente >></a></td></tr></table></div>\n";
		else 	$var.="</table>";
		return $var;
		
	}
		
			
	function prepareQuery(){
		$size=25;
		$lowlimit=0;
		if($_GET['nxcrd']){
			$lowlimit=$_SESSION['nxcrd'];
			$_SESSION['pvcrd']=$_SESSION['nxcrd']-$size;
			$_SESSION['nxcrd']=$_SESSION['nxcrd']+$size;
		}
		elseif($_GET['pvcrd']){
			$lowlimit=$_SESSION['pvcrd'];
			$_SESSION['nxcrd']=$_SESSION['pvcrd']+$size;
			$_SESSION['pvcrd']=$_SESSION['pvcrd']-$size;
		}
		else{
			$_SESSION['nxcrd']=0;
			$_SESSION['pvcrd']=0;
			$lowlimit=0;
		}
		/*if($_GET['is']) $this->crudWhere=$_SESSION['WHERE'];
		elseif(!($_POST)){
			$_SESSION['WHERE']=NULL;
			$_SESSION['ITEM']=NULL;
		}
		for($i=0;$i<count($this->crudTh);$i++){
			$asterisk.=$this->crudTh[$i]['insert'].",";
		}*/
		$asterisk=substr($asterisk, 0, -1);//removing last ,
		//$order_clause="ORDER BY ".$this->crudOrderBy." ";
		//$query="select $asterisk  from  ".$this->crudTable." $this->crudWhere $order_clause ";
		if($_GET['do']=='search')$where=$this->whereParam();
		else $where="";
		$query="select mail_usuario,nombre_usuario,apellido_usuario,institucion_usuario,pais_usuario, lastaccess_usuarios from usuarios $where";
		//echo $query;
		$set=$this->db->doQuery($query);
		//$set=$this->doQuery($query);
		//$num=$this->doCounts($set);
		//$total=$num[1];
		//echo $query;
		$set=$this->db->DB->SelectLimit($query,$size,$lowlimit);
		//$num=$this->doCounts($set);
		if($_SESSION['nxcrd']==0)$_SESSION['nxcrd']=$size;
		//if(!($num[1]>0)) return $this->NoRecords();
		return $set;
	}
	
	function moreRecords($next){
		$size=25;
		if($_GET['do']=='search')$where=$this->whereParam();
		else $where="";
		$query="select mail_usuario,nombre_usuario,apellido_usuario,institucion_usuario,pais_usuario, lastaccess_usuarios from usuarios $where";
		$set=$this->db->DB->SelectLimit($query,$size,$next);
		$num=$this->db->doCounts($set);
		//$this->html->print_html_r($num);
		if(!($num[1]>0)) return false;
		else return true;
	}
	
	function searchBar(){
		$formName="search";
		$array=array("all"=>"todos","mail_usuario"=>"Mail","nombre_usuario"=>"nombre","pais_usuario"=>"Pa&iacute;s","institucion_usuario"=>"Instituci&oacute;n");
		$var.='<form method="GET" name="algo" action="?action='.$_GET['action'].'">';
		$var.='<input type="hidden" name="ESCAPE" value="1">';
		$var.='<input type="hidden" name="exec" value="users">';
		$var.='<input type="hidden" name="action" value='.$_GET['action'].'>';
		$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formName.'">';
		$var.='<input type="hidden" name="do" value="search">';
		$var.='<label class="crudsearch" for="search">B&uacute;squeda:&nbsp;</label>';
		$attribs=array("class"=>"crud2","value"=>$_SESSION['ITEM']);
		$var.=$this->html->inputTag("$formName/item",20,$attribs)."&nbsp;";
		$attribs=array("class"=>"crud2");
		$var.=$this->html->selectTag("$formName/field",$array,"all",$attribs,$attribs);
		$var.=$this->html->submitTag("Buscar");
		$var.='</form>';
		return $var;
	}

	/*function searchForm(){

	}*/

	function crudWhereParams($param){
		$array=array();
		if(preg_match_all("/^%(.*)%$/",$param,$array))return $array[1][0];
		if(preg_match_all("/^(.*)%$/",$param,$array))return "^".$array[1][0];
		if(preg_match_all("/^%(.*)$/",$param,$array)) return $array[1][0]."$";
		if (!preg_match_all("/^%(.*)%$/",$param,$array))return "^$param$";
	}


	function whereParam(){
		//echo $this->html->print_html_r($_GET['data']);
		$field=$_GET['data']['search']['field'];
		$item=$_GET['data']['search']['item'];
		if($field=='all'){
			$where=NULL;
			$array=array("mail_usuario","nombre_usuario","apellido_usuario","institucion_usuario","pais_usuario");
			foreach($array as $value){
				if(!($where))$where="WHERE ";
				else $where.=" OR ";
				$where.=$value." LIKE '%$item%' ";
				//$this->crudWhere.="REGEXP_LIKE($value[insert],'$search','i')";

			}
		}
		else $where="WHERE $field LIKE '%$item%' ";
		//else $this->crudWhere="WHERE REGEXP_LIKE($data[field],'$search','i')";
		/*$_SESSION['WHERE']=$where
		$_SESSION['ITEM']=$data['item'];*/
		return $where;
	}
	
	
	function editGenteForm(){
		$formEdit="editgente";
		$POST=$this->data[$formEdit];

		
		$query="delete from usuarios where mail_usuario='$POST[id]'";

		$set=$this->db->doQuery($query);
		$url=$this->html->here."&ESCAPE=1&exec=users";
		$text="<div class='green'>El Usuario $POST[id] ha sido borrado <a href='$url'>Continuar...</a></div>";
		$this->html->flashText($text);
	}

}
?>
