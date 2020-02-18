<?
/**
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
class Guia  extends helperController {
	
	function index(){
		$this->isAllowed();
		$this->validateGets();	
		require_once  APPLIBSROOT."lang.php";
		$this->lang="es";
		$this->text=$LANG[$this->lang];
	
	}

	function displayContent(){
		$query="select * from pantallas_texto where pantalla_name='guia' and pantalla_lang='es'";
		if(!($set=$this->localFetch($query))){
			echo "Error GC-DC-01";
			die;
		}
		$line=$set->FetchRow();
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&edit=1\n";
			echo "<div align=\"right\"><a class=\"tabbedlink\"href=$url>Editar</a></div>\n";
		}
		echo $line['pantalla_content'];
	}

	function editContent(){
		$query="select * from pantallas_texto where pantalla_name='guia' and pantalla_lang='es'";
		if(!($set=$this->localFetch($query))){
			echo "Error GC-EC-01";
			die;
		}
		$line=$set->FetchRow();
		echo "<div class=normaltitle>Edici&oacute;n de Gu&iacute;a de Usuarios:</div><br>";
		echo $this->html->formTag("saveContent");
		echo $this->dhtml->textEditor("textfield",$line['pantalla_content'],"Advanced");
		$array=array("style"=>"font-size:9px");
		echo $this->html->submitTag($this->text['save'],$array);
		echo $this->html->closeFormTag();
	}

	function saveContentForm(){
		$query="update pantallas_texto set  pantalla_content='".$_POST['textfield']."' where
			pantalla_name='guia' and pantalla_lang='es'";
		if(!($set=$this->localFetch($query))){
			echo "Error GC-SCF-01";
			die;
		}
	}
}
