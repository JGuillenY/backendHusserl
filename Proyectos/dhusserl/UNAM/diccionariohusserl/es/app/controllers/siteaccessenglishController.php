<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class siteaccessenglish extends helperController{
					
	function index(){
		//$this->validateGets();	
		require_once  APPLIBSROOT."lang.php";
		$this->lang="en";
		$this->trans="de";
		$this->text=$LANG[$this->lang];
		if($_GET['recoverpasswd']) $this->recover=TRUE;
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
        	$var.="<fieldset class='crud'><legend class='crud'>Login</legend>";
        	$var.="<br>".$this->data['mesg']."";
        	$var.="<table class='registro' border='0'>";
        	$var.="<tr><td>".$this->text['login'].":</td><td>".$this->html->inputTag("$formName/mail","25",$array,$POST['mail'])."</td></tr>\n";
       		$var.="<tr><td>".$this->text['pass1'].":</td><td>".$this->html->passwordTag("$formName/pass1","25",$array)."</td></tr>\n";
        	$var.="<tr><td align='right' colspan='2'>".$this->html->submitTag($this->text['accept'])."</td></tr>\n";
        	$var.="<tr><td align='right' class='center' colspan='2' style='font-size:70%;'>".$this->text['linkreg']."</td></tr>\n";
        	$var.="<tr><td align='right' class='center' colspan='2' style='font-size:70%;'>".$this->text['linkforget']."</td></tr>\n";
        	$var.="</table>";
        	$var.="</fieldset></form>";
        	return $var;        	
        }
        
        function registrarForm(){
        	$formName="registrar";
        	$POST=$this->data[$formName];
        	if(empty($POST['mail'])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnlogin']."</div>";
        		return NULL;       		
        	}  
        	$query="select * from usuarios where mail_usuario='$POST[mail]'";
        	$set=$this->localFetch($query);	
        	$line=$set->FetchRow();
        	if(($line['pass_usuario']) != $POST['pass1']){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnlogin']."</div>";
        		return NULL;
        	}
        	$this->registerSession($line['mail_usuario']);
        	header('Location: '.URL.'');        	
        }
        
        function registerSession($mail){
        	$_SESSION['ACCESS']=TRUE;
        	$_SESSION['MAIL']=$mail;
        	$query="update usuarios set lastaccess_usuarios= NOW() where mail_usuario='$mail'";
        	if($this->db->doQuery($query))return true;
        }
        
        function showRecover(){
        	$formName="mail";
        	$POST=$this->data[$formName];
        	$array=array("class"=>"crud");
        	$link="<a href='".URL."?action=siteaccessenglish'>Back</a>";
        	$var="<br><br>".$this->html->formTag($formName)."\n";
        	$var.="<fieldset class='crud'><legend class='crud'>".$this->text['recover']."</legend>";
     		$var.="<br>".$this->data['mesg']."";
        	$var.="<table class='registro' border='0'>";
        	$var.="<tr><td>".$this->text['login'].":</td><td>".$this->html->inputTag("$formName/mail","25",$array,$POST['mail'])."</td></tr>\n";
        	$var.="<tr><td align='right' colspan='2'>".$this->html->submitTag($this->text['accept'])."</td></tr>\n";
        	$var.="<tr><td align='right' class='center' colspan='2' style='font-size:70%;'>$link</td></tr>\n";
        	$var.="</table>";
        	$var.="</fieldset></form>";
        	return $var; 
        }
        
        function mailForm(){
  
        	$this->recover=TRUE;
        	$formName="mail";
        	$POST=$this->data[$formName];
        	/*if(empty($POST[mail])){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnlogin4']."</div>";
        		return NULL;       		
        	} */       	
        	$query="select * from usuarios where mail_usuario='$POST[mail]'";
        	$set=$this->localFetch($query);	
        	$line=$set->FetchRow();
        	if(($line['mail_usuario']) != $POST['mail']){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnlogin2']."</div>";
        		return NULL;
        	}
        	$to  = $line['mail_usuario'];
        	$subject = $this->text['mailrecover'];
        	$message = $this->text['mailrecovermsg']."$line[pass_usuario]";
        	$headers = 'From: '.FROM.'' . "\r\n" . 'Reply-To: '.FROM.'' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
        	if(!mail($to, $subject, $message, $headers)){
        		$this->data['mesg']="<div class='warn'>".$this->text['warnlogin4']."</div>";
        		return NULL;
        	}
        	$this->data['mesg']="<div class='green'>".$this->text['warnlogin3']."</div>";
        }
        



}

			
?>
