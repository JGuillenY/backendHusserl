<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class Acerca extends helperController{
		
	var $text;
	var $lang;
	
	function index(){
		$this->isAllowed();
		require_once  APPLIBSROOT."lang.php";
		
		$this->scripts[]=$this->dhtml->permitContractibleHeaders();
		$this->scripts[]=$this->dhtml->permitConfirmSubmit();
		$this->controller="Acerca";
		$this->lang="es";
		$this->test=$LANG[$this->lang];
	}


				
}
?>
