<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class body extends helperController{
					
	function index(){
		$this->isAllowed();
		$this->lang="es";
		$this->text=$LANG[$this->lang];
		$this->data['TITLE']=("Esto es el body<br>");
	}
				
}
?>
