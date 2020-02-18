<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class siteregistry extends helperController{
					
	function index(){
		$this->validateGets();	
		require_once  APPLIBSROOT."lang.php";
		$this->lang="es";
		$this->text=$LANG[$this->lang];
		$this->logproc=TRUE;
		/* include ROOT."app/models/registryModel.php";
                $this->db = new registryModel();
                $this->db->define();*/
                
        }
        
        function showForm(){
        	$formName="registrar";
        	$POST=$this->data[$formName];
        	$array=array("class"=>"crud");
        	$var=$this->html->formTag($formName)."\n";
        	$var.="<fieldset class='crud'><legend class='crud'>Registro</legend>";
        	$var.="<br>".$this->data['mesg']."";
        	$var.="<table class='registro' border='0'>";
        	$var.="<tr><td>*".$this->text['name'].":</td><td>".$this->html->inputTag("$formName/nama","25",$array,$POST['nama'])."</td></tr>\n";
        	$var.="<tr><td>*".$this->text['surname'].":</td><td>".$this->html->inputTag("$formName/surnama","25",$array,$POST['surnama'])."</td></tr>\n";
        	$var.="<tr><td>".$this->text['inst'].":</td><td>".$this->html->inputTag("$formName/inst","25",$array,$POST['inst'])."</td></tr>\n";
        	$var.="<tr><td>*".$this->text['country'].":</td><td>".$this->html->countryTag("$formName/country",$POST['country'],$array,$array)."</td></tr>\n";
        	$var.="<tr><td>*".$this->text['mail'].":</td><td>".$this->html->inputTag("$formName/mail","25",$array,$POST['mail'])."</td></tr>\n";
       		$var.="<tr><td>*".$this->text['pass1'].":</td><td>".$this->html->passwordTag("$formName/pass1","25",$array)."</td></tr>\n";
        	$var.="<tr><td>*".$this->text['pass2'].":</td><td>".$this->html->passwordTag("$formName/pass2","25",$array)."</td></tr>\n";
        	$var.="<tr><td class='center' colspan='2'><span style='font-size:90%;'>*".$this->text['mandatory']."</span></td></tr>";
        	$var.="<tr><td align='right' colspan='2'>".$this->html->submitTag($this->text['accept'])."</td></tr>\n";
        	$var.="</table>";
        	$var.="</fieldset></form>";
        	return $var;        	
        }
        
        function registrarForm(){
        	$formName="registrar";
        	$POST=$this->data[$formName];
        	//time to validate
        	if(!$this->html->validateMail($POST['mail'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnmail']."</div>";
        		return NULL;
        	}
        	if(empty($POST['nama'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnnama']."</div>";
        		return NULL;
        	}
        	if(empty($POST['surnama'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnsurnama']."</div>";
        		return NULL;
        	}
        	if(empty($POST['country'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warncountry']."</div>";
        		return NULL;
        	}
        	if(empty($POST['pass1'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnpass']."</div>";
        		return NULL;
        	}
        	if(strlen($POST['pass1']) < 5){
             	$this->data['mesg']="<div class='warn'>".$this->text['passincorrect2']."</div>";
        		return NULL;
		}
        	if(($POST['pass1']!=$POST['pass2'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnpassequal']."</div>";
        		return NULL;
        	}
        	if(!$this->registerUser($POST)){
        		return NULL;
        	}
        	else {
  
        		$url=URL."?action=siteaccessenglish";
				$text="<div class='green2'>".$this->text['registersuccess']."".$POST['mail']." <a href='$url'>Continuar...</a></div>";
				return 	$this->html->flashText($text);
        		//return NULL;
     
        	}

        }
        
        
        function registerUser($POST){
        	 $query="INSERT INTO `usuarios` 
        	 		( `id_usuario` ,
        	 		 `nombre_usuario` ,
        	 		  `apellido_usuario`,
        	 		  `pais_usuario`,
        	 		  `mail_usuario`,
        	 		  `institucion_usuario`,
        	 		  `pass_usuario`,
        	 		  `lastaccess_usuarios`,
        	 		  `registro_usuarios` )
        	 		  
        	 		  VALUES (NULL,
        	 		  '$POST[nama]',
        	 		  '$POST[surnama]',
        	 		  '$POST[country]',
        	 		  '$POST[mail]',
        	 		  '$POST[inst]',
        	 		  '$POST[pass1]', 
        	 		  NOW(), 
        	 		  NOW())";
        	 	if($this->db->doQuery($query))return true;
				else {
					$this->data['mesg']="<div class='warn'>".$this->text['errordbreg']."</div>";
					return false;
				}
				
		}
        	    		 




}

			
?>
