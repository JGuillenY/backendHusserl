<?PHP
				
#Archivo Generado Automáticamente por SecureNet PERL SCRIPTING FRAMEWORK
				

class logout extends helperController{
					
	function index(){
		session_start();
		unset($_SESSION);
		session_destroy();
		header('Location: '.URL.'/?action=siteaccess ');
	}
				
}
?>
