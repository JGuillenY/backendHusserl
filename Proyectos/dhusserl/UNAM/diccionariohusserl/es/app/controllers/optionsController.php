<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class options extends helperController{
					
	function index(){
		$this->isAllowed();
		if($_POST['edit'])$_GET['ESCAPE']=1;
		require_once  APPLIBSROOT."lang.php";
		$this->controller="options";
		$this->lang="es";
		$this->text=$LANG[$this->lang];
		$this->errMesg=NULL;
	}
	
	function showUserMenu($target="datamain"){
		echo "<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" class=\"datatbl\" width=\"100%\" valing=\"top\">";
		echo "<tr><td align=\"left\">";
		$url=$this->html->here."&ESCAPE=1&exec=pass";
		echo "<ul><div class=\"cutetext\">";
		echo "<br><li><a href=\"$url\" target=\"$target\">".$this->text['changepass']."</a></li>";
		echo "</ul></td></tr></table>";
	}
	
	function changePassForm($formname="change",$title=NULL){
		$array=array("style"=>"font-size:14px");
		$var="<div align='center'>";
		$var.="<table  cellpadding=\"1\" cellspacing=\"1\" width=\"100%\">\n
			<tr valign=\"middle\"><td valign=\"middle\"  align=\"middle\" >\n";
		if(isset($title))echo "<br><div align=left><div class=\"normaltitle\">&nbsp;&nbsp;$title</div></div><br>\n";
		$var.= $this->html->formTag($formname)."
			<table  width=\"100%\"><tr><td width=\"50%\">
			<div class=\"normaltitle\" align=\"left\">".$this->text['currentpass']." </div></td><td>\n"
			.$this->html->passwordTag("$formname/origpass",25,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">".$this->text['pass1']." </div></td><td>\n"
			.$this->html->passwordTag("$formname/pass1",25,$array)."</td></tr>\n
			<tr><td><div class=\"normaltitle\"align=\"left\">".$this->text['pass2']." </div></td><td>\n"
			.$this->html->passwordTag("$formname/pass2",25,$array)."</td></tr></table>\n";		
		$array=array("style"=>"font-size:14px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
		$var.="<br><div align=\"right\">".$this->html->submitTag($this->text['accept'],$array)."&nbsp;&nbsp;</div>
			</td></tr></table>\n".$this->html->closeFormTag();
		$var.="</div>";
		return $var;	
	}
	
	function changeForm(){	
		
		$formEdit="change";
		$POST=$this->data[$formEdit];
		$query="select  pass_usuario from usuarios where mail_usuario='$_SESSION[MAIL]'";
		//echo $query;
		//echo strlen($POST['pass1'])."<br>";
		//echo $this->html->print_html_r($POST);
		$set=$this->db->doQuery($query);
		$line=$set->FetchRow();
		if($line['pass_usuario'] != $POST['origpass']){
			$url=$this->html->here."&ESCAPE=1&exec=pass";
			$text="<div class='warn'>".$this->text['passincorrect1']." <a href='$url'>Continuar...</a></div>";
			return 	$this->html->flashText($text);
		}
		elseif(strlen($POST['pass1']) < 5){
			$url=$this->html->here."&ESCAPE=1&exec=pass";
			$text="<div class='warn'>".$this->text['passincorrect2']." <a href='$url'>Continuar...</a></div>";
			return 	$this->html->flashText($text);
		}
		elseif ($POST['pass1'] != $POST['pass2']){
			$url=$this->html->here."&ESCAPE=1&exec=pass";
			$text="<div warn='green'>".$this->text['passincorrect3']." <a href='$url'>Continuar...</a></div>";
			return 	$this->html->flashText($text);
		}
		else{
			$query="update usuarios set pass_usuario='$POST[pass1]' where mail_usuario='$_SESSION[MAIL]'";
			//echo $query;
			$set=$this->db->doQuery($query);
			$url=$this->html->here."&ESCAPE=1&exec=users";
			$text="<div class='green'>".$this->text['passcorrect']." <a href='$url'>Continuar...</a></div>";
			$this->html->flashText($text);
		}
	}
				
}
?>
